import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { INSTAGRAM_URL_PREFIX, COOKIE_STR } from '../common/consts';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1662085826831_2007',
    egg: {
      port: 7001,
    },
    security: {
      csrf: false,
    },
    axios: {
      default: {
        // 所有实例复用的配置
        timeout: 10 * 1000,
      },
      clients: {
        default: {
          // 默认实例
        },
        insAxios: {
          baseURL: INSTAGRAM_URL_PREFIX,
          headers: { cookie: COOKIE_STR, accept: '*/*' },
          proxy: { host: '127.0.0.1', port: 7890 },
        },
      },
    },
  } as MidwayConfig;
};
