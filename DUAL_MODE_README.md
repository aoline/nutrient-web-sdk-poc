# Nutrient Web SDK - Dual Mode Architecture

## 🎯 **Overview**

This project provides **two distinct applications** for different use cases:

1. **🔒 Offline Mode** - Word Add-in for local document conversion
2. **🌐 Collaborative Mode** - Server-side rendering with real-time collaboration

---

## 🏗️ **Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    Dual Mode Architecture                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │   Offline Mode  │    │      Collaborative Mode         │ │
│  │   (Word Add-in) │    │     (DWS Viewer API)            │ │
│  │                 │    │                                 │ │
│  │ ✅ Local only   │    │ ✅ Server-side rendering        │ │
│  │ ✅ No internet  │    │ ✅ Real-time collaboration      │ │
│  │ ✅ Privacy      │    │ ✅ Shared annotations           │ │
│  │ ✅ Fast         │    │ ✅ Version control              │ │
│  │ ✅ Simple       │    │ ✅ Multi-user editing           │ │
│  └─────────────────┘    └─────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔒 **Mode 1: Offline Mode (Word Add-in)**

### **Purpose**
Convert Word documents to PDF **locally** without sending files to external servers.

### **Use Cases**
- Personal document conversion
- Offline work environments
- Privacy-sensitive documents
- Quick local conversions
- Compliance requirements

### **Features**
- ✅ **100% Local Processing** - No files leave your computer
- ✅ **No Internet Required** - Works completely offline
- ✅ **Document Privacy** - Your content stays private
- ✅ **Fast Conversion** - No network latency
- ✅ **Simple Interface** - One-click conversion

### **Technical Implementation**
- **SDK Mode**: Nutrient Web SDK (Standalone)
- **Document Source**: Local Word document content
- **Rendering**: Client-side in browser
- **Storage**: Local only
- **Security**: Maximum privacy

### **Files**
- `word-addin/manifest.xml` - Office Add-in configuration
- `word-addin/word-addin.html` - Add-in interface

---

## 🌐 **Mode 2: Collaborative Mode (DWS Viewer API)**

### **Purpose**
Enable real-time collaboration with server-side rendering and advanced features.

### **Use Cases**
- Team collaboration
- Shared document editing
- Real-time annotations
- Document review workflows
- Enterprise document management

### **Features**
- ✅ **Real-time Editing** - Multiple users can edit simultaneously
- ✅ **Live Annotations** - See others' annotations in real-time
- ✅ **Comment Threads** - Rich discussion capabilities
- ✅ **Version Control** - Track document changes over time
- ✅ **User Presence** - See who's currently viewing/editing
- ✅ **Document Sharing** - Controlled access management

### **Technical Implementation**
- **SDK Mode**: DWS Viewer API (Server-side)
- **Document Source**: Remote server via JWT token
- **Rendering**: Server-side with client-side viewer
- **Storage**: Secure cloud storage
- **Security**: Enterprise-grade authentication

### **Files**
- `collaborative/collaborative.html` - Collaborative interface

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js server running on port 3001
- Nutrient Web SDK assets in `public/assets/`
- Valid JWT token for collaborative mode

### **Running Offline Mode**
1. **Install Word Add-in**:
   ```bash
   # Copy manifest to Word Add-ins folder
   cp word-addin/manifest.xml ~/Library/Containers/com.microsoft.Word/Data/Documents/wef/
   ```

2. **Start local server**:
   ```bash
   npm start
   ```

3. **Open Word** and click "Convert to PDF" button

### **Running Collaborative Mode**
1. **Open collaborative interface**:
   ```
   http://localhost:3001/collaborative/collaborative.html
   ```

2. **Enter JWT token** and document ID

3. **Connect** to DWS Viewer API

---

## 🔧 **Configuration**

### **Offline Mode Configuration**
```javascript
// Local conversion settings
const config = {
    container: "#viewer",
    baseUrl: "http://localhost:3001/assets/",
    document: "local-document-content"  // Word document HTML
};
```

### **Collaborative Mode Configuration**
```javascript
// Server-side collaboration settings
const config = {
    container: "#viewer",
    baseUrl: "http://localhost:3001/assets/",
    session: "your-jwt-token-here"     // DWS Viewer API token
};
```

---

## 📊 **Mode Comparison**

| Feature | Offline Mode | Collaborative Mode |
|---------|--------------|-------------------|
| **Internet Required** | ❌ No | ✅ Yes |
| **File Privacy** | 🔒 100% Private | 🌐 Server processed |
| **Speed** | ⚡ Very Fast | 🚀 Fast |
| **Collaboration** | ❌ None | ✅ Full |
| **Complexity** | 🟢 Simple | 🟡 Moderate |
| **Use Case** | Personal | Team |
| **Compliance** | 🔒 High | 🌐 Standard |

---

## 🛡️ **Security Considerations**

### **Offline Mode**
- **Maximum Privacy** - Files never leave user's computer
- **No Network Exposure** - Completely isolated
- **Local Processing** - All conversion happens locally
- **User Control** - Full control over document handling

### **Collaborative Mode**
- **JWT Authentication** - Secure token-based access
- **Server Security** - Enterprise-grade security measures
- **Access Control** - Granular permissions management
- **Audit Trails** - Complete activity logging

---

## 🔮 **Future Enhancements**

### **Offline Mode**
- [ ] Batch document conversion
- [ ] Custom PDF settings
- [ ] Template management
- [ ] Local storage optimization

### **Collaborative Mode**
- [ ] Advanced annotation tools
- [ ] Workflow automation
- [ ] Integration APIs
- [ ] Mobile optimization

---

## 📚 **Documentation**

- **Nutrient Web SDK**: https://www.nutrient.io/sdk/web
- **Office Add-ins**: https://docs.microsoft.com/en-us/office/dev/add-ins/
- **DWS Viewer API**: https://www.nutrient.io/docs/dws-viewer

---

## 🤝 **Support**

For technical support or questions:
- **Offline Mode Issues**: Check local server and SDK setup
- **Collaborative Mode Issues**: Verify JWT token and API connectivity
- **General Questions**: Refer to Nutrient Web SDK documentation

---

*This dual-mode architecture provides flexibility to choose the right solution for your specific use case while maintaining the security and performance requirements of your organization.*
