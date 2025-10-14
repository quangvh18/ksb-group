#!/usr/bin/env node

/**
 * Setup Script for Google Analytics & Search Console
 * 
 * Usage: node scripts/setup-analytics.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ENV_FILE = path.join(process.cwd(), '.env.local');

console.log('\n🚀 Google Analytics & Search Console Setup\n');
console.log('═'.repeat(60));

// Check if .env.local already exists
if (fs.existsSync(ENV_FILE)) {
  console.log('\n⚠️  File .env.local đã tồn tại!');
  console.log('📁 Location:', ENV_FILE);
  
  rl.question('\n❓ Bạn có muốn ghi đè (overwrite)? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      setupEnvironment();
    } else {
      console.log('\n✋ Hủy bỏ. File .env.local giữ nguyên.');
      console.log('💡 Bạn có thể edit thủ công file .env.local\n');
      rl.close();
    }
  });
} else {
  setupEnvironment();
}

function setupEnvironment() {
  console.log('\n📝 Nhập thông tin Google Analytics & Search Console:');
  console.log('   (Nhấn Enter để skip, sẽ dùng placeholder)\n');

  rl.question('🔍 Google Analytics Measurement ID (G-XXXXXXXXXX): ', (gaId) => {
    rl.question('🔐 Google Search Console Verification Code: ', (verificationCode) => {
      
      const envContent = `# ==============================================
# GOOGLE ANALYTICS & SEARCH CONSOLE
# ==============================================

# Google Analytics 4 Measurement ID
# Lấy từ: https://analytics.google.com/
# Format: G-XXXXXXXXXX (bắt đầu bằng G-)
NEXT_PUBLIC_GA_ID=${gaId || 'G-XXXXXXXXXX'}

# Google Search Console Verification Code
# Lấy từ: https://search.google.com/search-console
# Copy phần code trong meta tag verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=${verificationCode || 'your-verification-code-here'}

# ==============================================
# API CONFIGURATION (Optional)
# ==============================================

# Backend API URL
NEXT_PUBLIC_API_URL=https://admin.ksbgroup.vn/api
`;

      fs.writeFileSync(ENV_FILE, envContent, 'utf8');
      
      console.log('\n✅ File .env.local đã được tạo thành công!');
      console.log('📁 Location:', ENV_FILE);
      
      if (!gaId || gaId === '') {
        console.log('\n⚠️  Lưu ý: Bạn cần cập nhật NEXT_PUBLIC_GA_ID trong .env.local');
      }
      
      if (!verificationCode || verificationCode === '') {
        console.log('⚠️  Lưu ý: Bạn cần cập nhật NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION trong .env.local');
      }
      
      console.log('\n📚 Hướng dẫn tiếp theo:');
      console.log('   1. Lấy GA4 Measurement ID: https://analytics.google.com/');
      console.log('   2. Lấy Search Console Verification: https://search.google.com/search-console');
      console.log('   3. Cập nhật .env.local với các giá trị thực');
      console.log('   4. Restart dev server: npm run dev');
      console.log('   5. Xem hướng dẫn: ANALYTICS_QUICK_START.md');
      
      console.log('\n🎉 Setup hoàn tất!\n');
      
      rl.close();
    });
  });
}

rl.on('close', () => {
  process.exit(0);
});

