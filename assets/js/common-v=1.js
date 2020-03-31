var doc = document;
    win = doc.documentElement;
var winWidth = win.clientWidth || doc.body.clientWidth;
var size = (winWidth / 750) * 100;
win.style.fontSize = (size < 100 ? size : 100) + 'px';

var langs = [
    { langs: 'zh-cn', file: '' },
    { langs: 'zh-tw', file: 'pages-tw' },
    { langs: 'en', file: 'pages-en' },
    { langs: 'en-us', file: 'pages-en' }
];


function checkLanguage(userLangs) {

    var local_lang = userLangs || window.localStorage.langs || 'zh-cn'
    var path = '';
    langs.forEach(function (item) {
        if (item.langs == local_lang.toLowerCase()) { 
            path = item.file
        } 
    })
    console.log('checkLanguage:',local_lang,path)
    return path
}

// filePath:语言文件， toPath:固定跳转
function changePath({ filePath, toPath = '' }) {
    var path_arr = new Array(),
        path_index = null,
        new_path = '';
    // alert(window.location.pathname)
    if (window.location.pathname.indexOf('/pages-') > -1){
        
        path_arr = window.location.pathname.split('/')
        path_index = null;
        langs.forEach(function (val) {
            if (val.file){
                path_arr.forEach(function (item,index) {
                    if (item == val.file) {
                        path_index = index;
                    }
                })
            }
        })
        
        new_path = path_arr.slice(path_index+1).join('/');
    } else {
        new_path = window.location.pathname.slice(1)
    }
    
    var redirect_url ='';
    if (toPath){
        redirect_url =  filePath ? `/${filePath}/${toPath}` : `/${toPath}`;
    } else {
        redirect_url =  filePath ? `/${filePath}/${new_path}` : `/${new_path}`;
    }
    
    window.location.replace( window.location.origin + redirect_url )
    
}

function checkPageBelong() {
    var file_path = checkLanguage();
    
    //移动端
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        if (window.location.pathname == '/index.html' || window.location.pathname == '/') {
            
            // var redirect_path = file_path ? `/${file_path}/mobile_index.html` : '/mobile_index.html'
            // var redirect_path = window.location.href.indexOf('pages-en') > -1 ? `/pages-en/mobile_index.html` : '/mobile_index.html'
            // alert(redirect_path)
            // window.location.replace(window.location.origin + redirect_path)
            changePath({
                filePath: file_path,
                toPath:'mobile_index.html'
            });
        }
        
    } else {
        if (window.location.pathname == '/mobile_index.html') {
            // var redirect_path = file_path ? `/${file_path}/index.html` : '/index.html'
            // var redirect_path = window.location.href.indexOf('pages-en') > -1 ? `/pages-en/index.html` : '/index.html'
            // window.location.replace( window.location.origin + redirect_path ) 
            changePath({
                filePath: file_path,
                toPath:'index.html'
            });
        }
    } 
}

/**
 * 微信配置
 */
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

//新增script
function setScript(url, dom,highlight){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.querySelector(dom).appendChild(script);
    if (highlight) {
        $(highlight).addClass('easy-nav-active')
        $('#sidebar-wrapper '+highlight).addClass('sidebar-brand')
    }
}
//
checkPageBelong()
$(document).ready(function () {
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) { event.preventDefault() }
    });
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
        var now=(new Date()).getTime();
        if(now-lastTouchEnd<=300){ event.preventDefault() }
        lastTouchEnd=now;
    }, false)
    
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {
        if (isClosed == true) {
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }
    
    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
  
    $('.dropdown').mouseenter(function () {
        $('.dropdown-menu').show();
        
    }).mouseleave(function () {
        $('.dropdown-menu').hide();
    });
    
    //微信
    $('.share-item-wx').mouseenter(function () {
        $('.share-qrcode').show()
    }).mouseleave(function () {
        $('.share-qrcode').hide()
    });
    
    $('.share-item-friend').mouseenter(function () {
        $('.share-qrcode').show()
    }).mouseleave(function () {
        $('.share-qrcode').hide()
    });

    $('.share-to-wx').click(function () {
        $('.share-type').html('微信好友');
        $('.share-mask').show();
        $('.overlay').hide();
        $('.share-operation').hide();
    });

    $('.share-to-friend').click(function () {
        $('.share-type').html('朋友圈');
        $('.share-mask').show();
        $('.overlay').hide();
        $('.share-operation').hide();
    });

    $('.share-to-wb').click(function () {
        $('.share-type').html('新浪微博');
        $('.share-mask').show();
        $('.overlay').hide();
        $('.share-operation').hide();
    });

    $('.share-to-qq').click(function () {
        $('.share-type').html('QQ好友');
        $('.share-mask').show();
        $('.overlay').hide();
        $('.share-operation').hide();

    });

    $('.share-mask').click(function () {
        $('.share-mask').hide();
    });

    //底部
    var date = new Date;
    var year = date.getFullYear();
    $('.copyright').html('&copy;2017-2019 版权所有&nbsp;&nbsp;广州造就科技有限公司 | 粤ICP备17140125号-1')
    var footerHeight = $(".footer-wrap").height();
    var headerHeight = $(".head-wrap").height();
    var footerTop = ($(window).scrollTop() + $(window).height() - footerHeight - headerHeight) + "px";

    if (($(document.body).height() + footerHeight) < $(window).height()) {
        $(".footer-wrap").css({ position: "absolute", left: "0" }).stop().css({ top: footerTop });

    }
    
});

$('.logo').click(function(){
    location.href = 'index.html';
});

/**
 * 内容分享
 */
function sharetoqq(ele,desc,title,summary,picUrl){
    var p = {
        url:location.href, /*获取URL，可加上来自分享到QQ标识，方便统计*/
        desc:desc, //发送内容
        title:sharetitle, /*分享标题(可选)*/
        summary:summary, /*分享摘要(可选)*/
        pics:picUrl, /*分享图片(可选)*/
        flash: '', /*视频地址(可选)*/
        site:'easygo分享', /*分享来源(可选) 如：QQ分享*/
    };
    var s = [];
    for(var i in p){
        s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
    var qhref = "http://connect.qq.com/widget/shareqq/index.html?"+s.join('&');

    $(ele).attr({href:qhref,target:"_blank"});
};
//微博  
function sharetosina(title,url,picurl)  {  
    var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+picurl;
    window.open(sharesinastring,'newwindow');
}

var app_id = "";
// var 
function wxConfig() {
    var url = "http://astore.kmud.net/astore/service/api/getjsapi/Getjsapi.php";
    $.ajax({
        type: "GET",
        cache: false,
        url: url,
        dataType: 'jsonp',
        jsonpCallback: 'callback',
        success: function (res) {
            var data = JSON.parse(res);
            wx.config({

                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。

                appId: res.appId, // 必填，公众号的唯一标识

                timestamp:res.timestamp , // 必填，生成签名的时间戳

                nonceStr: res.nonceStr, // 必填，生成签名的随机串

                signature: res.signature,// 必填，签名，见附录1

                jsApiList: ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone','onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2

            });
        },
        error: function (err) {
            console.log(err)
        }
    });
}


