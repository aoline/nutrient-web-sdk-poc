// Simple test script to verify Nutrient viewer SDK
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Nutrient Viewer SDK Setup...\n');

// Check if SDK files exist
const sdkPath = path.join(__dirname, 'public', 'assets', 'nutrient-viewer.js');
const sdkLibPath = path.join(__dirname, 'public', 'assets', 'nutrient-viewer-lib');

console.log('📁 Checking SDK files:');
console.log(`   Main SDK: ${fs.existsSync(sdkPath) ? '✅' : '❌'} ${sdkPath}`);
console.log(`   SDK Lib:  ${fs.existsSync(sdkLibPath) ? '✅' : '❌'} ${sdkLibPath}`);

// Check file sizes
if (fs.existsSync(sdkPath)) {
    const stats = fs.statSync(sdkPath);
    console.log(`   SDK Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

// Check HTML file
const htmlPath = path.join(__dirname, 'public', 'index.html');
console.log(`\n📄 HTML file: ${fs.existsSync(htmlPath) ? '✅' : '❌'} ${htmlPath}`);

// Check server
const serverPath = path.join(__dirname, 'server.js');
console.log(`🚀 Server file: ${fs.existsSync(serverPath) ? '✅' : '❌'} ${serverPath}`);

// Check environment
const envPath = path.join(__dirname, '.env');
console.log(`🔑 Environment file: ${fs.existsSync(envPath) ? '✅' : '❌'} ${envPath}`);

console.log('\n🎯 Next Steps:');
console.log('   1. Open http://localhost:3001 in your browser');
console.log('   2. Check browser console for any errors');
console.log('   3. Verify the viewer loads without issues');
console.log('   4. Test error handling by temporarily breaking the config');

console.log('\n✅ Setup complete! Your PoC is ready to test.');
