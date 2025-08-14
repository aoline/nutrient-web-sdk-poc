# DWS Viewer PoC - Nutrient Web SDK Integration

A minimal Proof of Concept demonstrating the integration of the Nutrient Web SDK with DWS Viewer API.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```bash
# Nutrient.io API Keys
NUTRIENT_VIEWER_API_KEY=your_api_key_here

# API Endpoints
NUTRIENT_API_BASE=https://api.nutrient.io

# Development Settings
NODE_ENV=development
PORT=3000
```

### 3. Start the Server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
websdk_llm/
├── public/
│   ├── index.html          # Main HTML page
│   └── assets/             # SDK assets (copied from node_modules)
│       ├── nutrient-viewer.js
│       └── nutrient-viewer-lib/
├── server.js               # Express server
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🛠️ Development

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 🔧 Configuration

### Environment Variables
- `NUTRIENT_VIEWER_API_KEY`: Your Nutrient.io API key
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

### SDK Configuration
The viewer is configured in `public/index.html`:
```javascript
NutrientViewer.load({
    container: "#viewer",
    baseUrl: "/assets/"
});
```

## 📱 Features

- ✅ Basic DWS document rendering
- ✅ Error handling and user feedback
- ✅ Responsive design
- ✅ Console logging for debugging
- ✅ Health check endpoint (`/health`)

## 🧪 Testing

### Manual Testing
1. Open `http://localhost:3000` in your browser
2. Check the browser console for any errors
3. Verify the viewer loads without issues
4. Test error scenarios by temporarily breaking the configuration

### Health Check
```bash
curl http://localhost:3000/health
```

## 🐛 Troubleshooting

### Common Issues

**Blank Page**
- Check that SDK assets are in `public/assets/`
- Verify `baseUrl` is set to `/assets/`
- Check browser console for errors

**Console Errors**
- Ensure all dependencies are installed
- Verify environment variables are set
- Check file paths and permissions

**Server Won't Start**
- Verify PORT is not in use
- Check environment file exists
- Ensure all dependencies are installed

### Debug Mode
Enable detailed logging by setting `NODE_ENV=development` in your `.env` file.

## 📚 Next Steps

This PoC provides a foundation for:
- Adding document upload functionality
- Implementing user authentication
- Adding advanced viewer controls
- Building production-ready features

## 🤝 Contributing

This is a Proof of Concept. For production use, consider:
- Adding proper error handling
- Implementing security measures
- Adding comprehensive testing
- Performance optimization

## 📄 License

ISC License
