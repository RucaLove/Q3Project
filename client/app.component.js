(function() {
  'use strict'

  angular.module('app')
    .component('app', {
      // templateUrl: '/templates/app.template.html', // NAV BAR TEMPLATE
      controller: mainController
    })

  function mainController() {
    const vm = this
    vm.$onInit = onInit

    function onInit() {
      // vm.commentSection = false
    }
  } // END mainController
}());
