(function() {
  'use strict'

  angular.module('cpt')
    .service('cService', service)
  service.$inject = ['$http', '$stateParams', '$state']

  function service($http, $stateParams, $state) {

    this.allComments = function(id) { // Grabs all comments per Post ID 
      return $http.get(`/api/posts/${$stateParams.id}/comments`).then((all) => {
        return all.data
      })
    }

    this.$comment = function(comment) { // Adds a comment to Post ID
      $http.post(`/api/posts/${$stateParams.id}/comments`, comment)
      $state.reload();
    }

  }
})();
