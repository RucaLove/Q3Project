(function() {
  'use strict'

  angular.module('app')
    .component('newPost', {
      templateUrl: '/templates/newPost.template.html',
      controller: newPostController
    })

  newPostController.$inject = ['PostsService']

  function newPostController(PostsService) {
    const vm = this
    vm.open = true
    vm.newPost = newPost

    function newPost() {
      // PostsService.newPost(vm.post) // Makes a New Post
    }

  } // END newPostController
}());
