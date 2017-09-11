'use strict';

	app.controller('loginCtr', MainController);
	function MainController($scope,authService,$cookieStore, $state,Md5){
		//登录对象
		if ($cookieStore.get('checkedPwd')) {
		    //console.log($cookieStore.get('currentUser'));
		    $scope.loginUser = $cookieStore.get('currentUser');
		    $scope.checkedPwd = true;
		} else {
		    $scope.loginUser = {
				account: '',
				password: ''
		    };
		}
		$scope.lan = 'zh' ;
		$scope.blur = function() {
			$scope.valid = '';
		};
		$scope.login = function(){
			$scope.loginUser.password = Md5.hex_md5($scope.loginUser.password).toUpperCase() ;
			authService.login($scope.loginUser, function(err) {
			    $scope.valid = err.detailMsg;
			}, function(userInfo) {
			    //登录成功了
			    store.set('user', $scope.loginUser);
			    $cookieStore.put('currentUser',$scope.loginUser);
			    $scope.valid = ''; //清除错误信息
			    //先判断是否有code[2999]
			    //if (userInfo.code && userInfo.code == 2999) {
			    //    $scope.appList = userInfo.appList;
			    //    $scope.selectAppToLogin = true;
			    //} else {
			        //直接登录
			        $scope.currentUserName = userInfo.userName || "未知";
			        $state.go('main.wellcome');
			    //}

			});
		}
		$scope.savePwd = function() {
		    if ($scope.checkedPwd) {
		        $cookieStore.put('currentUser',$scope.loginUser);
		        $cookieStore.put('checkedPwd',true);
		    } else {
		        $cookieStore.remove('currentUser');
		        $cookieStore.put('checkedPwd',false);
		    }
		};
	}
	MainController.$inject = ['$scope','AuthService','$cookieStore','$state','Md5'];