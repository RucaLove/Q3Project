(function() {
  'use strict'

  angular.module('app')
    .component('posts', {
      templateUrl: 'posts.template.html',
      controller: PostsController,
    })

  PostsController.$inject = ['PostsService']

  function PostsController(PostsService) {
    const vm = this
    vm.$onInit = onInit
    vm.likes = likes
    // vm.sort = sort
    // vm.sortPosts = sortPosts

    function onInit() {
      PostsService.allPosts() // Grabs all Posts
        .then((all) => {
          vm.posts = all
        })
    }

    function likes(post, dir) {
      PostsService.$like(post, dir) // Like functionality
    }

  // THIS IS BROKEN ATM

    // function sortPosts() {
    //   PostsService.sorted()
    //       .then((all) => {
    //         return all
    //       })
    // }
    //
    // function sort() { // WORKS BUT YOU HAVE TO CLICK IT
    //   PostsService.sorted()
    //   .then((all) => {
    //     vm.posts = all
    //   })
    // }



  } // END CONTROLLER
}());
