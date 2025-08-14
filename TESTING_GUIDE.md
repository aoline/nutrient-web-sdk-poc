# DWS Viewer PoC - Testing Guide

## 🧪 How to Test the Document Loading Functionality

### 1. **Start the Server**
```bash
npm start
```
Server will run on: `http://localhost:3001`

### 2. **Open the Application**
Navigate to `http://localhost:3001` in your browser

### 3. **Expected Behavior**
- ✅ **SDK Loads**: You should see "DWS Viewer PoC Success!" message
- ✅ **Document Controls**: A document loader panel should appear in the top-left
- ✅ **No Console Errors**: Check browser console for any error messages
- ✅ **Viewer Ready**: SDK initializes with placeholder document (no more "Backend could not be inferred" error)

### 4. **Testing Document Loading**

#### **Option A: File Upload (Recommended for PoC)**
1. Click "Choose File" in the "Load PDF/DWS File" section
2. Select any PDF file from your computer
3. The viewer should load and display the document
4. Check console for success messages

#### **Option B: Load from URL**
1. Enter a public PDF URL in the URL input field
   - Example: `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`
2. Click "Load"
3. The viewer should fetch and display the document

#### **Option C: Load by Document ID**
1. Enter a document ID in the Document ID field
2. Click "Load"
3. This requires a backend service with document storage

### 5. **Troubleshooting**

#### **If SDK Fails to Load**
- Check browser console for error messages
- Verify all assets are accessible at `/assets/`
- Ensure server is running on port 3001

#### **If Document Fails to Load**
- Check file format (PDF recommended for testing)
- Verify file size (try with small PDFs first)
- Check console for specific error messages
- Ensure CORS allows file loading

#### **Common Issues**
- **"Backend could not be inferred"**: This was the original error - now fixed with proper document loading
- **File too large**: Try with smaller PDF files (< 10MB)
- **CORS errors**: Use local files or public URLs that allow CORS

### 6. **Success Indicators**
- ✅ SDK loads without errors
- ✅ Document loader panel appears
- ✅ File upload works
- ✅ Document renders in viewer
- ✅ Console shows success messages

### 7. **Test Files**
For testing, you can use:
- Any PDF file from your computer
- Public PDF URLs (ensure CORS is allowed)
- Sample DWS files if available

### 8. **Next Steps After Testing**
Once basic functionality is confirmed:
- Test with larger documents
- Test with different file formats
- Implement backend document storage
- Add user authentication
- Deploy to production

---

**Status**: Ready for Testing ✅  
**Server**: Running on port 3001  
**URL**: http://localhost:3001
