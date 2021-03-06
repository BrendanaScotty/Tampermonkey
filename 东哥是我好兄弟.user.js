// ==UserScript==
// @name        东哥是我好兄弟
// @namespace   https://github.com/Ahaochan/Tampermonkey
// @version     0.0.1
// @icon        https://bean.m.jd.com/favicon.ico
// @description 狗东助手
// @author      Ahaochan
// @include     http*://*.jd.com*
// @license     GPL-3.0
// @supportURL  https://github.com/Ahaochan/Tampermonkey
// @grant       GM.openInTab
// @require     https://code.jquery.com/jquery-2.2.4.min.js
// @run-at      document-end
// ==/UserScript==
jQuery(function ($) {
    'use strict';

    let dong = [
        // ================================ 作废 ======================================},
        {name: "狂欢九宫格", url: "https://red-e.jd.com/resources/lottery/index.html"},
        {name: "每日镚一镚", url: "https://red-e.jd.com/resources/pineapple/index.html"},
        {name: "点商品赚京豆", url: "https://jddx.jd.com/m/reward/product-list.html?from=kggicon&cu=true"},
        {name: "逛商品赚京豆", url: "https://jddx.jd.com/m/reward/product-list.html?from=zqdhdljd"},
        // ============================= 京价保自动 ======================================},
        {name: "领京豆", url: "https://bean.m.jd.com/"},
        {name: "京豆大转盘", url: "https://turntable.m.jd.com/?actId=jgpqtzjhvaoym&appSource=jdhome"},
        {name: "京东支付单单反", url: "https://m.jr.jd.com/vip/activity/newperback/index.html?businessNo=jr_fuli"},
        {name: "摇一摇领京豆", url: "https://vip.jd.com/newPage/reward?from=groupmessage&isappinstalled=0"},
        // ============================= 脚本 ======================================},
        {name: "金币天天抽奖", url: "https://m.jr.jd.com/member/coinlottery/index.html"},
        {name: "宠物馆", url: "https://pro.m.jd.com/mall/active/3GCjZzanFWbJEU4xYEjqfPfovokM/index.html"},
        {name: "京东个护", url: "https://pro.m.jd.com/mall/active/NJ1kd1PJWhwvhtim73VPsD1HwY3/index.html"},
        {name: "京东图书", url: "https://pro.m.jd.com/mall/active/3SC6rw5iBg66qrXPGmZMqFDwcyXi/index.html"},
        {name: "京东母婴", url: "https://pro.m.jd.com/mall/active/3BbAVGQPDd6vTyHYjmAutXrKAos6/index.html"},
        {name: "家庭清洁馆", url: "https://pro.m.jd.com/mall/active/2xV4nJszqQKgQSie4PXYyoCWFHmB/index.html"},
        {name: "超市签到有礼", url: "https://pro.m.jd.com/mall/active/aNCM6yrzD6qp1Vvh5YTzeJtk7cM/index.html"},
        {name: "拍拍二手签到有礼", url: "https://pro.m.jd.com/mall/active/3S28janPLYmtFxypu37AYAGgivfp/index.html"},
        // ============================= 手动 ======================================},
        {name: "每日签到", url: "https://uf.jr.jd.com/activities/sign/v5/index.html?channel=", multi: 5},
        {name: "简单赚钱", url: "https://jddx.jd.com/m/jddnew/money/index.html?from=zqjdzfgzhqfl", multi: 6}, // class = indexSign
        {name: "今日刮大奖", url: "https://prodev.m.jd.com/mall/active/4YCspTbG36PSi8BW31mp71NR1GQP/index.html&?from=gwddf"},
        {name: "天天赚零钱", url: "https://m.jr.jd.com/btyingxiao/advertMoney/html/home.html?from=jddzqicon"},
    ];

    $(document).keydown(function(e) {
        // Alt+A 快捷键
        if (e.keyCode == 65 && e.altKey) {
            for (let idx in dong) {
                if (!dong.hasOwnProperty(idx)) continue;

                let name = dong[idx].name;
                let url = dong[idx].url;
                let multi = dong[idx].multi || 1;

                for (let i = 0; i < multi; i++) {
                    GM.openInTab(url, true);
                }
            }
        }
    });

    // 加载依赖
    let exec = function (reg, selector, fun) {
        if (reg.test(location.href)) {
            $('html, body').animate({scrollTop: document.body.scrollHeight}, 0);
            console.log("滚动:" + document.body.scrollHeight);
            let timer = setInterval(() => {
                let $selector = $(selector);
                console.log($selector);
                if ($selector.length > 0) {
                    $('html, body').animate({scrollTop: $selector.offset().top}, 0);
                    fun();
                    clearInterval(timer);
                }
            }, 300);
        }
    };

    // 金币天天抽奖【https://m.jr.jd.com/member/coinlottery/index.html 】
    exec(/m\.jr\.jd\.com\/member\/coinlottery\/index\.html/, '#lottery',
        function () {
            let text = $('.times-txt p span').text();
            if(parseInt(text) === 0) {
                $('.btn').click();
            }
        });

    // 宠物馆【https://pro.m.jd.com/mall/active/3GCjZzanFWbJEU4xYEjqfPfovokM/index.html 】
    // 京东个护【https://pro.m.jd.com/mall/active/NJ1kd1PJWhwvhtim73VPsD1HwY3/index.html 】
    // 京东图书【https://pro.m.jd.com/mall/active/3SC6rw5iBg66qrXPGmZMqFDwcyXi/index.html 】
    // 超市签到有礼【https://pro.m.jd.com/mall/active/aNCM6yrzD6qp1Vvh5YTzeJtk7cM/index.html 】
    // 拍拍二手签到有礼【https://pro.m.jd.com/mall/active/3S28janPLYmtFxypu37AYAGgivfp/index.html 】
    exec(/pro\.m\.jd\.com\/mall\/active\/.*\/index\.html/, '.signIn_module',
        function () {
            $('.signIn_btn').click();
        });

    // 每日签到【https://uf.jr.jd.com/activities/sign/v5/index.html?channel= 】
    exec(/uf\.jr\.jd\.com\/activities\/sign\/v5\/index\.html.*/, '#adFloorCont',
        function () {
            $('#adMain').attr('id', '');
            $('#adFloorCont').css('width', 'auto');
        });
});
