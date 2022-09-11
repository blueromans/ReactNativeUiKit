import axios from 'axios';

export const instance = axios.create({
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
