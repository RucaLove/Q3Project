(function() {
  'use strict'

  angular.module('app')
    .component('users', {
      templateUrl: '/templates/users.template.html',
      controller: UsersController,
    })

  UsersController.$inject = ['UsersServices']

  function UsersController(UsersServices) {
    const vm = this
    vm.$onInit = onInit
    vm.likes = likes
    // vm.sort = sort
    vm.sortPosts = sortPosts

    function onInit() {
      UsersServices.allPosts() // Grabs all Posts
        .then((all) => {
          vm.users = all
        })
    }

    function sortPosts() {
      UsersServices.sorted()
          .then((all) => {
            return all
          })
    }

    function sort() { // WORKS BUT YOU HAVE TO CLICK IT
      UsersServices.sorted()
      .then((all) => {
        vm.users = all
      })
    }

    function likes(user, dir) {
      UsersServices.$like(user, dir) // Like functionality
    }

  } // END CONTROLLER
}());
