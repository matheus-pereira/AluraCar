angular.module('starter')
.controller('FinalizarPedidoController', function($scope, $stateParams, $ionicPopup, $state, CarroService, $ionicHistory, ionicDatePicker, DatabaseValues){
    
    $scope.carroFinalizado = angular.fromJson($stateParams.carro);

    $scope.pedido = {};

    $scope.abrirPopupCalendario = function(){
        var configuracoes = {
            callback: function(data){
                $scope.pedido.dataAgendamento = new Date(data);
            }
        }
        ionicDatePicker.openDatePicker(configuracoes);
    }

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

            $scope.salvarDadosNoBancoDeDados('true');

            $ionicHistory.nextViewOptions({
                disableBack: true
            })

            $ionicPopup.alert({
                title: 'Parabéns',
                template: 'Agendamento realizado com sucesso.'
            }).then(function(){
                $state.go('app.listagem');
            });
        }, function(erro){

            $scope.salvarDadosNoBancoDeDados('false');

            $ionicHistory.nextViewOptions({
                disableBack: true
            })

            $ionicPopup.alert({
                title: 'Ops!',
                template: 'Servidor com problemas. Tente mais tarde.'
            }).then(function(){
                $ionicHistory.nextViewOptions({
                    disableBack: true
                })
                $state.go('app.listagem');
            });

        });

        $scope.salvarDadosNoBancoDeDados = function(confirmado){
            DatabaseValues.setup();
            DatabaseValues.bancoDeDados.transaction(function(transacao){
                transacao.executeSql('INSERT INTO agendamentos(nome, endereco, email, dataAgendamento, modelo, preco, confirmado) VALUES(?, ?, ?, ?, ?, ?, ?)', [$scope.pedido.nome, $scope.pedido.endereco, $scope.pedido.email, $scope.pedido.dataAgendamento, $scope.carroFinalizado.nome, $scope.carroFinalizado.preco, confirmado])
            });
        }

    };
});