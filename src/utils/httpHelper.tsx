import { instance } from './axios';

const post = (endpoint: string, credentials = null, showLoading = true) => {
  const config: any = { showLoading };
  return instance.post(endpoint, credentials, config);
};

const put = (endpoint: string, credentials = null, showLoading = true) => {
  const config: any = { showLoading };
  return instance.put(endpoint, credentials, config);
};

const get = (endpoint: string, credentials = null, showLoading = false) => {
  const url = credentials ? `${endpoint}?${credentials}` : endpoint;
  const config: any = { showLoading };
  return instance.get(url, config);
};

const _delete = (endpoint: string, credentials = null, showLoading = true) => {
  const url = credentials ? `${endpoint}?${credentials}` : endpoint;
  const config: any = { showLoading };
  return instance.delete(url, config);
};

export { get, post, put, _delete };
