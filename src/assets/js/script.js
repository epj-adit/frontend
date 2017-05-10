document.addEventListener("DOMContentLoaded", function() {
    var hamburger = document.getElementById('mobile-menu');
    var mainNav = document.getElementById('mainnav');

    // toggle mobile menu
    hamburger.addEventListener('click', function () {
        if (mainNav.style.display == 'block') {
            mainNav.style.display = 'none'
        } else {
            mainNav.style.display = 'block'
        }
    });

    // close mobile menu if user clicks anywhere
    document.addEventListener('click', function(event) {
        if (mobileMenuVisible() && !hamburger.contains(event.target) ) {
            mainNav.style.display = 'none'
        }
    });

    // maintain correct visibility while resizing
    window.addEventListener('resize', function () {
        if (!isMobile()) {
            mainNav.style.display = 'block'
        } else {
            mainNav.style.display = 'none'
        }
    });

    function isMobile() {
        return !(hamburger.offsetParent === null);
    }

    function mobileMenuVisible() {
        return isMobile() && !(mainNav.offsetParent === null);
    }
});

