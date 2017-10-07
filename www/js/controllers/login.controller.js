angular.module('starter')
.controller('LoginController', function($scope, CarroService, $ionicPopup, $state, $rootScope, $ionicHistory, DatabaseValues){
    
    $scope.login = {};
    
    $scope.realizarLogin = function(){
        
        var dadosDoLogin = {
            params : {
                email: $scope.login.email, // 'joao@alura.com.br'
                senha: $scope.login.senha // 'alura123'
            }
        };

        CarroService.realizarLogin(dadosDoLogin).then(function(response){
            if (response.status === 200){

                var dados = response.data;
                $rootScope.usuario = dados.usuario;

                DatabaseValues.setup();
                DatabaseValues.bancoDeDados.transaction(function(transacao){
                    transacao.executeSql('INSERT INTO usuarios(nome,email) VALUES (?, ?)', [$rootScope.usuario.nome, $rootScope.usuario.email]);
                });

                $ionicHistory.nextViewOptions({
                    disableBack: true
                })

                $ionicPopup.alert({
                    title: 'Seja bem-vindo',
                    template: 'Login efetuado com sucesso.'
                });
                
                $state.go('app.listagem');
                
            }
        }, function(erro){
            $ionicPopup.alert({
                title: 'Opa!',
                template: 'E-mail ou senha incorretos.'
            });
        });

    }

});