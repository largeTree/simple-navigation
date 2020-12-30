Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                      // 月份 
        "d+": this.getDate(),                           // 日 
        "H+": this.getHours(),                          // 小时  24小时制
        "h+": this.getHours() - 12,                     // 小时 12小时制
        "m+": this.getMinutes(),                        // 分 
        "s+": this.getSeconds(),                        // 秒 
        "q+": Math.floor((this.getMonth() + 3) / 3),    // 季度 
        "S": this.getMilliseconds()                     //毫秒 
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

var LazyLoader = (function () {
    function LazyLoader() {
        this.loaded = {};
    }

    LazyLoader.prototype = {
        _js: function (src, callback) {
            var script = document.createElement('script');
            script.src = src;
            script.async = false;
            if (callback && typeof callback === 'function') {
                script.onload = callback();
            }
            document.head.appendChild(script);
        },
        _css: function (href) {
            var style = document.createElement('link');
            style.type = 'text/css';
            style.rel = 'stylesheet';
            style.href = href;
            document.head.appendChild(style);
        },
        load: function (files, ver) {
            if (!Array.isArray(files)) {
                files = [files];
            }

            for (var file of files) {
                if ((typeof file === 'string' && this.loaded[file]) || (file.url && this.loaded[file.url])) {
                    continue;
                }
                var method;
                var url = file;
                if (typeof file === 'string') {
                    method = file.match(/\.([^.]+)$/)[1];
                } else {
                    url = file.url;
                    method = url.match(/\.([^.]+)$/)[1];
                }
                this.loaded[url] = 1;
                if (url.indexOf('?') > 0) {
                    url = url + '&ver=' + ver;
                } else {
                    url = url + '?ver=' + ver;
                }
                this['_' + method](url, file.callback);
            }
        }
    }
    return new LazyLoader();
}());