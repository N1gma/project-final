window.onload = function () {
    if (window.innerWidth > 1080) {
        desktop();
    }
    if (window.innerWidth <= 1080 && window.innerWidth >= 480) {
        tablet();
    }
    if (window.innerWidth < 480) {
        mobile();
    }
    switchTumb('tumb-nav');
    localDataAdd();
    setUpBag();

    //selection 
    document.getElementsByClassName('details-selection')[0].addEventListener('click', function (e) {
        if (e.target.nodeName.toUpperCase() == 'BUTTON' && !e.target.classList.contains('add-to-bag')) {
            var clearClass = e.target.parentNode.children;
            for (var i = 0; i < clearClass.length; i++) {
                if (clearClass[i].classList.contains('selected-detail')) {
                    clearClass[i].classList.remove('selected-detail');
                }
            }
            e.target.classList.add('selected-detail');
        }
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
    //tablet menu show
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

window.onresize = function () {

    if (window.innerWidth > 1080) {
        desktop();
    }
    if (window.innerWidth <= 1080 && window.innerWidth >= 480) {
        tablet();
    }
    if (window.innerWidth < 480) {
        mobile();
    }
};


function desktop() {
    var srcArray = ["img/new_arrivals/left-banner.png", "img/new_arrivals/right-banner.png",
        "img/promo/full.png", "img/promo/thumb_0.png", "img/promo/thumb_1.png", "img/promo/thumb_2.png"];

    document.getElementsByClassName('main-logo')[0].innerHTML = "Template";
    document.getElementById('side-c1').setAttribute('src', srcArray[0]);
    document.getElementById('side-c2').setAttribute('src', srcArray[1]);
    document.getElementsByClassName('main-tumb')[0].firstElementChild.setAttribute('src', srcArray[2]);
    document.getElementsByClassName('tumb-nav')[0].children[0].firstElementChild.setAttribute('src', srcArray[3]);
    document.getElementsByClassName('tumb-nav')[0].children[1].firstElementChild.setAttribute('src', srcArray[4]);
    document.getElementsByClassName('tumb-nav')[0].children[2].firstElementChild.setAttribute('src', srcArray[5]);
}

function tablet() {
    var srcArray = ["img/new_arrivals/tablet/left.png", "img/new_arrivals/tablet/right.png",
        "img/promo/full.png", "img/promo/thumb_0.png", "img/promo/thumb_1.png", "img/promo/thumb_2.png"];

    document.getElementsByClassName('main-logo')[0].innerHTML = "Template";
    document.getElementById('side-c1').setAttribute('src', srcArray[0]);
    document.getElementById('side-c2').setAttribute('src', srcArray[1]);
    document.getElementsByClassName('main-tumb')[0].firstElementChild.setAttribute('src', srcArray[2]);
    document.getElementsByClassName('tumb-nav')[0].children[0].firstElementChild.setAttribute('src', srcArray[3]);
    document.getElementsByClassName('tumb-nav')[0].children[1].firstElementChild.setAttribute('src', srcArray[4]);
    document.getElementsByClassName('tumb-nav')[0].children[2].firstElementChild.setAttribute('src', srcArray[5]);
}

function mobile() {
    var srcArray = ["img/new_arrivals/mobile/banner.png",
        "img/promo/mobile/full.png", "img/promo/mobile/thumb_0.png", "img/promo/mobile/thumb_1.png", "img/promo/mobile/thumb_2.png"];

    document.getElementsByClassName('main-logo')[0].innerHTML = "TL";
    document.getElementById('side-c1').setAttribute('src', srcArray[0]);
    document.getElementsByClassName('main-tumb')[0].firstElementChild.setAttribute('src', srcArray[1]);
    document.getElementsByClassName('tumb-nav')[0].children[0].firstElementChild.setAttribute('src', srcArray[2]);
    document.getElementsByClassName('tumb-nav')[0].children[1].firstElementChild.setAttribute('src', srcArray[3]);
    document.getElementsByClassName('tumb-nav')[0].children[2].firstElementChild.setAttribute('src', srcArray[4]);
}

//dynamic images click
function switchTumb(source) {
    var promoSrcArray = [
        ["img/promo/thumb_0.png", "img/promo/thumb_0_1.png"],
        ["img/promo/thumb_1.png", "img/promo/thumb_1_1.png"],
        ["img/promo/thumb_2.png", "img/promo/thumb_2_1.png"],
        ["img/promo/mobile/thumb_0.png", "img/promo/mobile/thumb_0_1.png"],
        ["img/promo/mobile/thumb_1.png", "img/promo/mobile/thumb_1_1.png"],
        ["img/promo/mobile/thumb_2.png", "img/promo/mobile/thumb_2_1.png"]
    ];

    document.getElementsByClassName(source)[0].addEventListener('click', function (e) {
        e.preventDefault();
        for (var i = 0; i < e.currentTarget.children.length; i++) {
            var target = e.currentTarget.children[i].firstElementChild;
            if (target.classList.contains('active-tumb')) {
                var targetSrc = target.getAttribute('src');
                for (var k = 0; k < promoSrcArray.length; k++) {
                    for (j = 0; j < promoSrcArray[k].length; j++) {
                        if (promoSrcArray[k][j] == targetSrc) {
                            target.setAttribute('src', promoSrcArray[k][j - 1]);
                            target.classList.remove('active-tumb');
                        }
                    }
                }
            }
        }
        target = e.target.getAttribute('src');
        for (i = 0; i < promoSrcArray.length; i++) {
            for (var j = 0; j < promoSrcArray[i].length; j++) {
                if (promoSrcArray[i][j] == target && promoSrcArray[i][j + 1]) {
                    document.getElementsByClassName('main-tumb')[0].firstElementChild.setAttribute('src', e.target.getAttribute('src'));
                    e.target.setAttribute('src', promoSrcArray[i][j + 1]);
                    e.target.classList.add('active-tumb');
                }
            }
        }
    });

}

//local storage data set
function localDataAdd() {
    document.getElementsByClassName('add-to-bag')[0].addEventListener('click', function () {
        var arr;
        if (window.localStorage.getItem('shop')) {
            arr = JSON.parse(window.localStorage.getItem('shop'));
        } else {
            arr = [];
            console.log(arr);
        }
        if (conditionsCheck(arr)) {
            arr.push({
                name: document.getElementsByClassName('details-selection')[0].firstElementChild.innerHTML,
                price: parseFloat(document.getElementsByClassName('details-selection')[0].children[1].innerHTML.replace(/[^0-9.]/g, "")),
                size: [document.getElementsByClassName('selected-detail')[0].innerHTML],
                color: [document.getElementsByClassName('selected-detail')[1].innerHTML],
                quantity: 1
            });
        }
        window.localStorage.setItem('shop', JSON.stringify(arr));
        setUpBag();
    })
}

function conditionsCheck(arr) {
    try {
        var size = document.getElementsByClassName('selected-detail')[0].innerHTML;
        var color = document.getElementsByClassName('selected-detail')[1].innerHTML;
    } catch (err) {
        showMessage('Smth misssing!');
        return false;
    }
    /*for (var i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].size == size && arr[i].color == color) {
            arr[i].quantity++;
            return false;
        }
    }*/
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].size.indexOf(size) ==-1 && arr[i].color.indexOf(color) !=-1 ) {
            arr[i].size.push(size);
            showMessage('Added to bag!');
            return false;
        }
        if (arr[i] &&  arr[i].color.indexOf(color) ==-1 && arr[i].size.indexOf(size) !=-1 ) {
            arr[i].color.push(color);
            showMessage('Added to bag!');
            return false;
        }
        if (arr[i] &&  arr[i].color.indexOf(color) !=-1 && arr[i].size.indexOf(size) !=-1 ) {
            arr[i].quantity++;
            showMessage('Added to bag!');
            return false;
        }
        /*if (arr[i] && arr[i].size.indexOf(size) !=-1 && arr[i].color.indexOf(color) !=-1) {
            arr[i].quantity++;
            showMessage('Added to bag!');
            return false;
        }*/
    }
    showMessage('Added to bag!');
    return true;
}

function showMessage(message) {
    document.getElementsByClassName('add-to-bag')[0].innerHTML = message;
    setTimeout(function () {
        document.getElementsByClassName('add-to-bag')[0].innerHTML = 'Add to bag';
    }, 1000)
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