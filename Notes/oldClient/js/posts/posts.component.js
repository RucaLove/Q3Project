(function() {
  'use strict'

  angular.module('app')
    .component('posts', {
      templateUrl: '/templates/posts.template.html',
      controller: postsController,
    })

  postsController.$inject = ['PostService']

  function postsController(PostService) {
    const vm = this
    vm.$onInit = onInit
    vm.likes = likes
    // vm.sort = sort
    vm.sortPosts = sortPosts

    function onInit() {
      PostService.allPosts() // Grabs all Posts
        .then((all) => {
          vm.posts = all
        })
    }

    function sortPosts() {
      PostService.sorted()
          .then((all) => {
            return all
          })
    }

    function sort() { // WORKS BUT YOU HAVE TO CLICK IT
      PostService.sorted()
      .then((all) => {
        vm.posts = all
      })
    }

    function likes(post, dir) {
      PostService.$like(post, dir) // Like functionality
    }

  } // END CONTROLLER
}());
