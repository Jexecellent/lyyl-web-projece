/*var redis_config = {
 "host": "192.168.1.195",
 "port": 6379
 };*/
var env = 'dev'; // dev or productgvuvgu

var settings = {
    appName: "web",
    version: "2.0.0",
    env: env,
    port:process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,
    api_config: {
        hostname : "192.168.1.170",
        port : "8081",
        path : "/api"
    },
    session: {
        secret: "0o80ilpoaWeb",
        key: 'open-t'
    },
    redis: {
        host: "192.168.1.185",
        port: "6379",
        no_ready_check: true,
        ttl: 60 * 1000 * 30
    },
    chat:{
      port: 3003
    },
    mq: {
        host: '192.168.1.198',
        port: 5672,
        login: 'admin',
        password: 'admin',
        authMechanism: 'AMQPLAIN',
        vhost: '/',
        ssl: {
            enabled: false
        }
    },
    i18n: {
        locales:['zh_CN', 'en_US'],
        cookie: 'locale',
        queryParameter: 'lang',
        directory: './locales',
        register: global,
        defaultLocale: 'zh_CN'
    }
}
module.exports = settings;
