import  html from './index.html';
import './index.css';
$('body').html(html);

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
})



