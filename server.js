const express = require('express');
const path = require('path');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression for all responses
app.use(compression({
    // Ensure WASM files are compressed
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    },
    // Set compression level for optimal performance
    level: 6,
    // Enable compression for WASM files specifically
    threshold: 0
}));

// Serve static files from public directory with compression
app.use(express.static('public', {
    // Enable compression for static files
    maxAge: '1y',
    // Set proper headers for WASM files
    setHeaders: (res, path) => {
        if (path.endsWith('.wasm')) {
            // WASM files should be served with proper MIME type and compression
            res.setHeader('Content-Type', 'application/wasm');
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            // Temporarily disable compression for WASM to fix loading issues
            // res.setHeader('Content-Encoding', 'gzip');
        } else if (path.endsWith('.js')) {
            // JavaScript files with compression
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (path.endsWith('.css')) {
            // CSS files with compression
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
    }
}));

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        message: 'DWS Viewer PoC server is running'
    });
});

// Serve Word Add-in files with specific route handling
app.get('/word-addin/*', (req, res, next) => {
    const filePath = path.join(__dirname, 'word-addin', req.params[0]);
    
    // Check if file exists
    if (require('fs').existsSync(filePath)) {
        res.sendFile(filePath, {
            maxAge: '1y',
            setHeaders: (res, filePath) => {
                if (filePath.endsWith('.html')) {
                    res.setHeader('Cache-Control', 'public, max-age=3600');
                }
            }
        });
    } else if (req.params[0] === 'word-addin.html') {
        // Redirect old filename to new one
        res.redirect('/word-addin/word-addin-simple.html');
    } else {
        // File doesn't exist, return 404
        res.status(404).send('File not found');
    }
});

// Serve the main page for all routes (SPA-like behavior) - must be last
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 DWS Viewer PoC server running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, 'public')}`);
    console.log(`🔑 API Key configured: ${process.env.NUTRIENT_VIEWER_API_KEY ? 'Yes' : 'No'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🗜️  Compression enabled for optimal performance`);
});
