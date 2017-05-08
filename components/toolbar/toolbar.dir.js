(function(){

	'use strict';

	angular
		.module('authApp')
			.directive('toolbar',toolbar);

			function toolbar() {

				return {
					templateUrl : 'components/toolbar/toolbar.tpl.html',
					controller : toolbarController,
					controllerAs : 'toolbar'	
				}
			}

			function toolbarController(auth,store,$state,$location) {
				var vm = this;
				vm.login = login;
				vm.logout = logout;
				vm.auth = auth;

				function login() {
					auth.signin({},function(profile,token){
						store.set('profile',profile);
						store.set('id_token',token);
					});
					$state.go('home');
				}

				function logout() {
					auth.signout();
					store.remove('profile');
					store.remove('id_token');
					$state.go('home');
					// $location.path('/home');
				}
			}
})();