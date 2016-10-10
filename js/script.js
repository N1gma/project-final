window.onload = function () {
    //init
    if (window.innerWidth <= 1180 && window.innerWidth >= 480) {
        tablet();
    }
    if (window.innerWidth < 480) {
        mobile();
    }
    setUpBag();
    var currentMargin = 0;
    sliderNavActiveSwitch(currentMargin);
    var timer = setInterval(moveRegular, 5000);
    document.getElementsByClassName('promo-navigation')[0].style.marginLeft = -(document.getElementsByClassName('promo-navigation')[0].offsetWidth / 2) + 'px';
    dynamicImgHoverInit('promo-2-container-1');
    dynamicImgHoverInit('side-promo-banner');

    // hover catalog
    document.getElementsByClassName('new-arrivals-content')[0].addEventListener('mouseover', function (e) {
        if (e.target.nodeName.toUpperCase() == 'IMG' && e.target.getAttribute('src') != 'img/new_arrivals/hover.png') {
            var target = e.target;
            var appender = target.cloneNode(true);
            appender.setAttribute('src', 'img/new_arrivals/hover.png');
            target.parentNode.style.position = 'relative';
            appender.classList.add('hover');
            target.parentNode.insertBefore(appender, target);
        }
    });
    document.getElementsByClassName('new-arrivals')[0].addEventListener('mouseout', function (e) {
        if (e.target.nodeName.toUpperCase() == 'IMG' && e.target.getAttribute('src') == 'img/new_arrivals/hover.png') {
            var target = e.target.parentNode;
            target.removeChild(target.children[0]);
            target.parentNode.style.position = 'static';
        }
    });

    //promo-slider
    function moveRegular() {
        if (currentMargin != '200') {
            currentMargin += 100;
        } else {
            currentMargin = 0;
        }
        sliderNavActiveSwitch(currentMargin);
    }

    document.getElementsByClassName('promo-navigation')[0].addEventListener('click', function (e) {
        clearInterval(timer);
        currentMargin = +e.target.getAttribute('id');
        sliderNavActiveSwitch(currentMargin);
        timer = setInterval(moveRegular, 5000);
    });


    //search
    document.getElementById('search-ico').addEventListener('click', function () {
        var width = window.innerWidth;
        if (width <= 1080 && width >= 480) {
            document.getElementById('search-ico').style.display = 'none';
            document.getElementsByClassName('form-search')[0].style.width = '10%';
            document.getElementById('search-input').style.width = '100%';
            document.getElementById('search-input').focus();
        }
    });

    document.getElementById('search-input').addEventListener('blur', function () {
        var width = window.innerWidth;
        if (width <= 1080 && width >= 480) {
            document.getElementsByClassName('form-search')[0].style.width = '2%';
            document.getElementById('search-input').style.width = '0';
            setTimeout(function () {
                document.getElementById('search-ico').style.display = 'inline-block';
            }, 1000);
        }
    });

    //tablet menu
    document.getElementsByClassName('tablet-menu')[0].addEventListener('click', function () {
        if (document.getElementsByClassName('menu')[0].classList.contains('menu-visible')) {
            document.getElementsByClassName('menu')[0].classList.remove('menu-visible');
            document.getElementById('switch').setAttribute('src', 'img/promo/mobile/menu.png');
            document.getElementsByClassName('tablet-menu')[0].classList.add('button-element');
        } else {
            document.getElementsByClassName('menu')[0].classList.add('menu-visible');
            document.getElementById('switch').setAttribute('src', 'img/promo/mobile/ico_close.png');
            document.getElementsByClassName('tablet-menu')[0].classList.remove('button-element');
        }
    })
};
//slider navbar
function sliderNavActiveSwitch(position) {
    var active = document.getElementsByClassName('active')[0];
    active.setAttribute('src', 'img/icons/promo_link_nonactive.png');
    active.classList.remove('active');
    document.getElementById("promoMain").style.marginLeft = -position + "%";
    document.getElementById(position).setAttribute('src', 'img/icons/promo_link_active.png');
    document.getElementById(position).classList.add('active');
}

//dynamic images hover
function dynamicImgHoverInit(source) {
    var promoSrcArray = [
        ["img/promo/promo-img-2-compose/_2-1.png", "img/promo/promo-img-2-compose/_2-2.png"],
        ["img/promo/promo-img-2-compose/_5-1.png", "img/promo/promo-img-2-compose/_5-2.png"],
        ["img/promo/promo-img-2-compose/_6-1.png", "img/promo/promo-img-2-compose/_6-2.png"],
        ['img/promo/tablet/banner_right_1.png', 'img/promo/tablet/banner_right_2.png'],
        ['img/promo/mobile/banner_1.png', 'img/promo/mobile/banner_2.png']
    ];

    document.getElementsByClassName(source)[0].addEventListener('mouseover', function (e) {
        var target = e.target.getAttribute('src');

        for (var i = 0; i < promoSrcArray.length; i++) {
            for (var j = 0; j < promoSrcArray[i].length; j++) {
                if (promoSrcArray[i][j] == target && promoSrcArray[i][j + 1]) {
                    e.target.setAttribute('src', promoSrcArray[i][j + 1]);
                }
            }
        }

    });
    document.getElementsByClassName(source)[0].addEventListener('mouseout', function (e) {
        var target = e.target.getAttribute('src');
        for (var i = 0; i < promoSrcArray.length; i++) {
            for (var j = 0; j < promoSrcArray[i].length; j++) {
                if (promoSrcArray[i][j] == target && promoSrcArray[i][j - 1]) {
                    e.target.setAttribute('src', promoSrcArray[i][j - 1]);
                }
            }
        }
    });
}
//src control
window.onresize = function () {
    document.getElementsByClassName('promo-navigation')[0].style.marginLeft = -(document.getElementsByClassName('promo-navigation')[0].offsetWidth / 2) + 'px';
    if (window.innerWidth > 1180) {
        desktop();
    }
    if (window.innerWidth <= 1180 && window.innerWidth >= 480) {
        tablet();
    }
    if (window.innerWidth < 480) {
        mobile();
    }
};


function desktop() {
    var srcArray = ['img/promo/promo_img_1.jpg', 'img/promo/promo_img_3.jpg',
        'img/promo/banner_left.jpg', "img/promo/banner_right.jpg",
        "img/new_arrivals/right-banner.png"];

    document.getElementsByClassName('main-logo')[0].innerHTML = "Template";
    document.getElementsByClassName('promo-1')[0].setAttribute('src', srcArray[0]);
    document.getElementsByClassName('promo-3')[0].setAttribute('src', srcArray[1]);
    document.getElementById('side-1').setAttribute('src', srcArray[2]);
    document.getElementById('side-2').setAttribute('src', srcArray[3]);
}

function tablet() {
    var srcArray = ['img/promo/tablet/_1.png', 'img/promo/tablet/_2.png', 'img/promo/tablet/_3.png',
        'img/promo/tablet/banner_left.png', "img/promo/tablet/banner_right_1.png",
        "img/new_arrivals/tablet/right.png"];

    document.getElementsByClassName('main-logo')[0].innerHTML = "Template";
    document.getElementsByClassName('promo-1')[0].setAttribute('src', srcArray[0]);
    document.getElementsByClassName('promo-2-tablet')[0].setAttribute('src', srcArray[1]);
    document.getElementsByClassName('promo-3')[0].setAttribute('src', srcArray[2]);
    document.getElementById('side-1').setAttribute('src', srcArray[3]);
    document.getElementById('side-2').setAttribute('src', srcArray[4]);
}

function mobile() {
    var srcArray = ['img/promo/mobile/_1.png', 'img/promo/mobile/_2.png', 'img/promo/mobile/_3.png',
        'img/promo/mobile/banner_1.png'];

    document.getElementsByClassName('main-logo')[0].innerHTML = "TL";
    document.getElementsByClassName('promo-1')[0].setAttribute('src', srcArray[0]);
    document.getElementsByClassName('promo-2-tablet')[0].setAttribute('src', srcArray[1]);
    document.getElementsByClassName('promo-3')[0].setAttribute('src', srcArray[2]);
    document.getElementById('side-1').setAttribute('src', srcArray[3]);
}

function setUpBag() {
    try {
        var arr = JSON.parse(window.localStorage.getItem('shop'));
        var value = 0;
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            value += arr[i].price * arr[i].quantity;
            count += arr[i].quantity;
        }
        document.getElementById('bagValue').innerHTML = 'Bag £' + value + '(' + count + ')';
    } catch (e) {
        document.getElementById('bagValue').innerHTML = 'Bag';
    }
}