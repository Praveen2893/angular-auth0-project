(function() {
	"use strict";

	angular.module('authApp')
			.controller('profileController', profileController);

			function profileController($http,store) {
				var vm = this;

				vm.getMessage = getMessage;
				vm.getSecretMessage = getSecretMessage;
				vm.message;

				vm.profile = store.get('profile');
 				vm.token = store.get('id_token');
				function getMessage() {
					$http.get('http://localhost:4000/api/public',{
						skipAuthorization : true
					}).then(function(response){
							vm.message = response.data.message;
						});
						
				}

				function getSecretMessage() {
					$http({
						method: 'GET',
						url:'http://localhost:4000/api/private',
						// headers : {
						// Authorization : 'Bearer '+ vm.token 
						// }
					}).then(
						function(response){
							vm.message = response.data.message;
						});
				}

			}
})();