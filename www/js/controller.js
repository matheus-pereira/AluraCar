angular.module('starter')
.controller('ListagemController', function($scope, CarroService){
    
    CarroService.obterCarros().then(function(dados){
        $scope.listaDeCarros = dados;
    });

});

angular.module('starter')
.controller('CarroEscolhidoController', function($scope, $stateParams){
    
    $scope.carroEscolhido = angular.fromJson($stateParams.carro);
    
    $scope.listaDeAcessorios = [
         {'nome': 'Freio ABS', 'preco': 800}
        ,{'nome': 'Ar Condicionado', 'preco': 1000}
        ,{'nome': 'MP3 Player', 'preco': 500}
    ];
    
    $scope.mudou = function(acessorio, isMarcado){
        if (isMarcado) {
            $scope.carroEscolhido.preco = $scope.carroEscolhido.preco + acessorio.preco;
        } else {
            $scope.carroEscolhido.preco = $scope.carroEscolhido.preco - acessorio.preco;
        }
    };

});

angular.module('starter')
.controller('FinalizarPedidoController', function($scope, $stateParams, $ionicPopup, $state, CarroService){
    
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

angular.module('starter')
.controller('LoginController', function($scope, CarroService, $ionicPopup, $state, $rootScope){
    
    $scope.login = {};
    
    $scope.realizarLogin = function(){
        
        var dadosDoLogin = {
            params : {
                email: 'joao@alura.com.br', // $scope.login.email,
                senha: 'alura123' // $scope.login.senha
            }
        };

        CarroService.realizarLogin(dadosDoLogin).then(function(response){
            if (response.status === 200){
                $ionicPopup.alert({
                    title: 'Seja bem-vindo',
                    template: 'Login efetuado com sucesso.'
                });
                var dados = response.data;
                $rootScope.usuario = dados.usuario;
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

angular.module('starter')
.controller('MenuController', function($scope, $rootScope){

    $scope.usuarioLogado = $rootScope.usuario;

});

angular.module('starter')
.controller('PerfilController', function($rootScope, $scope){

    $scope.estaEditando = false;
    $scope.textoBotao = 'Editar';

    $scope.acaoBotao = function(){
        if($scope.estaEditando){
            $scope.estaEditando = false;
            $scope.textoBotao = 'Editar'
        } else {
            $scope.estaEditando = true;
            $scope.textoBotao = 'Salvar';
        }
    }
    
    $scope.usuarioLogado = $rootScope.usuario;

});