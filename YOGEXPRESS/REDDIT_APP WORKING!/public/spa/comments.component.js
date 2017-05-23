(function() {
  'use strict'

  angular.module('cpt')
    .component('comments', {
      templateUrl: '/views/comments.template.html',
      controller: commentsController
    })

  commentsController.$inject = ['bService', 'cService']

  function commentsController(bService, cService) {
    const vm = this
    vm.$onInit = onInit
    vm.commenter = commenter
    vm.likes = likes

    function onInit(id) {
      bService.$Post(id).then(post => { // Grabs an Individual post
        vm.post = post
        cService.allComments().then(all => { // Grabs all the memes
          vm.comments = all
        })
      })
    }

    function likes(post, dir) {
      bService.$like(vm.post, dir) // Likes functionality
    }

    function commenter() {
      cService.$comment(vm.comment) // Adds a comment
    }

  } // END newCommentController
}());
