/*

  DeepBlue Starter Kit - version 1.1
  Copyright (c) 2015 INMAGIK SRL - www.inmagik.com
  All rights reserved

  written by Mauro Bianchi
  bianchimro@gmail.com  
  
  file: services.js
  description: this file contains all services of the DeepBlue app.

  */


  angular.module('deepBlue.services', [])

// CartService is an example of service using localStorage 
// to persist items of the cart.
.factory('CartService', [function () {

  var svc = {};
  svc.multiplie = 1;

  svc.setMultiplie = function(newMultiplie){
    svc.multiplie = newMultiplie;
  };

  svc.saveCart = function(cart){
    window.localStorage.setItem('cart', JSON.stringify(cart));
  };

  svc.loadCart = function(){
    var cart = window.localStorage.getItem('cart');
    if(!cart){
      return { products : [ ] }
    }
    return JSON.parse(cart);
  };

  svc.resetCart = function(){
    var cart =  { products : [ ] };
    svc.multiplie = 1;
    svc.saveCart(cart);
    return cart;
  };

  svc.getTotalSr = function(cart){
    var out = 0;
    if(!cart || !cart.products || !angular.isArray(cart.products)){
      return out;
    }
    for(var i=0; i < cart.products.length; i++){
      out += cart.products[i].sucre_rapide;
    }
    return Math.round(out*100)/100;
  }

  svc.getTotalSl = function(cart){
    var out = 0;
    if(!cart || !cart.products || !angular.isArray(cart.products)){
      return out;
    }
    for(var i=0; i < cart.products.length; i++){
      out += cart.products[i].sucre_lent;
    }
    return Math.round(out*100)/100;
  }

  return svc;

}])

.factory('UserService', [function () {

  var svc = {};


  svc.saveUser = function(user){
    window.localStorage.setItem('user', JSON.stringify(user));
  };

  svc.loadUser = function(){
    var user = window.localStorage.getItem('user');
    if(!user){
      return { protocols : [ ] }
    }
    return JSON.parse(user);
  };

  svc.resetUser = function(){
    var user =  { protocols : [ ] };
    svc.saveUser(user);
    return user;
  };

  return svc;

}])


// #SIMPLIFIED-IMPLEMENTATION
// This is an example if backend service using $http to get
// data from files.
// In this example, files are shipped with the application, so 
// they are static and cannot change unless you deploy an application update
// Other possible implementations (not covered by this kit) include:
// - loading dynamically json files from the web 
// - calling a web service to fetch data dinamically
// in those cases be sure to handle url whitelisting (specially in android)
// (https://cordova.apache.org/docs/en/5.0.0/guide_appdev_whitelist_index.md.html)
// and handle network errors in your interface
.factory('BackendService', ['$http', function ($http) {

  var svc = {};

  //Recuperation of fonctions for Quick

  svc.getFeeds = function(){
    return $http.get('sampledata/feeds.json');
  }

  svc.getProductsMacDo = function(){
    return $http.get('sampledata/mcdo.json');
  }

  svc.getProductsQuickBurger = function(){
    return $http.get('sampledata/dbquickburger.json');
  }

  svc.getProductsQuickSalade = function(){
    return $http.get('sampledata/dbquicksalade.json');
  }

  svc.getProductsQuickAccompagnement = function(){
    return $http.get('sampledata/dbquickaccompagnement.json');
  }

  svc.getProductsQuickSauce = function(){
    return $http.get('sampledata/dbquicksauce.json');
  }

  svc.getProductsQuickBoisson = function(){
    return $http.get('sampledata/dbquickboisson.json');
  }

  svc.getProductsQuickBoissonChaude = function(){
    return $http.get('sampledata/dbquickboissonchaude.json');
  }

  svc.getProductsQuickDessert = function(){
    return $http.get('sampledata/dbquickdessert.json');
  }

  svc.getProductsQuickPatisserie = function(){
    return $http.get('sampledata/dbquickpatisserie.json');
  }

  svc.getProductsQuickFingerfood = function(){
    return $http.get('sampledata/dbquickfingerfood.json');
  }

  //Recuperation of fonctions for McDo

  svc.getProductsMcDoBurger = function(){
    return $http.get('sampledata/dbmcdoburger.json');
  }

  svc.getProductsMcDoSalade = function(){
    return $http.get('sampledata/dbmcdosalade.json');
  }

  svc.getProductsMcDoAccompagnement = function(){
    return $http.get('sampledata/dbmcdoaccompagnement.json');
  }

  svc.getProductsMcDoSauce = function(){
    return $http.get('sampledata/dbmcdosauce.json');
  }

  svc.getProductsMcDoBoisson = function(){
    return $http.get('sampledata/dbmcdoboisson.json');
  }

  svc.getProductsMcDoBoissonChaude = function(){
    return $http.get('sampledata/dbmcdoboissonchaude.json');
  }

  svc.getProductsMcDoDessert = function(){
    return $http.get('sampledata/dbmcdodessert.json');
  }

  svc.getProductsMcDoPatisserie = function(){
    return $http.get('sampledata/dbmcdopatisserie.json');
  }

  return svc;
}])