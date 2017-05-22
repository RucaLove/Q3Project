(function() {
  'use strict'

  angular.module('app')
    .component('comments', {
      templateUrl: '/templates/comments.template.html',
      controller: CommentsController
    })

  CommentsController.$inject = ['PostsServices', 'CommentsServices']

  function CommentsController(PostsServices, CommentsServices) {
    const vm = this
    vm.$onInit = onInit
    vm.addComment = addComment
    vm.likes = likes

    function onInit(id) {
      // PostsServices.$Post(id).then(post => { // Grabs an Individual post
      //   vm.post = post
      //   CommentsServices.allComments().then(all => { // Grabs all the memes
      //     vm.comments = all
      //   })
      // })
    }

    function likes(post, dir) { // Likes functionality
      // PostsServices.$like(vm.post, dir)
    }

    function addComment() {
      // CommentsServices.addComment(vm.comment) // Adds a comment
    }

  } // END CommentController
}());
