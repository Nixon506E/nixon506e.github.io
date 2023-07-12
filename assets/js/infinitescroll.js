$().ready(function () {
    var page = 2;
    var url_blog = window.location.href;
    var next_update = $(window).height();

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - $(window).height() && next_update < $(window).scrollTop()) {
            next_update = $(window).scrollTop() + $(window).height();

            if (url_blog.charAt(url_blog.length - 1) != '/') {
                url_blog = url_blog + '/';
            }
            var nextPage = url_blog + 'page/' + page;

            if (page <= max_pages) {
                $.get((nextPage),
                function (content) {
                    $('.material__posts').append($(content).children(".material__posts").children().fadeIn());
                    page = page + 1;
                });
            }
        }
    });
});
