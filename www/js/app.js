/*

  DeepBlue Starter Kit - version 1.1
  Copyright (c) 2015 INMAGIK SRL - www.inmagik.com
  All rights reserved

  written by Mauro Bianchi
  bianchimro@gmail.com  
  
  file: js
  
  */

  angular.module('deepBlue', ['ionic', 'deepBlue.controllers', 'deepBlue.services'])

  .run(function($ionicPlatform, $rootScope, $timeout, $state) {
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    /* 
      #SIMPLIFIED-IMPLEMENTATION:
      Example access control.
      A real app would probably call a service method to check if there
      is a logged user.

      #IMPLEMENTATION-DETAIL: views that require authorizations have an
      "auth" key with value = "true".
      */
      $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){
          if(toState.data && toState.data.auth == true && !$rootScope.user.email){
            event.preventDefault();
            $state.go('login');   
          }
        });

    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

  /*

    Here we setup the views of our 
    In this case:
    - feed, account, shop, checkout, cart will require login
    - app will go to the "start view" when launched.

    #IMPLEMENTATION-DETAIL: views that require authorizations have an
    "auth" key with value = "true".

    */

    $stateProvider

    .state('start', {
      url: '/start',
      templateUrl: 'templates/start.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller : 'LoginCtrl'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html'
    })

    .state('mealselect', {
      url: '/mealselect',
      templateUrl: 'templates/mealselect.html',
      controller : 'MealselectCtrl'
    })

    .state('enseignes', {
      url: '/enseignes',
      templateUrl: 'templates/enseignes.html'
    })

    /* shopMacDo */
    .state('shopMacDo', {
      url: '/shopMacDo',
      templateUrl: 'templates/shopMacDo.html',
      controller : 'ShopMacDoCtrl'
    })

    /* ShopQuick */
    .state('shopQuick', {
      url: '/shopQuick',
      templateUrl: 'templates/shopQuick.html',
      controller : 'ShopQuickCtrl'
    })

    .state('listRepas', {
      url: '/listRepas',
      templateUrl: 'templates/listRepas.html',
      controller : 'ListRepasCtrl'
    })


  // If none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');

});
