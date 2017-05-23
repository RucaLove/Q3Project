(function() {
  'use strict'

  angular.module('cpt')
    .component('searchSort', {
      templateUrl: '/views/searchSort.template.html',
      controller: searchSortController,
    })

  searchSortController.$inject = ['bService', '$filter']

  function searchSortController(bService, $filter) {
    const vm = this
    vm.form = false
    vm.postForm = postForm
    vm.sort = sort

    function postForm() { // OPEN THE NEW POST FORM
      vm.form = !vm.form
    }

    function sort() {
      let sortOrder = vm.sortOrder
      bService.sort(sortOrder) // PASS IN CLIENT SPECI
    }


  }
}());
