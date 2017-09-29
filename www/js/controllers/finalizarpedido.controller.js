angular.module('starter')
.controller('FinalizarPedidoController', function($scope, $stateParams, $ionicPopup, $state, CarroService, $ionicHistory){
    
    $scope.carroFinalizado = angular.fromJson($stateParams.carro);

    $scope.pedido = {};

    $scope.finalizarPedido = function(){
        var pedidoFinalizado = {
            params : {
                carro : $scope.carroFinalizado.nome,
                preco : $scope.carroFinalizado.preco,
                nome : $scope.pedido.nome,
                endereco : $scope.pedido.endereco,
                email : $scope.pedido.email
            }
        }

        CarroService.salvarPedido(pedidoFinalizado).then(function(dados){

            $ionicHistory.nextViewOptions({
                disableBack: true
            })

            $ionicPopup.alert({
                title: 'Parabéns',
                template: 'Você acaba de comprar um carro.'
            }).then(function(){
                $state.go('app.listagem');
            });
        }, function(erro){
            $ionicPopup.alert({
                title: 'Erro',
                template: 'Campos de preenchimento obrigatório.'
            });
        });

    };
});