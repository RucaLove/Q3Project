(function() {
  'use strict'

  angular.module('cpt')
    .component('posts', {
      templateUrl: '/views/posts.template.html',
      controller: postsController,
    })

  postsController.$inject = ['bService']

  function postsController(bService) {
    const vm = this
    vm.$onInit = onInit
    vm.likes = likes
    // vm.sort = sort
    vm.sortPosts = sortPosts

    function onInit() {
      bService.allPosts() // Grabs all Posts
        .then((all) => {
          vm.posts = all
        })
    }

    function sortPosts() {
      bService.sorted()
      //     .then((all) => {
      //       return all
      //     })
    }

    // function sort() { // WORKS BUT YOU HAVE TO CLICK IT
    //   bService.sorted()
    //   .then((all) => {
    //     vm.posts = all
    //   })
    // }


    function likes(post, dir) {
      bService.$like(post, dir) // Like functionality
    }

  } // END CONTROLLER
}());
