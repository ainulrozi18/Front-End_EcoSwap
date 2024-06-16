import CONFIG from './config';

const API_ENDPOINT = {
  REGISTER: `${CONFIG.BASE_URL}/daftar`,
  LOGIN_USER: `${CONFIG.BASE_URL}/login`,
  LOGIN_ADMIN: `${CONFIG.BASE_URL}/login/admin`,
  LOGOUT: `${CONFIG.BASE_URL}/logout`,
  PICKUP_REQUEST: `${CONFIG.BASE_URL}/pickups`,
  WITHDRAWALS: `${CONFIG.BASE_URL}/withdrawals`,
  HISTORY_TRANSACTION: `${CONFIG.BASE_URL}/pickups/users`,
};

export default API_ENDPOINT;
