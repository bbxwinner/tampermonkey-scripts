// ==UserScript==
// @name         cordc helper
// @namespace    http://tampermonkey.net/
// @version      2024-07-20
// @description  Calculate how many bytes you could use each day
// @author       You
// @match        https://*.cordc.co/user
// @match        https://*.cordc.xyz/user
// @match        https://*.cordc.cc/user
// @match        https://*.cordcloud.cloud/user
// @match        https://*.cordc.net/user
// @icon         https://cordc.net/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    // 'use strict';

    var expirationDate;
    // 通过文本 "等级到期时间" 寻找包含到期时间的 <div> 元素
    var divElements = document.getElementsByTagName('div');

    for (var i = 0; i < divElements.length; i++) {
        var divElement = divElements[i];

        if (divElement.textContent.includes('等级到期时间')) {
            var expirationDateText = divElement.textContent;

            // 提取到期时间
            expirationDate = expirationDateText.match(/\d{4}-\d{2}-\d{2}/);

            if (expirationDate) {
                break;
            }
        }
    }

    // 通过 code, class, id 寻找剩余流量的 <code> 元素
    var remainingData;
    var codeElement = document.querySelector('code.card-tag.tag-green#remain');
    if (codeElement) {
        // 提取剩余流量的文本内容
        var remainingDataText = codeElement.textContent;

        // 提取数字部分
        remainingData = remainingDataText.match(/[\d.]+/);
    }

    if (expirationDate && remainingData) {
        // 将到期时间字符串转换为日期对象
        var expiration = new Date(expirationDate[0]);

        // 获取当前日期
        var today = new Date();

        // 计算剩余天数
        var daysRemaining = Math.ceil((expiration - today) / (1000 * 60 * 60 * 24));

        // 提取剩余流量值
        var remainingDataValue = parseFloat(remainingData[0]);

        // 计算每天可用的流量
        var dataPerDay = remainingDataValue / daysRemaining;

        // 显示弹窗
        alert('今后每天可用的流量为: ' + dataPerDay.toFixed(2) + 'GB');
    } else {
        alert('未找到匹配的元素或提取的数据');
    }
})();
