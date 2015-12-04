/**
 * Created by Administrator on 2015/11/16.
 */
var DOM = {};
//����1����ȡ��ǰѡ���������ٶ���ǰ����index=0��Ȼ��ѭ�������ĸ��Ԫ�ؽڵ㣬�ҵ�һ��������index++�����������Ϊindex
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
//����2����firstChile����ʼ���ң����ҵ���ǰԪ�ؾ�ֹͣ��û�в��ҵ���һֱ����
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
//��������ת��Ϊ���� ���������������
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
//Ԫ�ص�ƫ���� IE8����߿򣬱�׼�����Ҫ�ѱ߿����ȥ
DOM.offset = function (ele) {
    var left = ele.offsetLeft;
    var top = ele.offsetTop;
    var p = ele.offsetParent;
    while (p) {
        if (window.navigator.userAgent.indexOf("MSIE 8.0") > -1) {
            left += ele.offsetLeft;
            top += ele.offsetTop;
        } else {//��׼�������Ҫ�ѱ߿�ӽ�ȥ
            left = ele.offsetLeft + clinetLeft;
            top = ele.offsetTop + clinetTop;
        }
    }
    return {left: left, top: top};
};
//��һ��Ԫ�����Ϊ���Ԫ�ص�һ���ӽڵ�  //��child��ӳ�ele�ĵ�һ��Ԫ��
DOM.prepend=function(ele,child){
    ele.insertBefore(child,ele.firstChild);
};
DOM.insertAfter=function(ele,child){
    ele.insertBefore()
};
//��ȡ��ǰԪ�ص����и��͵ܵ�Ԫ�ؽڵ�
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
//��ȡ��һ���ܵ�Ԫ�ؽڵ�
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
        return null;//�ⷽ������Ӧ���з���ֵ�������Ҳ������������ķ���һ��null�������д��䣬������������еĽ����undefined��Υ��ԭ��
    }
};
//��ȡ��һ�����Ԫ�ؽڵ�
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
//��ȡָ����ǩ��curEle��������Ԫ��(div /li /span...)
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

//ͨ���������Ԫ��
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
//���Ԫ���Ƿ��������
DOM.hasClass = function (curEle, strClass) {
    var reg = new RegExp("(^| +) + strClass + ( +|&)");
    return reg.test(curEle.className);
};
//��ָ��Ԫ������һ����
DOM.addClass = function (curEle, strClass) {
    if (!hasClass(curEle, strClass)) {
        curEle.className += " " + strClass;
    }
};
//��ָ��Ԫ��ɾ��һ����
DOM.removeClass = function (curEle, strClass) {
    var reg = new RegExp("(^| +)" + strClass + "( +|$)", "g");
    if (hasClass(curEle, strClass)) {
        curEle.className = curEle.className.replace(reg, " ");
    }
};
