window.onload = function () {
    document.getElementById('first').onclick = function (e) {
        var currentAttribute = e.target.getAttribute('src');
        var modifier = currentAttribute.charAt(currentAttribute.length -1);
        currentAttribute.charAt(currentAttribute.length - 1) = +modifier -1;
        e.target.setAttribute("src", currentAttribute);
    };

    function promoChange(index) {
        var currentAttribute = document.getElementById('promoBody').getAttribute('src');
        currentAttribute.slice(currentAttribute.length-1, currentAttribute.length);
        document.getElementById('promoBody').setAttribute("src", currentAttribute + index );
  }  
};