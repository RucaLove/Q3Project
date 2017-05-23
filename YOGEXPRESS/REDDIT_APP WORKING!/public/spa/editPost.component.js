(function() {
  'use strict'

  angular.module('cpt')
    .component('editPost', {
      templateUrl: '/views/editPost.template.html',
      controller: editController
    })

  editController.$inject = ['bService']

  function editController(bService) {
    const vm = this
    vm.$onInit = onInit
    vm.editPost = editPost
    vm.deleter = deleter

    function onInit(id) {
      bService.$Post(id).then((editable) => { // Grabs Post by ID
        vm.post = editable
      })
    }

    function editPost(post) {
      bService.edit(vm.post) // Patches Post by ID
    }

    function deleter(id) {
      bService.$del(id) // Deletes Post by ID
    }

  } // END editController
}());
