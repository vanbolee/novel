import axios from "axios";
import { Toast } from "cube-ui";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "/api" : "/api";

axios.defaults.timeout = 10000;

//重试请求次数
const retry = 3;

//重试请求的间隙
const retryDelay = 1000;

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  async error => {
    // Do something with response error

    //请求超时的之后，抛出 error.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
    if (
      error.code == "ECONNABORTED" &&
      error.message.indexOf("timeout") != -1
    ) {
      let config = error.config;
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount >= retry) {
        // Reject with the error
        return Promise.reject(error);
      }

      // Increase the retry count
      config.__retryCount += 1;

      // Create new promise to handle exponential backoff
      let backoff = new Promise(function(resolve) {
        setTimeout(function() {
          resolve();
        }, retryDelay || 1);
      });

      await backoff;
      return axios(config);
    } else {
      Toast.$create({
        txt: error.message,
        type: "txt",
        time: 2000
      }).show();
      return Promise.reject(error);
    }
  }
);

export default axios;
