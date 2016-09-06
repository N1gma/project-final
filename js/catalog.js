window.onload = function () {
    if (window.innerWidth <= 1080 && window.innerWidth >= 480) {
        switchOrder('new-arrivals', 4, 5, '5', '4');
        tablet();
    }
    if (window.innerWidth > 1080) {
        switchOrder('new-arrivals', 4, 5, '4', '5');
        desktop();
    }
    if (window.innerWidth < 480) {
        switchOrder('new-arrivals', 3, 5, '5', '3');
        mobile();
    }
    setUpBag();
    //filters
    filtersInit();
    // hover catalog
    document.getElementsByClassName('new-arrivals')[0].addEventListener('mouseover', function (e) {
        if (e.target.nodeName.toUpperCase() == 'IMG' && e.target.getAttribute('src') != 'img/new_arrivals/hover.png') {
            var target = e.target.parentNode;
            var appender = target.cloneNode(true);
            appender.children[0].setAttribute('src', 'img/new_arrivals/hover.png');
            target.parentNode.style.position = 'relative';
            appender.children[0].classList.add('hover');
            target.parentNode.insertBefore(appender, target);
        }
    });
    document.getElementsByClassName('new-arrivals')[0].addEventListener('mouseout', function (e) {
        if (e.target.nodeName.toUpperCase() == 'IMG' && e.target.getAttribute('src') == 'img/new_arrivals/hover.png') {
            var target = e.target.parentNode.parentNode;
            target.removeChild(target.children[0]);
            target.parentNode.style.position = 'static';
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
    if (window.innerWidth <= 1180 && window.innerWidth >= 480) {
        switchOrder('new-arrivals', 4, 5, '5', '4');
        tablet();
    }
    if (window.innerWidth > 1180) {
        switchOrder('new-arrivals', 4, 5, '4', '5');
        desktop();
    }
    if (window.innerWidth < 480) {
        switchOrder('new-arrivals', 3, 5, '5', '3');
        mobile();
    }
};

//order replace
function switchOrder(elClass, el1, el2, pos1, pos2) {
    var orderArr = document.getElementsByClassName(elClass)[0].children;
    for (var i = 0; i < orderArr.length; i++) {
        orderArr[i].style.order = i + 1;
    }
    orderArr[el1 - 1].style.order = pos1;
    orderArr[el2 - 1].style.order = pos2;

}

function desktop() {
    var srcArray = ["img/new_arrivals/left-banner.png", "img/new_arrivals/right-banner.png"];

    document.getElementsByClassName('main-logo')[0].innerHTML = "Template";
    document.getElementById('side-c1').setAttribute('src', srcArray[0]);
    document.getElementById('side-c2').setAttribute('src', srcArray[1]);
}

function tablet() {
    var srcArray = ["img/new_arrivals/tablet/left.png", "img/new_arrivals/tablet/right.png"];

    document.getElementById('side-c1').setAttribute('src', srcArray[0]);
    document.getElementById('side-c2').setAttribute('src', srcArray[1]);
}

function mobile() {
    var srcArray = ["img/new_arrivals/mobile/banner.png"];

    document.getElementsByClassName('main-logo')[0].innerHTML = "TL";
    document.getElementById('side-c1').setAttribute('src', srcArray[0]);
}

//filters
function filtersInit() {
    document.getElementById('closeFilter').addEventListener('click', closeFilter);
    document.getElementsByClassName('filters')[0].addEventListener('click', function (e) {
        if (e.target.nodeName.toUpperCase() != 'LI' && e.target.id != 'closeFilter' && e.target.firstChild.id != 'closeFilter') {
            showFilter();
        }
        if (window.innerWidth <= 1080 && e.target.nodeName.toUpperCase() == 'LI' && !e.target.classList.contains('selector') && e.target.parentNode.id != ('head-info')) {
            var filterList = e.target.parentNode.children;
            removeNonselectedType(e.target.parentNode.children);
            clearFilterSelection(e.target.parentNode);
            e.target.classList.add('selected');
            document.getElementById('head-info').children[getTargetInparentIndex(e.target)].innerHTML = e.target.innerHTML;
            shiftLeft(e.target, filterList);
        }
    });
    for (var i = 0; i < document.getElementsByClassName('filters-list').length; i++) {
        document.getElementsByClassName('filters-list')[i].addEventListener('touchstart', function (e) {
            document.getElementsByClassName('filters-list')[getCurrentTargetInparentIndex(e.currentTarget)].initial = e.changedTouches[e.changedTouches.length - 1].pageX;
        });
        document.getElementsByClassName('filters-list')[i].addEventListener('touchmove', function (e) {
            document.getElementsByClassName('filters-list')[getCurrentTargetInparentIndex(e.currentTarget)].final = e.changedTouches[e.changedTouches.length - 1].pageX;
            var difference = document.getElementsByClassName('filters-list')[getCurrentTargetInparentIndex(e.currentTarget)].final - document.getElementsByClassName('filters-list')[getCurrentTargetInparentIndex(e.currentTarget)].initial;
            document.getElementsByClassName('filters-list')[getCurrentTargetInparentIndex(e.currentTarget)].style.marginLeft = parseFloat(getComputedStyle(document.getElementsByClassName('filters-list')[getCurrentTargetInparentIndex(e.currentTarget)]).marginLeft) + difference + 'px';

        });
        document.getElementsByClassName('filters-list')[i].addEventListener('touchend', function (e) {
            var currentList = document.getElementsByClassName('filters-list')[getTargetInparentIndex(e.target)];
            removeNonselectedType(currentList.children);
            setTimeout(function () {
                clearFilterSelection(currentList);
                if(offsetMerge(currentList)){
                    offsetMerge(currentList).classList.add('selected');
                }
            }, 1500);
        });
    }
}
function removeNonselectedType(filterList) {
    for (i = 0; i < filterList.length; i++) {
        if (filterList[i].classList.contains('selector')) {
            filterList[i].style.display = 'none';
        }
    }
}

function clearFilterSelection(currentList) {
    for (var i = 0; i < document.getElementsByClassName('selected').length; i++) {
        if (document.getElementsByClassName('selected')[i].parentNode == currentList) {
            document.getElementsByClassName('selected')[i].classList.remove('selected');
        }
    }
}

function offsetMerge(currentList) {
    var min;
    for (var i = 0; i < currentList.children.length, !min; i++) {
        if (currentList.children[i].offsetLeft > 0) {
            min = currentList.children[i];
        }
    }
    for (i = 0; i < currentList.children.length, !min; i++) {
        if (currentList.children[i].offsetLeft > 0 && !currentList.children[i].classList.contains('selector') && currentList.children[i].offsetLeft < min.offsetLeft) {
            min = currentList.children[i];
        }
    }
    return min;
}

function shiftLeft(target, array) {
    var shiftRowValue = 0;
    for (var i = 0; array[i] != target; i++) {
        shiftRowValue += array[i].offsetWidth;
    }
    shiftRowValue += parseFloat(getComputedStyle(target.parentNode.parentNode.parentNode).paddingLeft);
    target.parentNode.style.marginLeft = -shiftRowValue + 'px';

}
//not used
function getListActualWidth(target,list) {
    var actualWidth = 0;
    for (var i = 0; i<list.length; i++) {
        actualWidth += list[i].offsetWidth;
    }
    actualWidth += parseFloat(getComputedStyle(target.parentNode.parentNode.parentNode).paddingLeft);
    return actualWidth;
}

function showFilter() {
    if (window.innerWidth <= 1080) {
        document.getElementsByClassName('filters')[0].classList.add('rotated');
        document.getElementsByClassName('desk-filter-head')[0].style.display = 'flex';
        document.getElementsByClassName('about-filter')[0].style.display = 'block';
        for (var i = 0; i < document.getElementsByClassName('filters-list').length; i++) {
            document.getElementsByClassName('filters-list')[i].style.display = 'flex';
            if (document.getElementsByClassName('filters-list')[i].parentNode.firstElementChild.bufferClone) {
                var parent = document.getElementsByClassName('filters-list')[i].parentNode.firstElementChild;
                parent.innerHTML = parent.bufferClone;
                parent.classList.remove('front-selector');
            }
        }
        for (i = 0; i < document.getElementsByClassName('filters-block').length; i++) {
            if (document.getElementsByClassName('filters-block')[i].firstElementChild.firstElementChild) {
                document.getElementsByClassName('filters-block')[i].firstElementChild.firstElementChild.style.visibility = 'hidden';
            }
        }
    }
}
function closeFilter(e) {
    if (window.innerWidth <= 1080) {
        e.preventDefault();
        document.getElementsByClassName('filters')[0].classList.remove('rotated');
        document.getElementsByClassName('desk-filter-head')[0].style.display = 'none';
        document.getElementsByClassName('about-filter')[0].style.display = 'none';
        for (var i = 0; i < document.getElementsByClassName('filters-list').length; i++) {
            document.getElementsByClassName('filters-list')[i].style.display = 'none';
            for (var j = 0; j < document.getElementsByClassName('filters-list')[i].children.length; j++) {
                if (document.getElementsByClassName('filters-list')[i].children[j].classList.contains('selected')) {
                    var clone = document.getElementsByClassName('filters-list')[i].children[j].innerHTML;
                    var parent = document.getElementsByClassName('filters-list')[i].parentNode.firstElementChild;
                    parent.bufferClone = parent.innerHTML;
                    parent.innerHTML = clone;
                    parent.classList.add('front-selector');
                }
            }
        }
        for (i = 0; i < document.getElementsByClassName('filters-block').length; i++) {
            if (document.getElementsByClassName('filters-block')[i].firstElementChild.firstElementChild) {
                document.getElementsByClassName('filters-block')[i].firstElementChild.firstElementChild.style.visibility = 'visible';
            }
        }

    }
}

function getTargetInparentIndex(target) {
    var target2 = document.getElementsByClassName('filters-block');
    for (var i = 0; i < target2.length; i++) {
        if (target2[i] == target.parentNode.parentNode) {
            return i;
        }
    }
}

function getCurrentTargetInparentIndex(target) {
    for (var k = 0; k < target.parentNode.parentNode.children.length; k++) {
        if (target.parentNode.parentNode.children[k].lastElementChild == target) {
            return k - 2;
        }
    }
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