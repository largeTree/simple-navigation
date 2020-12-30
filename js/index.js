var config = {
    version: '1.0'
}

var files = ['./css/thirty/bootstrap.min.css', './css/index.css', './js/links.js'];
LazyLoader.load(files, config.version);

$(function () {
    $('#search-bar select').bind('change', function ($event) {
        var $option = $($event.currentTarget).children('option:selected');
        var icon = $option.data('icon');
        $('#search-bar img').attr('src', icon);
        currentSearchUrl = $option.attr('value');
    });

    $('#search-bar input').bind('keypress', function ($event) {
        if (event.keyCode === 13) {
            var searchToken = $($event.currentTarget).val();
            doSearch(searchToken);
        }
    });

    $('#search-bar button').bind('click', function ($event) {
        var searchToken = $('#search-bar input').val();
        doSearch(searchToken);
    });

    // 设置显示当前时间，并自动刷新
    setCurrentTime(true);

});

function setCurrentTime(autoRefresh) {
    var date = new Date().format('yyyy-MM-dd HH:mm:ss');
    $('#clock').html(date);
    if (autoRefresh && autoRefresh === true) {
        setInterval(function () {
            setCurrentTime(false);
        }, 1000);
    }
}

function doSearch(searchToken) {
    if (!searchToken || searchToken.length == 0) {
        return;
    }
    var currentSearchUrl = $('#search-bar select option:selected').attr('value');
    window.open(currentSearchUrl.replace('{{word}}', searchToken), '_blank');
}

