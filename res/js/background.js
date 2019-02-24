'use strict';

// for debug
let counter = 0;
let interval_ref;

$(function () {
    console.log('hello background...');

    // 2s执行一次爬取任务
    interval_ref = setInterval(function () {
        bbs_crawler();
    }, 2000);

});

function bbs_crawler() {
    let keyword = '家具';
    let url = 'http://bbs.oa.com/forum/search?k=' + keyword + '&page=1';
    url = encodeURI(url);
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            update_index();

            console.log(data);

            // let html = $.parseHTML(data);

            $.post('http://127.0.0.1:5000/bbscrawler',
                {
                    status: '0',
                    html: data
                },
                function (data, status) {
                    console.log("数据: \n" + data + "\n状态: " + status);
                });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            update_index();

            // 状态码
            console.log(XMLHttpRequest.status);
            if (XMLHttpRequest.status === 502) {
                // 错误信息同步
                console.log('错误信息同步');
            }
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息
            console.log(textStatus);
        }
    });
}

function update_index() {
    counter++;
    if (counter >= 1) {
        clearInterval(interval_ref);
        return;
    }
    console.log('bbs crawler...');
}
