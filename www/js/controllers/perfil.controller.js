angular.module('starter')
.controller('PerfilController', function ($rootScope, $scope, $cordovaCamera) {

    $scope.estaEditando = false;
    $scope.textoBotao = 'Editar';

    $scope.acaoBotao = function () {
        if ($scope.estaEditando) {
            $scope.estaEditando = false;
            $scope.textoBotao = 'Editar';
        } else {
            $scope.estaEditando = true;
            $scope.textoBotao = 'Salvar';
        }
    }

    $scope.usuarioLogado = $rootScope.usuario;

    $scope.tirarFoto = function () {

        var opcoes = {
            quality: 70,
            cameraDirection: 1,
            correctOrientation: true
        }

        $cordovaCamera.getPicture(opcoes).then(function(foto){
            $scope.caminhoFoto = foto;
        }, function(erro){

        })

    }

});