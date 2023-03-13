//判断是什么浏览器
export function WhatBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    // console.log(userAgent) //可以将这个打印出来会很清晰的展示出浏览器的类型
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }   //判断是否是chrome浏览器
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

// 根据url获取协议＋域名＋favicon.ico
export function getWebIcon(url){
    let rep = /(\w+):\/\/([^/:]+)(:\d*)?/;
    let urlArr = url.match(rep);
    let iconUrl =urlArr[0]+'/'+'favicon.ico';
    return iconUrl;
}

// 获取当前日期或者时间
export const getLocalTime = {
    presentDate() {
        let currentDate = '';
        const date = new Date();
        currentDate = date.toLocaleDateString();
        return currentDate;
    },
    presentTime() {
        let currentTime = '';
        const date = new Date();
        currentTime = date.toLocaleTimeString('chinese', { hour12: false });
        return currentTime;
    }
};