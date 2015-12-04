/**
 * Created by Administrator on 2015/11/16.
 */
var DOM = {};
//方法1：获取当前选中索引：假定当前索引index=0，然后循环找他的哥哥元素节点，找到一个就索引index++；最后索引就为index
DOM.getIndex = function (ele) {
    var index = 0;
    var p = ele.previousSibling;
    while (p) {
        if (p.nodeType === 1) {
            index++;
        }
        p= p.previousSibling;
    }
    return index;
};
//方法2：从firstChile来开始查找，当找到当前元素就停止，没有查找到就一直查找
DOM.getIndex2 = function (ele) {
    var index = 0;
    var node = ele.parentNode.firstChild;
    while (true) {
        if (node === ele) {
            break;
        }
        if (node.nodeType === 1) {
            index++;
        }
        node = node.nextSibling;
    }
    return index;
};
//将类数组转化为数组 ，处理兼容性问题
DOM.listToArray=function (listAry){
    try{
        return Array.prototype.slice.call(listAry,0);
    }catch (e){
        var ary=[];
        for (var i=0; i<listAry.length; i++){
            ary.push(listAry[i]);
        }
        return ary;
    }
};
//元素的偏移量 IE8不算边框，标准浏览器要把边框算进去
DOM.offset = function (ele) {
    var left = ele.offsetLeft;
    var top = ele.offsetTop;
    var p = ele.offsetParent;
    while (p) {
        if (window.navigator.userAgent.indexOf("MSIE 8.0") > -1) {
            left += ele.offsetLeft;
            top += ele.offsetTop;
        } else {//标准浏览器需要把边框加进去
            left = ele.offsetLeft + clinetLeft;
            top = ele.offsetTop + clinetTop;
        }
    }
    return {left: left, top: top};
};
//把一个元素添加为这个元素第一个子节点  //把child添加成ele的第一个元素
DOM.prepend=function(ele,child){
    ele.insertBefore(child,ele.firstChild);
};
DOM.insertAfter=function(ele,child){
    ele.insertBefore()
};
//获取当前元素的所有哥哥和弟弟元素节点
DOM.siblings = function (ele) {
    var ary = [];
    var p = ele.previousSibling;
    while (p && p.nodeType === 1) {
        ary.unshift(p);
        p = p.previousSibling;
    }
    var n = ele.nextSibling;
    while (n && n.nodeType === 1) {
        ary.push(n);
        n= n.nextSibling;
    }
    return ary;
};
//获取下一个弟弟元素节点
DOM.next=function(ele){
    if(typeof ele.nextElementSibling == "object"){
        return ele.nextElementSibling;
    }else{
        var next=ele.nextSibling;
        while(next){
            if(next.nodeType===1){
                return next;
            }
            next=next.nextSibling;
        }
        return null;//这方法本来应该有返回值，但是找不到，则主动的返回一个null。如果不写这句，则这个方法运行的结果是undefined，违反原则
    }
};
//获取下一个哥哥元素节点
DOM.prev = function (ele) {
    if (typeof ele.previousElementSibling == "object") {
        return ele.previousElementSibling;
    }
    var prev = ele.previousSibling;
    while (prev && prev.nodeType === 1) {
        prev = prev.previousSibling;
    }
    return prev;

};
//获取指定标签名curEle的所有子元素(div /li /span...)
DOM.children = function (curEle, tabName) {
    var nodeList = curEle.childNodes, ary = [];
    for (var i = 0; i < nodeList.length; i++) {
        var curNode = nodeList[i];
        if (curNode.nodeType == 1) {
            if (typeof curNode == "string") {
                var curNodeU = tabName.toUpperCase();
                var tabNameU = curNode.nodeName;
                if (curNodeU = tabNameU) {
                    ary[ary.length] = curNode;
                }
                continue;
            }
            ary[ary.length] = curNode;
        }
    }
};

//通过类名获得元素
/*_utils.getElementsByClass = function getElementsByClass(strClass, context) {
    //this->_utils
    context = context || document;
    if ("getElementsByClassName" in document) {
        return this.listToArray(context.getElementsByClassName(strClass));
    }
    var strAry = strClass.replace(/(^ +)|( +$)/g, "").split(/\s+/), tagList = context.getElementsByTagName("*"), ary = [];
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i];
        curTag.flag = true;
        for (var k = 0; k < strAry.length; k++) {
            var reg = new RegExp("(^| +)" + strAry[k] + "( +|$)");
            if (!reg.test(curTag.className)) {
                curTag.flag = false;
                break;
            }
        }
        curTag.flag ? ary[ary.length] = curTag : null;
    }
    return ary;
};*/
//检测元素是否有这个类
DOM.hasClass = function (curEle, strClass) {
    var reg = new RegExp("(^| +) + strClass + ( +|&)");
    return reg.test(curEle.className);
};
//给指定元素增加一个类
DOM.addClass = function (curEle, strClass) {
    if (!hasClass(curEle, strClass)) {
        curEle.className += " " + strClass;
    }
};
//给指定元素删除一个类
DOM.removeClass = function (curEle, strClass) {
    var reg = new RegExp("(^| +)" + strClass + "( +|$)", "g");
    if (hasClass(curEle, strClass)) {
        curEle.className = curEle.className.replace(reg, " ");
    }
};
