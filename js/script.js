var app = angular.module("contatos", ['notification','ngRoute']);

/*app.service('noti', function() {

    this.ask = function(scope) {
        scope.askPermision = function() {
          scope.n.requestPermission()
                .then(function success(value) {
                    new Notification('Notification allowed', {
                        body: value,
                        delay: 5000
                    });
                    log.error("sucesso");
                }, function error() {
                    $log.error("Can't request for notification");
                })
        };
    }

    this.new = function(scope) {
        scope.createNotification = function() {

            var notification = scope.n('New message', {
                body: 'You have a new message.',
                delay: 2000
            });
            notification.$on('show', function() {
                console.log('My notification is displayed.');
            });
            notification.$on('click', function() {
                console.log('The user has clicked in my notification.');
            });
            notification.$on('close', function() {
                console.log('The user has closed my notification.');
            });
            notification.$on('error', function() {
                console.log('The notification encounters an error.');
            });
        }
    }

});*/


app.directive("uiContato",function(){
    return {
        templateUrl: "view/ui-contato.html",
        restrict: "E"
    }
})

app.directive("uiNote",function(){
    return {
        templateUrl: "view/ui-note.html",
        restrict: "E"
    }
})


app.directive("adcContato",function(){
    return {
        templateUrl: "view/adc-contato.html",
        restrict: "E"
    }
})



app.controller("ctrl_contatos", function($scope, $timeout, $notification, $log) {
  //$scope.n = $notification;
    //noti.ask($scope);
    //noti.new($scope);



    idCount = 3;
    p1 = {
        "id": 1,
        "nome": "Luan",
        "email": "",
        "numero": '33625271'
    }
    p2 = {
        "id": 2,
        "nome": "Laila",
        "email": "",
        "numero": '33777771'
    }
    p3 = {
        "id": 3,
        "nome": "Larissa",
        "email": "",
        "numero": '22222222'
    }
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.mostrarExcluir = false;
    $scope.mostarTelaContato = false;


    $scope.contatos = [p1, p2, p3];
    $scope.titulo = "Contatos";

    $scope.apagaContato = function($event, id) {
        angular.element($event.target).parent().addClass("obj-recua");
        $timeout(function() {


            $scope.contatos = $scope.contatos.filter(function(c) {
                return c.id != id;
            })

            $scope.reset();
            $scope.sumir = "";

        }, 400);
    }

    $scope.alterarExcluir = function() {
        $scope.mostrarExcluir = !$scope.mostrarExcluir;
    }

    $scope.adicionarContato = function(contato) {
        p = {
            "id": ++idCount,
            "nome": contato.nome,
            "email": "",
            "numero": contato.numero
        }
        $scope.contatos.push(p);
        $scope.mostarTelaContato = false;
        var resizeBar;
        $timeout(function() {

            var ultimoElemento = document.getElementsByClassName("contato").length - 1;
            resizeBar = angular.element(document.getElementsByClassName("contato")[ultimoElemento]);
            resizeBar.addClass("obj-inclui");


        }, 0);

        $timeout(function() {
            console.log(resizeBar);
            resizeBar.removeClass("obj-inclui");
        }, 400);

        contato.nome = "";
        contato.numero = "";
        $scope.reset();
    }

    $scope.reset = function() {

        $scope.mostrarExcluir = false;
        $scope.mostarTelaContato = false;
    }

    $scope.mudaCorAba = function($event, cor) {
        if(cor == 'contato'){
          angular.element(document.querySelector(".aba-contatos")).addClass("aba-ativa");

          angular.element(document.querySelector(".aba-anotacoes")).removeClass("aba-ativa");
        }else{
          angular.element(document.querySelector(".aba-anotacoes")).addClass("aba-ativa");

          angular.element(document.querySelector(".aba-contatos")).removeClass("aba-ativa");
        }
    }

})

app.config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl: "view/contatos.html"
    })

    .when("/contatos",{
        templateUrl: "view/contatos.html"
    })

    .when("/anotacoes",{
        templateUrl: "view/anotacoes.html"
    });

    $routeProvider.otherwise({redirect: "/index.html" })
})
