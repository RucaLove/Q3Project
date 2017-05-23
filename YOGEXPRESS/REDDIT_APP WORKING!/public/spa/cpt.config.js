(function() {
  'use strict';
  angular.module('cpt').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'] // DEPENDENCY INJECTION INTO CONFIG
  function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true) // Setting clean URLs (no hashtags)
    $stateProvider // DEFINING ADDITIONAL STATES FOR Single-Page-Application
      .state({ // main state/component on every page
        name: 'cpt',
        component: 'cpt'
      })
      .state({ // 1st STATE (on click in this case)
        name: 'cpt.all',
        url: '/',
        component: 'posts'
      })
      .state({ // 2nd STATE (on click in this case)
        name: 'cpt.edit',
        url: '/posts/:id',
        component: 'editPost'
      })
      .state({ // 3rd STATE (on click in this case)
        name: 'cpt.comment',
        url: '/posts/:id/comments',
        component: 'comments'
      })
  } // END CONFIG FUNCTION
}());
