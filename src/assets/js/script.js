document.addEventListener("DOMContentLoaded", function() {
    var mobileMenu = document.getElementById('mobile-menu');
    var mainNav = document.getElementById('mainnav');

    // toggle mobile menu
    mobileMenu.addEventListener('click', function () {
        if (mainNav.style.display == 'block') {
            mainNav.style.display = 'none'
        } else {
            mainNav.style.display = 'block'
        }
    });

    // close mobile menu after click on menu item
    var menuItems = mainNav.getElementsByTagName('li');
    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('click', function () {
            if (isMobile()) {
                mainNav.style.display = 'none'
            }
        })
    }

    // maintain correct visibility while resizing
    window.addEventListener('resize', function () {
        if (!isMobile()) {
            mainNav.style.display = 'block'
        } else {
            mainNav.style.display = 'none'
        }
    });

    function isMobile() {
        return !(mobileMenu.offsetParent === null);
    }
});

