webpackJsonp([0],{

/***/ "./src/app/index.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/app/index.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"app\">\r\n    <div class=\"vipBrand\">\r\n\r\n        <div v-if=\"vName === 'VIP7'\" class=\"toUp\">\r\n            去分享\r\n        </div>\r\n        <div v-else class=\"toUp\">\r\n            去升级\r\n        </div>\r\n        <div class=\"vipName tc\">\r\n            {{vName}}会员\r\n            <span v-if=\"isLow === 'true'\" class=\"pa\">&nbsp;降级中&nbsp;</span>\r\n        </div>\r\n        <div v-if=\"vName !== 'VIP7'\" class=\"vipRate\">\r\n            您打败了{{proportion}}%的用户<br>\r\n            距{{nextName}}需新增{{distance}}元\r\n        </div>\r\n    </div>\r\n    <div class=\"myRightTitle\">\r\n        我的特权\r\n        <span v-if=\"vName === 'VIP7'\">\r\n        累积持有天数<span>12</span>天\r\n        </span>\r\n    </div>\r\n    <div class=\"right\">\r\n        <ul>\r\n            <li>\r\n                <img src=\"./img/vip/toCash.png\" alt=\"\">\r\n                <span>{{vip_cash_count.name}}</span>\r\n                <span class=\"redColor\">{{vip_cash_count.value == -1?\"无限制\":vip_cash_count.value}}</span>\r\n            </li>\r\n            <li>\r\n                <img src=\"./img/vip/birthday.png\" alt=\"\">\r\n                <span>{{vip_birthday.name}}</span>\r\n                <span class=\"redColor\">{{vip_birthday.value}}元</span>\r\n            </li>\r\n            <li>\r\n                <img src=\"./img/vip/amountX.png\" alt=\"\">\r\n                <span>{{vip_xAmount.name}}</span>\r\n                <span class=\"redColor\">{{vip_xAmount.value}}万</span>\r\n            </li>\r\n            <li>\r\n                <img src=\"./img/vip/gift.png\" alt=\"\">\r\n                <span>{{vip_upGradeGift.name}}</span>\r\n                <span class=\"redColor\">{{vip_upGradeGift.value}}元</span>\r\n            </li>\r\n            <li>\r\n                <img src=\"./img/vip/signIn.png\" alt=\"\">\r\n                <span>{{vip_signInAward.name}}</span>\r\n                <span class=\"redColor\">{{vip_signInAward.value}}元</span>\r\n            </li>\r\n            <li>\r\n                <img v-bind:class=\"[vip_specialGift.value == 1 ? '' : 'gray']\" src=\"./img/vip/special.png\" alt=\"\">\r\n                <span>{{vip_specialGift.name}}</span>\r\n            </li>\r\n            <li>\r\n                <img v-bind:class=\"[vip_customerService.value == 1 ? '' : 'gray']\" src=\"./img/vip/kefu.png\" alt=\"\">\r\n                <span>{{vip_customerService.name}}</span>\r\n            </li>\r\n            <li>\r\n                <img class=\"last\" src=\"./img/vip/hope.png\" alt=\"\">\r\n                <span class=\"white\">更多福利<br>\r\n                敬请期待</span>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_html__ = __webpack_require__("./src/app/index_touch.html");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css__ = __webpack_require__("./src/app/index.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_css__);


$('body').html(__WEBPACK_IMPORTED_MODULE_0__index_html___default.a);

var app = new Vue({
    el: '#app',
    data: {
        "vcNid": "vip_5",
        "vName": "VIP5",
        "isLow": "false",
        "proportion": 96.79,
        "totalAmt": 5242621.69,
        "nextName": "VIP6",
        "distance": 521800.01,
        "vip_cash_count": {
            "name": "免费提现次数",
            "value": "-1"
        },
        "vip_birthday": {
            "name": "生日礼包",
            "value": "88"
        },
        "vip_xAmount": {
            "name": "活期限额",
            "value": 12
        },
        "vip_upGradeGift": {
            "name": "升级礼包",
            "value": "480"
        },
        "vip_signInAward": {
            "name": "签到奖励",
            "value": "0.2"
        },
        "vip_specialGift": {
            "name": "专属福利",
            "value": "1"
        },
        "vip_customerService": {
            "name": "VIP客服",
            "value": "1"
        }
    }
});

/***/ })

},["./src/app/index.js"]);
//# sourceMappingURL=app.bundle.js.map