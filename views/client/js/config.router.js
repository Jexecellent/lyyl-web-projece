'use strict';

/**
 * Config for the router
 */
angular.module('app')
  //路由切换监听
  .run(['$rootScope', '$location', '$timeout','$window','Restangular','CacheService', function($rootScope, $location, $timeout,$window,Restangular,CacheService) {
      // Redirect to login if token is expired
      $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
          //console.log('stateChange: %s -> %s', fromState.url, toState.url);
          if (toState.url !== '/login') {
              if (!CacheService.isTokenValid()) {
                  //token过期
                  CacheService.clear();
                  $location.path('/admin');
                  //$window.location.assign('/admin')
              }
              $rootScope.isInLoginPg = false;
          }else{
              $rootScope.isInLoginPg = true;
          }

          //设置全局Restangular配置
          Restangular.setBaseUrl('/admin');
          Restangular.addRequestInterceptor(function(elem, operation, path, url){
              //让每次请求自动加上时间戳
              elem.token = CacheService.getToken();
              return elem;
          });
          Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
              if (data.flag === 0) {
                  return data;
              }else{
                  //错误返回
                  deferred.reject(data);
              }
          });
      });   
  }])
  .config(
    ['$stateProvider', '$urlRouterProvider','$locationProvider',
      function ($stateProvider,$urlRouterProvider,$locationProvider) {
          //$locationProvider.html5Mode(true); //去掉菜单栏url中的#   .hashPrefix('!');
          $urlRouterProvider.otherwise('/main/wellcome');
          $stateProvider
              .state('pg_not_found', {
                  url: '/pg_not_found',
                  templateUrl: 'tpl/404.html'
              })
              .state('login', {
                  url: '/login',
                  templateUrl: 'tpl/login/login.html',
                  resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load('js/controllers/loginCtr.js')
                    }]
                  }
              })
              .state('main', {
                  abstract: true,
                  url: '/main',
                  templateUrl: 'tpl/main/main.html'
              })
              .state('main.wellcome', {
                  url: '/wellcome',
                  templateUrl: 'tpl/welcome.html'
              })
      }
    ]
  );