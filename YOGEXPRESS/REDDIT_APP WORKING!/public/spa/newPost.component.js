(function() {
  'use strict'

  angular.module('cpt')
    .component('newPost', {
      templateUrl: '/views/newPost.template.html',
      controller: newPostController
    })

  newPostController.$inject = ['bService']

  function newPostController(bService) {
    const vm = this
    vm.open = true
    vm.newPost = newPost

    function newPost() {
      bService.newPost(vm.post) // Makes a New Post
    }

  } // END newPostController
}());
