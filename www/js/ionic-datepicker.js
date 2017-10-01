angular.module('starter')
.config(function (ionicDatePickerProvider) {
    var configuracoes = {
        setLabel: 'Selecionar',
        todayLabel: 'Hoje',
        closeLabel: 'Fechar',
        mondayFirst: false,
        weeksList: ["D", "S", "T", "Q", "Q", "S", "S"],
        monthsList: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        from: new Date(),
        dateFormat: 'dd-MM-yyyy'
    };
    ionicDatePickerProvider.configDatePicker(configuracoes);
});