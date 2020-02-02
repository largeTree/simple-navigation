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
        _js: function (src) {
            var script = document.createElement('script');
            script.src = src;
            script.async = false;
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
                if (this.loaded[file]) {
                    continue;
                }
                var method;
                if (typeof file === 'string') {
                    method = file.match(/\.([^.]+)$/)[1];
                }
                this.loaded[file] = 1;
                if (file.indexOf('?') > 0) {
                    file = file + '&ver=' + ver;
                } else {
                    file = file + '?ver=' + ver;
                }
                this['_' + method](file);
            }
        }
    }
    return new LazyLoader();
}());