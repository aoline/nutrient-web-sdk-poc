# Nutrient Web SDK - MCP (Meta Context Protocol)

## 🎯 **Project Overview**
**Goal**: Create a minimal Proof of Concept that renders DWS documents using the Nutrient Web SDK  
**Timeline**: 1 Development Day  
**Status**: ✅ **COMPLETED** - Working PoC with Sample.pdf

---

## 🚀 **Key Learnings & Patterns**

### 1. **SDK Initialization Patterns**

#### ✅ **Working Pattern (Standalone Mode)**
```javascript
// CORRECT: Standalone mode with document parameter
const viewer = await NutrientViewer.load({
    container: "#viewer",
    baseUrl: "http://localhost:3001/assets/",
    document: "http://localhost:3001/sample.pdf"
});
```

#### ❌ **Broken Patterns (Avoid These)**
```javascript
// WRONG: Server mode without backend
const viewer = await NutrientViewer.load({
    container: "#viewer",
    baseUrl: "/assets/",  // ❌ Relative path
    documentId: "fake-id"  // ❌ Fake document ID
});

// WRONG: Top-level await in module
const viewer = await NutrientViewer.load({...}); // ❌ Syntax error

// WRONG: Container with child nodes
<div id="viewer">
    <div>Loading...</div>  <!-- ❌ SDK requires empty container -->
</div>
```

### 2. **Critical Configuration Requirements**

#### **Container Element**
```html
<!-- ✅ CORRECT: Empty container -->
<div id="viewer"></div>

<!-- ❌ WRONG: Container with content -->
<div id="viewer">
    <div>Loading...</div>  <!-- SDK will fail -->
</div>
```

#### **Base URL**
```javascript
// ✅ CORRECT: Absolute URL
baseUrl: "http://localhost:3001/assets/"

// ❌ WRONG: Relative path
baseUrl: "/assets/"  // SDK requires absolute URL
```

#### **Document Parameter**
```javascript
// ✅ CORRECT: Local file (no CORS issues)
document: "http://localhost:3001/sample.pdf"

// ✅ CORRECT: Data URI (self-contained)
document: "data:text/plain;base64,VGhpcyBpcyBhIHRlc3Q="

// ❌ WRONG: External URL with CORS restrictions
document: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
```

### 3. **Viewer Lifecycle Management (CRITICAL)**

#### ✅ **CORRECT: Clean Viewer Switching Pattern**
```javascript
// ALWAYS use this pattern for switching documents:
await viewer.unload();
await viewer.load({ document: { type, data, name } });

// Example:
if (window.currentNutrientViewer) {
    await window.currentNutrientViewer.unload();
    await window.currentNutrientViewer.load({
        document: 'http://localhost:3000/sample.pdf'
    });
} else {
    // Create new viewer only if none exists
    window.currentNutrientViewer = await NutrientViewer.load({
        container: '#viewer',
        baseUrl: 'http://localhost:3000/assets/',
        document: 'http://localhost:3000/sample.pdf'
    });
}
```

#### ❌ **WRONG: Never Do This**
```javascript
// ❌ DON'T: Clear container manually
container.innerHTML = '';

// ❌ DON'T: Create new viewer every time
const viewer = await NutrientViewer.load({...});

// ❌ DON'T: Mix container clearing with viewer management
container.innerHTML = '';
viewer = await NutrientViewer.load({...});
```

### 4. **JavaScript Module Patterns**

#### **Async Function Wrapper (Required)**
```javascript
// ✅ CORRECT: Wrapped in async function
(async function initializeViewer() {
    try {
        const viewer = await NutrientViewer.load({...});
        console.log('Success!');
    } catch (err) {
        console.error('Failed:', err);
    }
})();

// ❌ WRONG: Top-level await
const viewer = await NutrientViewer.load({...}); // Syntax error
```

#### **Error Handling Pattern**
```javascript
try {
    const viewer = await NutrientViewer.load(config);
    console.log('Viewer loaded successfully');
    // Update UI with success
} catch (err) {
    console.error("Viewer failed to load:", err);
    // Show user-friendly error message
    document.getElementById("viewer").innerHTML = `
        <div class="error">
            <h3>Error Loading Viewer</h3>
            <p>Error: ${err.message}</p>
        </div>
    `;
}
```

### 4. **Common Error Messages & Solutions**

#### **"Backend could not be inferred"**
**Cause**: Missing required document parameters  
**Solution**: Provide `document`, `documentId`, or `session` parameter

#### **"Configuration#container is expected to be an empty element"**
**Cause**: Container has child nodes  
**Solution**: Use empty `<div id="viewer"></div>`

#### **"baseUrl must be an absolute URL"**
**Cause**: Relative path provided  
**Solution**: Use full URL like `"http://localhost:3001/assets/"`

#### **"document must be either an URL or ArrayBuffer"**
**Cause**: Wrong data type provided  
**Solution**: Use URL string or ArrayBuffer, not Uint8Array

#### **"CORS policy blocked"**
**Cause**: External URL doesn't allow cross-origin requests  
**Solution**: Use local files or data URIs

---

## 🛠️ **Working Implementation Examples**

### **Minimal Working HTML**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nutrient Viewer PoC</title>
    <style>
        #viewer { width: 100%; height: 100vh; }
        .status { position: fixed; top: 20px; left: 20px; background: white; padding: 15px; }
    </style>
</head>
<body>
    <div id="viewer"></div>
    <div class="status" id="status">Loading...</div>
    
    <script type="module">
        import "/assets/nutrient-viewer.js";
        
        (async function loadViewer() {
            try {
                const viewer = await NutrientViewer.load({
                    container: "#viewer",
                    baseUrl: "http://localhost:3001/assets/",
                    document: "http://localhost:3001/sample.pdf"
                });
                
                document.getElementById("status").innerHTML = "✅ Loaded successfully!";
                console.log('Viewer ready:', viewer);
                
            } catch (err) {
                console.error("Failed:", err);
                document.getElementById("status").innerHTML = `❌ Error: ${err.message}`;
            }
        })();
    </script>
</body>
</html>
```

### **Express Server Setup**
```javascript
// server.js
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.static('public'));

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'Nutrient Viewer PoC server is running'
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

## 📁 **Project Structure**
```
websdk_llm/
├── public/
│   ├── index.html          # Main viewer page
│   ├── sample.pdf          # Test PDF document
│   └── assets/             # SDK assets (5.21 MB)
│       ├── nutrient-viewer.js
│       └── nutrient-viewer-lib/
├── server.js               # Express server
├── package.json            # Dependencies
├── .env                    # Environment config
└── README.md               # Documentation
```

---

## 🔧 **Dependencies & Setup**

### **Required Packages**
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "dotenv": "^17.2.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

### **Environment Variables**
```bash
# .env file
NUTRIENT_VIEWER_API_KEY=your_api_key_here
NODE_ENV=development
PORT=3001
```

### **Installation Commands**
```bash
npm install
npm install @nutrient-sdk/viewer
mkdir -p public/assets
cp -R node_modules/@nutrient-sdk/viewer/dist/* public/assets/
```

---

## 🧪 **Testing & Validation**

### **Health Check**
```bash
curl http://localhost:3001/health
# Expected: {"status":"ok","message":"Nutrient Viewer PoC server is running"}
```

### **SDK Assets Check**
```bash
curl -I http://localhost:3001/assets/nutrient-viewer.js
# Expected: HTTP/1.1 200 OK
```

### **PDF Accessibility Check**
```bash
curl -s http://localhost:3001/sample.pdf | head -c 10
# Expected: %PDF-1.7
```

---

## 🚨 **Troubleshooting Guide**

### **Viewer Won't Initialize**
1. Check container is empty: `<div id="viewer"></div>`
2. Verify baseUrl is absolute: `"http://localhost:3001/assets/"`
3. Ensure document parameter is valid
4. Check JavaScript console for specific errors

### **CORS Issues**
1. Use local files instead of external URLs
2. Or use data URIs for self-contained documents
3. Ensure server is running on correct port

### **SDK Assets Not Found**
1. Verify assets are copied to `public/assets/`
2. Check file permissions
3. Confirm server is serving static files correctly

---

## 🎉 **Success Criteria Met**

- ✅ **Working PoC delivered** in 1 development day
- ✅ **SDK initializes successfully** with Sample.pdf
- ✅ **No console errors** during loading
- ✅ **Clean, simple interface** without complexity
- ✅ **Proper error handling** and user feedback
- ✅ **Documentation complete** for future development

---

## 🔮 **Future Enhancements**

### **Immediate Next Steps**
1. Add file upload functionality
2. Implement document switching
3. Add viewer controls and toolbar
4. Implement error recovery

### **Production Considerations**
1. Add authentication
2. Implement proper security
3. Add performance monitoring
4. Set up CI/CD pipeline

---

## 📚 **References & Resources**

- **Nutrient Web SDK**: https://www.nutrient.io/sdk/web
- **PSPDFKit Examples**: https://github.com/PSPDFKit/awesome-nutrient
- **Express.js**: https://expressjs.com/
- **CORS Documentation**: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

---

*This MCP file captures the complete development journey and key learnings from building a working Nutrient Web SDK PoC. Use these patterns and examples for future LLM development work.*
