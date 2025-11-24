export const API_CONFIG = {
  // DEVELOPMENT: Replace with your computer's local IP
  // Run 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux) to find it
  //
  // PRODUCTION: Replace with your Vercel deployment URL
  BASE_URL: __DEV__
    ? 'http://192.168.1.100:3000'  // ⚠️ CHANGE THIS to your local IP for development
    : 'https://dashboard-nu-lilac-lcozqn1duo.vercel.app',  // Your backend Vercel URL

  TIMEOUT: 10000, // 10 seconds
};

// Helper to log API calls in development
export const logApiCall = (method: string, endpoint: string, data?: any) => {
  if (__DEV__) {
    console.log(`📡 API ${method}: ${endpoint}`, data ? data : '');
  }
};
