(function() {
  'use strict'

  angular.module('cpt')
    .component('cpt', {
      templateUrl: '/views/cpt.template.html', // NAV BAR TEMPLATE
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
