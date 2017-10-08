angular.module('starter')
.controller('PerfilController', function ($rootScope, $scope, $cordovaCamera, $ionicPopup, $ionicActionSheet, $timeout) {

    $scope.usuarioLogado = $rootScope.usuario;
    $scope.caminhoFoto = window.localStorage.getItem('fotoPerfil');

    $scope.estaEditando = false;
    $scope.textoBotao = 'Editar';

    $scope.acaoBotao = function () {
        if ($scope.estaEditando) {
            console.log($scope.salvarFoto($scope.caminhoFoto));
            $scope.estaEditando = false;
            $scope.textoBotao = 'Editar';
        } else {
            $scope.estaEditando = true;
            $scope.textoBotao = 'Salvar';
        }
    }

    $scope.opcoesFoto = function(){
        
        $ionicActionSheet.show({
            buttons: [
                { text: 'Câmera' },
                { text: 'Galeria' }
            ],
            titleText: 'Alterar foto',
            cancelText: 'Cancelar',
            buttonClicked: function(index) {
                if (index == 0) {
                    $scope.alterarFoto($scope.camera);
                } else if (index == 1) {
                    $scope.alterarFoto($scope.galeria);
                }
                return true;
            }
        });

    }

    $scope.camera = {
        quality: 70,
        allowEdit: false,
        correctOrientation: true,
        cameraDirection: Camera.Direction.BACK
    }

    $scope.galeria = {
        quality: 70,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    }

    $scope.alterarFoto = function alterarFoto(opcoes) {

        $cordovaCamera.getPicture(opcoes).then(function(foto){

            plugins.crop.promise(foto, {quality:30}).then(function(novaFoto){
                $scope.$apply(function(){
                    $scope.caminhoFoto = novaFoto;
                });
            }, function(erro) {
                console.log("erroCrop: " + erro);
            });
            
            

        }, function(erro){
            console.log("tirarFoto.erro: " + erro);
        });

    }

    $scope.salvarFoto = function(foto) {
        window.resolveLocalFileSystemURL(foto, copyFile, fail);
        var nomeDoArquivo = "";
        function copyFile(foto) {
            nomeDoArquivo = foto.fullPath.substr(foto.fullPath.lastIndexOf('/') + 1);

            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(novoArquivo) {
                foto.copyTo(
                    novoArquivo,
                    nomeDoArquivo,
                    onCopySuccess,
                    fail
                );
            },
            fail);
        }

        function onCopySuccess(foto) {
            $scope.$apply(function () {
                $scope.caminhoFoto = foto.nativeURL;
                window.localStorage.setItem('fotoPerfil', cordova.file.dataDirectory + nomeDoArquivo)
            });
        }

        function fail(erro) {
            console.log("erro: " + erro);
        }
    }

    $scope.urlForImage = function(imageName) {
      var name = imageName.substr(imageName.lastIndexOf('/') + 1);
      var trueOrigin = cordova.file.dataDirectory + name;
      return trueOrigin;
    }

    $scope.baixarFoto = function(){
        fileTransfer = new FileTransfer();
        fileTransfer.download(
            'url imagem',
            cordova.file.dataDirectory + 'nome-da-foto.jpg',
            function(download) {
                $scope.$apply(function () {
                    $scope.caminhoFoto = download.toURL();
                    window.localStorage.setItem('fotoPerfil', download.toURL())
                });
            },
            function(erro) {
                console.log("download.erro: " + erro);
            }
        );
    }

});