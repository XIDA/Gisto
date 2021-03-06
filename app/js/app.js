'use strict';

// Declare app level module which depends on filters, and services
angular.module('gisto', [
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ui.utils',
        'gisto.filter.removeTags',
        'gisto.filter.truncate',
        'gisto.filter.publicOrPrivet',
        'gisto.filter.removeTags',
        'gisto.filter.markDown',
        'gisto.filter.codeLanguage',
        'gisto.filter.removeTagSymbol',
        'gisto.filter.dotToDash',
        'gisto.filter.githubFileName',
		'gisto.filter.gistsearch',
        'gisto.directive.scrollTo',
        'gisto.directive.editor',
        'gisto.directive.toUrl',
        'gisto.service.gistData',
        'gisto.service.requestHandler',
        'gisto.service.gitHubAPI',
        'gisto.service.appSettings',
        'btford.socket-io',
        'gisto.service.notificationService',
        'gisto.service.onlineStatusService'
    ]).
    factory('socket', function (socketFactory) {
        return socketFactory({
            //prefix: '',
            //ioSocket: io.connect('http://localhost:3001') //development
            ioSocket: io.connect('http://server.gistoapp.com:3001')
        });
    }).
    config(['$routeProvider', function ($routeProvider) {

        // connect to notification server
//        var socket = io.connect('http://localhost:3000'); // development
//        var socket = io.connect('http://server.gistoapp.com:3000'); // production
//        socketProvider.ioSocket(socket);
//        window.ioSocket = socket;

        $routeProvider.when('/', {
            templateUrl: 'partials/empty.html',
            controller: mainCtrl
        });
        $routeProvider.when('/login', {
            name: 'login',
            templateUrl: 'partials/login.html',
            controller: loginCtrl
        });
        $routeProvider.when('/settings', {
            templateUrl: 'partials/settings.html'
        });
        $routeProvider.when('/gist/:gistId', {
            templateUrl: 'partials/single-gist.html',
            controller: singleGistCtrl
        });
        $routeProvider.when('/history/:gistId/rev/:gistRevisionId', {
            templateUrl: 'partials/history.html',
            controller: singleGistHistoryCtrl
        });
        $routeProvider.when('/create', {
            templateUrl: 'partials/create.html',
            controller: createGistCtrl
        });
        $routeProvider.when('/shared/:user/:id', {
            templateUrl: 'partials/shared.html',
            controller: sharedCtrl
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }]).run(function($rootScope, $animate) {
        $rootScope.gistoReady = false;

       $rootScope.$on('$routeChangeStart', function() {
          $rootScope.edit = false;
       });
    });
