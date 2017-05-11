/*
  
  DeepBlue Starter Kit - version 1.1
  Copyright (c) 2015 INMAGIK SRL - www.inmagik.com
  All rights reserved

  written by Mauro Bianchi
  bianchimro@gmail.com  
  
  file: controllers.js
  description: this file contains all controllers of the DeepBlue app.

  */

//controllers are packed into a module
angular.module('deepBlue.controllers', [])

.controller('LoginCtrl', function ($scope, UserService) {
  $scope.user = UserService.loadUser();
  $scope.saveUser = UserService.saveUser;
})


.controller('MealselectCtrl', function ($scope, UserService) {
  $scope.user = UserService.loadUser();

  $scope.selection = function(sr,sl){
    $scope.user.selec_SR = sr;
    $scope.user.selec_SL = sl;
    UserService.saveUser($scope.user);
  };

})

.controller('ListRepasCtrl', function ($scope, CartService, $ionicViewService, $ionicPopup) {
  $scope.cart = CartService.loadCart();

  // removes product from cart (making in persistent)
  $scope.dropProduct = function($index){
    $scope.cart.products.splice($index, 1);
    CartService.saveCart($scope.cart);
    // as this method is triggered in an <ion-option-button> 
    // we close the list after that (not strictly needed)
    $ionicListDelegate.closeOptionButtons();
  };

  addHistory = function(){
    $scope.cart = CartService.resetCart();
    setCart($scope.cart);

    /*var jsonStr = BackendService.getValidation()
    .success(function(newItems) {
      $scope.products = newItems;
      console.log(newItems)
      newItems['theTeam'].push({"teamId":"6","status":"pending"})
      //tete.newItems = true;
      console.log(newItems)
      newItems = JSON.stringify(newItems);
          
      var tete2 = { newItems : 'theTeam'};
      console.log("Init :" + tete2)
      localStorage.setItem("myObject", JSON.stringify(tete2));
      console.log("Inter :" + tete2)
      tete2 = JSON.parse(localStorage.getItem("myObject"));
      console.log("Final :" + tete2)
    })*/
  };

  $scope.showPopupSession = function() {
    addHistory();
    var alertPopup = $ionicPopup.alert({
      template: 'Votre repas a été validé.',
      cssClass: 'black-color text-center'
    });
  };

  $scope.goBack = function(){
    var backView = $ionicViewService.getBackView();
    setCart($scope.cart);
    backView && backView.go();
  };
})


// Shop MacDoCtrl controller.
.controller('ShopMacDoCtrl', function($scope, UserService, $ionicActionSheet, BackendService, CartService) {

  //load cart from localStorage
  $scope.cart = CartService.loadCart();
  //load user from loadUser
  $scope.user = UserService.loadUser();
  //load multiplie from loadUser
  $scope.multiplie = CartService.multiplie;

  // we assign getTotal method of CartService to $scope to have it available
  $scope.getTotalSr = CartService.getTotalSr;
  $scope.getTotalSl = CartService.getTotalSl;

  setCart = function(cartNew){
    $scope.cart = cartNew;
  };

  // private method to add a product to cart
  var addProductToCart = function(product){
    $scope.cart.products.push(product);
    CartService.saveCart($scope.cart);
  };

  $scope.setMultiplie = function(newMultiplie){
    CartService.setMultiplie(newMultiplie);
    $scope.multiplie = newMultiplie;
  };

  // method to add a product to cart via $ionicActionSheet
  $scope.addProduct = function(product){
    $ionicActionSheet.show({
     buttons: [
     { text: '<b>Ajouter à ma sélection</b>' }
     ],
     titleText: 'Sélectionner ' + product.title,
     cancelText: 'Annuler',
     cssClass: 'black-color',
     cancel: function() {
          // add cancel code if needed ..
        },
        buttonClicked: function(index) {
         if(index == 0){
           addProductToCart(product);
           return true;
         }
         return true;
       }
     });
  };

  $scope.doRefreshBurger = function(){
    BackendService.getProductsMcDoBurger()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshSalade = function(){
    BackendService.getProductsMcDoSalade()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshAccompagnement = function(){
    BackendService.getProductsMcDoAccompagnement()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshSauce = function(){
    BackendService.getProductsMcDoSauce()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshBoisson = function(){
    BackendService.getProductsMcDoBoisson()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshBoissonChaude = function(){
    BackendService.getProductsMcDoBoissonChaude()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshDessert = function(){
    BackendService.getProductsMcDoDessert()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshPatisserie = function(){
    BackendService.getProductsMcDoPatisserie()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  //trigger initial refresh of products
  $scope.doRefreshBurger();
})


// Shop Quick controller.
.controller('ShopQuickCtrl', function($scope, UserService, $ionicActionSheet, BackendService, CartService) {

  //load cart from localStorage
  $scope.cart = CartService.loadCart();
  //load user from loadUser
  $scope.user = UserService.loadUser();
  //load multiplie from loadUser
  $scope.multiplie = CartService.multiplie;

  // we assign getTotal method of CartService to $scope to have it available
  $scope.getTotalSr = CartService.getTotalSr;
  $scope.getTotalSl = CartService.getTotalSl;

  setCart = function(cartNew){
    $scope.cart = cartNew;
  };

  // private method to add a product to cart
  var addProductToCart = function(product){
    $scope.cart.products.push(product);
    CartService.saveCart($scope.cart);
  };

  $scope.setMultiplie = function(newMultiplie){
    CartService.setMultiplie(newMultiplie);
    $scope.multiplie = newMultiplie;
  };

  // method to add a product to cart via $ionicActionSheet
  $scope.addProduct = function(product){
    $ionicActionSheet.show({
     buttons: [
     { text: '<b>Ajouter à ma sélection</b>' }
     ],
     titleText: 'Sélectionner ' + product.title,
     cancelText: 'Annuler',
     cssClass: 'black-color',
     cancel: function() {
          // add cancel code if needed ..
        },
        buttonClicked: function(index) {
         if(index == 0){
           addProductToCart(product);
           return true;
         }
         return true;
       }
     });
  };


  $scope.doRefreshBurger = function(){
    console.log("QUICKKKK")
    BackendService.getProductsQuickBurger()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshSalade = function(){
    BackendService.getProductsQuickSalade()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshAccompagnement = function(){
    BackendService.getProductsQuickAccompagnement()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshSauce = function(){
    BackendService.getProductsQuickSauce()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshBoisson = function(){
    BackendService.getProductsQuickBoisson()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshBoissonChaude = function(){
    BackendService.getProductsQuickBoissonChaude()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshDessert = function(){
    BackendService.getProductsQuickDessert()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshPatisserie = function(){
    BackendService.getProductsQuickPatisserie()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.doRefreshFingerfood = function(){
    BackendService.getProductsQuickFingerfood()
    .success(function(newItems) {
      $scope.products = newItems;
    })
    .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  //trigger initial refresh of products
  $scope.doRefreshBurger();
})