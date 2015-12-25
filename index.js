var main = document.querySelector('#main');
var oLis = main.querySelectorAll('li');
var winH = document.documentElement.clientHeight;
var degW = 640;
var degH = 960;
main.style.webkitTransform = 'scale(' + winH / degH + ')';
[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];
    arguments[0].addEventListener('touchstart', start);
    arguments[0].addEventListener('touchmove', move);
    arguments[0].addEventListener('touchend', end);
});
function start(e) {
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    var changeY = e.changedTouches[0].pageY - this.startY;
    var cur = this.index;
    this.flag=true;

    [].forEach.call(oLis, function () {
        if (arguments[1] !== cur) {
            arguments[0].style.display = 'none';
        }
        arguments[0].className='';
        arguments[0].firstElementChild.id='';
    });

    if (changeY > 0) {//向下
        this.preSIndex = cur == 0 ? oLis.length - 1 : cur - 1;
        var pos = -winH + changeY;

    } else if (changeY < 0) {//向上
        this.preSIndex = cur == oLis.length - 1 ? 0 : cur + 1;
        var pos = winH + changeY;
    }
    oLis[this.preSIndex].style.webkitTransform = 'translate(0,' + pos + 'px)';
    oLis[this.preSIndex].style.display='block';
    oLis[this.preSIndex].className='zIndex';
}
function end(e) {
    if(this.flag){
        oLis[this.preSIndex].style.webkitTransform="translate(0,0)";
        oLis[this.preSIndex].style.webkitTransition='0.5s';
        oLis[this.preSIndex].addEventListener('webkitTransitionEnd', function () {
            this.style.webkitTransition='';
            this.firstElementChild.id='a'+this.index;
        })
    }
}
document.documentElement.addEventListener('touchmove', function () {
    
});