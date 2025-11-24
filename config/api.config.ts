export const API_CONFIG = {
  // DEVELOPMENT: Replace with your computer's local IP
  // Run 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux) to find it
  //
  // PRODUCTION: Replace with your Vercel deployment URL
  BASE_URL: 'https://dashboard-nu-lilac-lcozqn1duo.vercel.app',

  TIMEOUT: 10000, // 10 seconds
};

// Helper to log API calls in development
export const logApiCall = (method: string, endpoint: string, data?: any) => {
  if (__DEV__) {
    console.log(`📡 API ${method}: ${endpoint}`, data ? data : '');
  }
};
