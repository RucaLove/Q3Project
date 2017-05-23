(function() {
  'use strict'

  angular.module('app')
    .component('navigation', {
      templateUrl: '/templates/navigation.template.html',
      controller: NavigationController,
    })

  postsController.$inject = ['PostsService']

  function NavigationController(PostsService) {
    const vm = this
    vm.$onInit = onInit


    /* Set the width of the side navigation to 250px */
    function openLeftNav() {
        document.getElementById("leftnav").style.width = "250px";
        // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    /* Set the width of the side navigation to 0 */
    function closeLeftNav() {
        document.getElementById("leftnav").style.width = "0";
    }

    /* Set the width of the side navigation to 250px */
    function openRightNav() {
        document.getElementById("rightnav").style.width = "250px";
        // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    /* Set the width of the side navigation to 0 */
    function closeRightNav() {
        document.getElementById("rightnav").style.width = "0";
    }


          .component('leftnavbar', {
              controller: function() {
                  const vm = this

                  vm.navBarProfile = function() {
                      console.log("You clicked Profile");
                  }

                  vm.navBarPostures = function() {
                      console.log("You clicked postures");
                  }

                  vm.navBarSettings = function() {
                      console.log("You clicked settings");
                  }

                  vm.navBarSignOut = function() {
                      console.log("You clicked Signout");
                  }
              },

          })

          .component('rightnavbar', {
              controller: function() {
                  const vm = this

                  vm.navBarChakra1 = function() {
                      console.log("You clicked Chakra 1");
                  }

                  vm.navBarChakra2 = function() {
                      console.log("You clicked Chakra 2");
                  }

                  vm.navBarChakra3 = function() {
                      console.log("You clicked Chakra 3");
                  }

                  vm.navBarChakra4 = function() {
                      console.log("You clicked Chakra 4");
                  }
                  vm.navBarChakra5 = function() {
                      console.log("You clicked Chakra 5");
                  }
                  vm.navBarChakra6 = function() {
                      console.log("You clicked Chakra 6");
                  }
                  vm.navBarChakra7 = function() {
                      console.log("You clicked Chakra 7");
                  }
              },

          })


} // END CONTROLLER
}());
