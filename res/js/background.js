'use strict';

let counter = 0;
let interval_ref;

$(function () {
    console.log('hello background...');

    interval_ref = setInterval(function () {
        bbs_crawler();
    }, 2000);
});

function bbs_crawler() {
    $.ajax({
        url: 'http://bbs.oa.com/forum/search?k=%E5%AE%B6%E5%85%B7',
        type: 'GET',
        success: function (data) {
            update_index();

            console.log(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            update_index();

            // 状态码
            console.log(XMLHttpRequest.status);
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息
            console.log(textStatus);
        }
    });
}

function update_index() {
    counter++;
    if (counter >= 11) {
        clearInterval(interval_ref);
        return;
    }
    console.log('bbs crawler...');
}
