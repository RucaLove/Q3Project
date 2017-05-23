(function() {
  'use strict'

  angular.module('app')
    .service('UsersServices', service)
  service.$inject = ['$http', '$stateParams', '$state', '$filter']

  function service($http, $stateParams, $state, $filter) {

    this.allUsers = function() { // Grabs all users
      return $http.get('/users').then(all => all.data)
    }

    this.createUser = function(createUser) { // Makes new user
      $http.user('/users', createUser)
      $state.reload();
    }

    this.$del = function(id) { // Removes User by ID
      $http.delete(`/users/${$stateParams.id}`).then(d => $state.go('app.all'))
    }

    this.$like = function(user, dir) { // Handles both likes and dislikes
      user.negative = false // Makes my error span pop out atcha
      dir == true ?
        $http.user(`/users/${user.id}/votes`)
        .then(likes => user.vote_count = likes.data.vote_count) :
        (dir == false && user.vote_count > 0) ?
        $http.delete(`/users/${user.id}/votes`)
        .then(dislikes => user.vote_count = dislikes.data.vote_count) :
        user.negative = !user.negative // makes my error pop out if they try and go past 0
    }

    this.$User = function(id) { // Grab a user by ID
      return $http.get(`api/users/${$stateParams.id}`).then(one => one.data)
    }

    this.edit = function(user) { // Patches current User by ID
      $http.patch(`api/users/${$stateParams.id}/`, user)
      $state.go('app.all')
    }

    //THIS IS BROKEN ATM

    // let sortUsers
    // this.sort = function(sortOrder) {
    //   sortUsers = sortOrder
    //   console.log(sortUsers);
    // }
    // this.sorted = function() {
    //   console.log(sortUsers);
    //   return sortUsers
    //   return $http.get('/users').then((all) => {
    //     return $filter('orderBy')(all.data, sortUsers)
    //   }).then((sorted) => {
    //     return sorted
    //   })
    // }

  }
})();
