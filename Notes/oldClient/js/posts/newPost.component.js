(function() {
  'use strict'

  angular.module('app')
    .component('newPost', {
      templateUrl: '/templates/newPost.template.html',
      controller: newPostController
    })

  newPostController.$inject = ['PostService']

  function newPostController(PostService) {
    const vm = this
    vm.open = true
    vm.newPost = newPost

    function newPost() {
      // PostService.newPost(vm.post) // Makes a New Post
    }

  } // END newPostController
}());
