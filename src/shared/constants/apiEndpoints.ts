export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      REFRESH_TOKEN: '/api/auth/refreshToken',
    },
    USERS: {
      GET_USER: '/api/users/getUser',
      LIST_USERS: '/api/users/listUsers',
    },
  } as const;
  
  