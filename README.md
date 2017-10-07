# AluraCar

Este projeto foi desenvolvido ao longo do curso Ionic 1, realizado na Alura.

Ionic é um agrupamento de tecnologias para desenvolvimento de aplicações híbridas. Mas para entender como ele funciona, precisamos esclarecer de onde o projeto se originou:

Os sistemas operacionais (SO) móveis possuem um componente chamado WebView, que basicamente é um browser (mas sem barra de endereços, favoritos, URLs; apenas o container de visualização) que permite navegação. 

Em 2009 uma startup canadense chamada Nitobi criou o projeto Phonegap. Esse projeto estendeu o WebView para fazer acesso nativo ao hardware e SO do aparelho (câmera, geolocalização, bateria, lista de contatos, etc.). Foram criados plugins que faziam uma ponte entre o código JavaScript e o código nativo através de uma biblioteca. Começaram com o iOS, seguido pelo Android e ampliando para outras plataformas. Em 2011 a Adobe adquiriu a startup alterando o nome da tecnologia para Apache Cordova.

A ideia é escrever o código em HTML, CSS e JavaScript apenas uma vez e através do Apache Cordova fazer a compilação nativa para cada plataforma. Para acessar as funcionalidades do dispositivo o desenvolvedor utiliza uma API JavaScript que é convertida em código nativo pelo Apache Cordova.

O Ionic possui um estilo HTML e CSS próprio que lembra a aparência dos aplicativos nativos (mas não é igual), baseado em componentes web. A lógica de programação utiliza AngularJS (framework JavaScript mantido pela Google) mas também permite que o programador escreva seu próprio código.

Também possui uma CLI (interface de linha de comando), que se baseia na CLI do Cordova e do AngularJS, para: criação de projetos; adição de plugins, páginas; compilação para as diversas plataformas (iOS, Android, etc.).

Neste projeto você vai encontrar implementações de:
* Menu lateral
* Login
* Formulários
* Listas dinâmicas
* Web API
* WebSQL
* ionic-datePicker
* cordova-plugin-camera
