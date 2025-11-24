const axios = require('axios');

const API_CONFIG = {
  BASE_URL: 'https://dashboard-nu-lilac-lcozqn1duo.vercel.app',
  TIMEOUT: 10000,
};

async function testApiConnection() {
  console.log('🧪 Testing API connection...');
  console.log(`📍 URL: ${API_CONFIG.BASE_URL}`);
  console.log('');

  try {
    const startTime = Date.now();
    const response = await axios.get(API_CONFIG.BASE_URL, {
      timeout: API_CONFIG.TIMEOUT,
      validateStatus: () => true, // Accept any status code
    });
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log('✅ Connection successful!');
    console.log(`⏱️  Response time: ${duration}ms`);
    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    console.log(`📦 Content-Type: ${response.headers['content-type']}`);
    console.log(`📏 Content-Length: ${response.headers['content-length'] || 'N/A'}`);

    if (response.status >= 200 && response.status < 300) {
      console.log('\n✨ API is healthy and responding!');
    } else {
      console.log(`\n⚠️  API responded with status ${response.status}`);
    }
  } catch (error) {
    console.log('❌ Connection failed!');

    if (error.code === 'ECONNABORTED') {
      console.log(`⏱️  Timeout after ${API_CONFIG.TIMEOUT}ms`);
    } else if (error.code === 'ENOTFOUND') {
      console.log('🔍 DNS lookup failed - host not found');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('🚫 Connection refused - server may be down');
    } else {
      console.log(`❗ Error: ${error.message}`);
      if (error.code) {
        console.log(`   Code: ${error.code}`);
      }
    }
  }
}

testApiConnection();
