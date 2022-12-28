function nextPage() {
    if ($("section.screen.active").attr("id") != "page4") {
        $olditem = $("section.screen.active");
        $("#" + $("section.screen.active").attr("id").substring(0, 4) + (parseInt($("section.screen.active").attr("id").substring(4, 5)) + 1)).toggleClass("active").removeClass("goback goforward");
        $olditem.removeClass("active").addClass("goback");
        $("#activeprogitem").css("left", ((parseInt($("section.screen.active").attr("id").substring(4, 5)) * 25) - 25) + "%");
    }
}
function prevPage() {
    if ($("section.screen.active").attr("id") != "page1") {
        $olditem = $("section.screen.active");
        $("#" + $("section.screen.active").attr("id").substring(0, 4) + (parseInt($("section.screen.active").attr("id").substring(4, 5)) - 1)).toggleClass("active").removeClass("goback goforward");
        $olditem.removeClass("active").addClass("goforward");
        $("#activeprogitem").css("left", ((parseInt($("section.screen.active").attr("id").substring(4, 5)) * 25) - 25) + "%");
    }
}
function navigateToPage(pagenum) {
    if (pagenum >= 1 && pagenum <= 4 && $("section.screen.active").attr("id").substring(4, 5) != pagenum)
    {
        $olditem = $("section.screen.active");
        if ($olditem.attr("id").substring(4, 5) < pagenum) {
            $olditem.toggleClass("active goback");
        } else if ($olditem.attr("id").substring(4, 5) > pagenum) {
            $olditem.toggleClass("active goforward");
        }
        $("#page" + pagenum).toggleClass("active").removeClass("goback goforward");
        $("#activeprogitem").css("left", ((parseInt($("section.screen.active").attr("id").substring(4, 5)) * 25) - 25) + "%");
    }
}
$('html').bind('mousewheel DOMMouseScroll', function (e) {
    var delta = (e.originalEvent.wheelDelta || -e.originalEvent.detail);
    if (delta < 0) {
        nextPage();
    } else if (delta > 0) {
        prevPage();
    }
    return false;
});

if (Modernizr.touch) {
    var bodl = document.getElementsByTagName("body")[0];
    var hammer = new Hammer.Manager(bodl);
    var swipe = new Hammer.Swipe();
    hammer.add(swipe);
    hammer.on("swipeleft", function () { nextPage(); });
    hammer.on("swiperight", function () { prevPage(); });
}