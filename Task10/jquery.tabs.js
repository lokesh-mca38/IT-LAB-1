(function ($) {

    $.fn.customTabs = function (options) {

        var settings = $.extend({
            activeClass: "active-tab",
            animationSpeed: 400,
            defaultTab: 0
        }, options);

        return this.each(function () {

            var tabContainer = $(this);
            var tabs = tabContainer.find("li");
            var contents = tabContainer.parent().find(".tab-content");

            function showTab(index) {

                tabs.removeClass(settings.activeClass);
                tabs.eq(index).addClass(settings.activeClass);

                contents.stop(true, true).hide();
                contents.eq(index).fadeIn(settings.animationSpeed);

                var tabId = tabs.eq(index).data("tab");
                window.location.hash = tabId;
            }

            tabs.on("click", function () {
                var index = $(this).index();
                showTab(index);
            });

            $(document).on("keydown", function (e) {

                var currentIndex = tabs.index(tabContainer.find("." + settings.activeClass));

                if (e.key === "ArrowRight") {
                    var next = (currentIndex + 1) % tabs.length;
                    showTab(next);
                }

                if (e.key === "ArrowLeft") {
                    var prev = (currentIndex - 1 + tabs.length) % tabs.length;
                    showTab(prev);
                }
            });

            var hash = window.location.hash.substring(1);

            if (hash) {
                tabs.each(function (i) {
                    if ($(this).data("tab") === hash) {
                        showTab(i);
                    }
                });
            } else {
                showTab(settings.defaultTab);
            }

        });
    };

})(jQuery);