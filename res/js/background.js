$(function () {
    'use strict';

    // for debug
    let step = 5;
    let counter = 0;
    let stop_counter = 3;
    let interval_ref;
    let crawlerkey;

    console.log('hello background...');

    // 10min，600s执行一次爬取任务
    interval_ref = setInterval(function () {
        bbs_crawler();
    }, step * 1000);

    function bbs_crawler() {
        chrome.storage.local.get('crawler_key', function (result) {
            crawlerkey = result.crawler_key;
        });
        if (crawlerkey === undefined) {
            console.log('hello background, crawlerkey === undefined...');
            return;
        }
        if (crawlerkey.length === 0) {
            console.log('hello background, crawlerkey.length === 0...');
            return;
        }

        // 每次爬去爬三页
        for (let i = 1; i <= 3; i++) {
            let url = 'http://bbs.oa.com/forum/search?k=' + crawlerkey + '&page=' + i;
            url = encodeURI(url);
            console.log('bbs crawler, url = ' + url);

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
                            html: data,
                            key: crawler_key
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
    }

    function update_index() {
        counter++;
        if (counter >= stop_counter) {
            clearInterval(interval_ref);
        }
    }

});
