(function() {
  'use strict'

  angular.module('app')
    .component('editPost', {
      templateUrl: '/templates/editPost.template.html',
      controller: editController
    })

  editController.$inject = ['PostService']

  function editController(PostService) {
    const vm = this
    vm.$onInit = onInit
    vm.editPost = editPost
    vm.deleter = deleter

    function onInit(id) {
      // PostService.$Post(id).then((editable) => { // Grabs Post by ID
      //   vm.post = editable
      // })
    }

    function editPost(post) {
      // PostService.edit(vm.post) // Patches Post by ID
    }

    function deleter(id) {
      // PostService.$del(id) // Deletes Post by ID
    }

  } // END editController
}());
