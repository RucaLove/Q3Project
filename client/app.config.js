(function() {
  'use strict';
  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'] // DEPENDENCY INJECTION INTO CONFIG
  function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true) // Setting clean URLs (no hashtags)
    $stateProvider // DEFINING ADDITIONAL STATES FOR Single-Page-Application
      .state({ // main state/component on every page
        name: 'app',
        component: 'app'
      })
      .state({ // 1st STATE (on click in this case)
        name: 'app.all',
        url: '/',
        component: 'posts'
      })
      .state({ // 2nd STATE (on click in this case)
        name: 'app.edit',
        url: '/posts/:id',
        component: 'editPost'
      })
      .state({ // 3rd STATE (on click in this case)
        name: 'app.comment',
        url: '/posts/:id/comments',
        component: 'comments'
      })
      .state({ // 4th STATE (on click in this case)
        name: 'app.users',
        url: '/users/',
        component: 'users'
      })
      .state({ // 5th STATE (on click in this case)
        name: 'app.comment',
        url: '/posts/:id/comments',
        component: 'comments'
      })
  } // END CONFIG FUNCTION
}());
