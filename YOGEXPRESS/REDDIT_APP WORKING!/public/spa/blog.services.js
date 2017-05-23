(function() {
  'use strict'

  angular.module('cpt')
    .service('bService', service)
  service.$inject = ['$http', '$stateParams', '$state', '$filter']

  function service($http, $stateParams, $state, $filter) {

    let sortPosts
    this.sort = function(sortOrder) {
      sortPosts = sortOrder
      console.log(sortPosts);
    }
    this.sorted = function() {
      console.log(sortPosts);
      // return sortPosts
      // return $http.get('/api/posts').then((all) => {
      //   return $filter('orderBy')(all.data, sortPosts)
      // }).then((sorted) => {
      //   return sorted
      // })
    }

    this.allPosts = function() { // Grabs all posts
      return $http.get('/api/posts').then(all => all.data)
    }


    this.newPost = function(newPost) { // Makes new post
      $http.post('/api/posts', newPost)
      $state.reload();
    }

    this.$del = function(id) { // Removes Post by ID
      $http.delete(`/api/posts/${$stateParams.id}`).then(d => $state.go('cpt.all'))
    }

    this.$like = function(post, dir) { // Handles both likes and dislikes
      post.negative = false // Makes my error span pop out atcha
      dir == true ?
        $http.post(`/api/posts/${post.id}/votes`)
        .then(likes => post.vote_count = likes.data.vote_count) :
        (dir == false && post.vote_count > 0) ?
        $http.delete(`/api/posts/${post.id}/votes`)
        .then(dislikes => post.vote_count = dislikes.data.vote_count) :
        post.negative = !post.negative // makes my error pop out if they try and go past 0
    }

    this.$Post = function(id) { // Grab a post by ID
      return $http.get(`api/posts/${$stateParams.id}`).then(one => one.data)
    }

    this.edit = function(post) { // Patches current Post by ID
      $http.patch(`api/posts/${$stateParams.id}/`, post)
      $state.go('cpt.all')
    }

  }
})();
