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
    setUpBag();
    setUpBottomBag();
    setUpContent();
    setUpRemove();
    setUpClearAll();

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
    var srcArray = ['img/bag/photo.png'];
    document.getElementsByClassName('main-logo')[0].innerHTML = "Template";
    document.getElementById('cloneNode').firstElementChild.firstElementChild.setAttribute('src', srcArray[0]);

}

function tablet() {
    var srcArray = ['img/bag/photo_1.png'];
    document.getElementsByClassName('main-logo')[0].innerHTML = "Template";
    document.getElementById('cloneNode').firstElementChild.firstElementChild.setAttribute('src', srcArray[0]);
}

function mobile() {
    var srcArray = ['img/bag/photo_2.png'];
    document.getElementsByClassName('main-logo')[0].innerHTML = "TL";
    document.getElementById('cloneNode').firstElementChild.firstElementChild.setAttribute('src', srcArray[0]);
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
function setUpBottomBag() {
    try {
        var arr = JSON.parse(window.localStorage.getItem('shop'));
        var value = 0;
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            value += arr[i].price * arr[i].quantity;
            count += arr[i].quantity;
        }
        document.getElementsByClassName('second-bag')[0].innerHTML = 'Total Cost<br><b>£' + value + '</b>';
    } catch (e) {
        document.getElementsByClassName('second-bag')[0].innerHTML = 'Bag is empty';
    }

}

function setUpContent() {
    clearContent();
    try {
        var arr = JSON.parse(window.localStorage.getItem('shop'));
        for (var i = 0; i < arr.length; i++) {
            var displacement = document.getElementById('cloneNode').cloneNode(true);
            displacement.children[1].firstChild.innerHTML = arr[i].name;
            displacement.children[1].children[1].innerHTML = 'Color: ' + arr[i].color;
            displacement.children[1].children[2].innerHTML = 'Size: ' + arr[i].size;
            displacement.children[1].children[3].innerHTML = 'Quantity: ' + arr[i].quantity;
            displacement.firstElementChild.lastElementChild.innerHTML = '£' + arr[i].price;
            displacement.style.display = 'inline-flex';
            displacement.id = "";
            displacement.indexLink = i;
            document.getElementsByClassName('new-arrivals')[0].appendChild(displacement);
        }
    } catch (e) {
        var message = document.createElement('div');
        message.innerHTML = 'Your bag is empty!';
        message.classList.add('thx-message');
        document.getElementsByClassName('new-arrivals')[0].appendChild(message);
    }
}

function clearContent() {
    var cloneNode = document.getElementById('cloneNode').cloneNode(true);
    while (document.getElementsByClassName('new-arrivals')[0].firstChild) {
        document.getElementsByClassName('new-arrivals')[0].removeChild(document.getElementsByClassName('new-arrivals')[0].firstChild);
    }
    document.getElementsByClassName('new-arrivals')[0].appendChild(cloneNode);
}

function setUpRemove() {
    for (var i = 0; i < document.getElementsByClassName('side-info').length; i++) {
        document.getElementsByClassName('side-info')[i].lastElementChild.addEventListener('click', function (e) {
            var arr = JSON.parse(window.localStorage.getItem('shop'));
            var getIndex = e.currentTarget.parentNode.parentNode.indexLink;
            console.log(e.currentTarget.parentNode.parentNode);
            if (arr[getIndex].quantity > 1) {
                arr[getIndex].quantity = arr[getIndex].quantity - 1;
                window.localStorage.setItem('shop', JSON.stringify(arr));
                clearContent();
                setUpBag();
                setUpBottomBag();
                setUpContent();
            } else {
                arr.splice(getIndex, 1);
                if (arr.length == 0) {
                    window.localStorage.removeItem('shop');
                } else {
                    window.localStorage.setItem('shop', JSON.stringify(arr));
                }
                clearContent();
                setUpBag();
                setUpBottomBag();
                setUpContent();
            }
            setUpRemove();
        })
    }
}
function setUpClearAll() {
    document.getElementsByClassName('clear-bag')[0].addEventListener('click', function () {
        window.localStorage.removeItem('shop');
        setUpContent();
        setUpBag();
        setUpBottomBag();
    });
    document.getElementsByClassName('big-button')[0].addEventListener('click', function () {
        var message = document.createElement('div');
        if (JSON.parse(window.localStorage.getItem('shop'))) {
            message.innerHTML = 'Thanks for your purchase!';
        } else {
            message.innerHTML = 'Your bag is empty!';
        }
        window.localStorage.removeItem('shop');
        clearContent();
        setUpBag();
        setUpBottomBag();
        message.classList.add('thx-message');
        document.getElementsByClassName('new-arrivals')[0].appendChild(message);
    })
}



