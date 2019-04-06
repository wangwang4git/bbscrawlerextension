$(function () {
    'use strict';

    console.log('hello index...');

    chrome.storage.local.get('crawler_key', function (result) {
        $("#key").val(result.crawler_key);
    });

    $("#post").click(function () {
        let key = $("#key").val();
        if (key.length === 0) {
            alert("key输入为空，请重新输入");
        } else {
            chrome.storage.local.set({"crawler_key": key}, function () {
                console.log("save, key = " + key);
            });
        }
    });

});
