(function(){
	
	"use strict";

	angular
		.module('authApp',['auth0','ngMaterial','ui.router','angular-storage','angular-jwt'])	
			.config(function($provide, authProvider,jwtOptionsProvider, $locationProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider){


						authProvider.init({
							domain : 'praveen1993.auth0.com',
							clientID : '2zc3ZpoAbthEijJXYvY0b1IW6l8Y2vlA'
						});

						jwtInterceptorProvider.tokenGetter = function(store){
							return store.get('id_token');
						}
						jwtOptionsProvider.config({ whiteListedDomains: ['localhost'] }); 
						$urlRouterProvider.otherwise('/home');
						$locationProvider.hashPrefix('');
						$stateProvider
							.state('home',{
								url: '/home',
								templateUrl: 'components/home/home.tpl.html'
							})
							.state('profile', {
								url : '/profile',
								templateUrl: 'components/profile/profile.tpl.html',
								controller : 'profileController as user'
							});


						// function redirect($q,auth,store,$state){
						// 	return {
						// 		responseError : function(rejection) {
						// 			if(rejection.status===401) {
						// 				auth.signout();
						// 				store.remove("profile");
						// 				store.remove("id_token");
						// 				$state.go("/home");
						// 			}
						// 			return $q.reject(rejection);
						// 		}
						// 	}
						// }

						// $provide.factory('redirect', redirect);
						// $httpProvider.interceptors.push('redirect');	
						$httpProvider.interceptors.push('jwtInterceptor');
			})
			.run(function($rootScope,jwtHelper,auth,store,$state){
				var token = store.get('id_token');

				if(token) {
					if(!jwtHelper.isTokenExpired(token)){
						if(!auth.isAuthenticated){
							auth.authenticate(store.get('profile'), token);
						}
					}
				}else{
					$state.go('home');
				}
			});
})();


	