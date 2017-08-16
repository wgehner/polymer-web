"use strict";
var TR = {
    processing: !1,
    show: function(s, i) {
        $(s).html(i.$new);
    },
    _clone: function(s, i, t) {
        var e = s.children().clone();
        e.find().remove("script"), i.append(e);
        var n = $(document.createElement("div")).attr("id", t).attr("class", t);
        e.wrapAll(n);
    },
    _clip: function(s, i, t, e, n) {
        var c = "rect(" + (e || "0px") + " " + i + " " + t + " "(n || "0px") + ")", o = $("#" + s);
        return o.css("clip", c), o.css("position", "absolute"), o.css("z-index", 8), o.css("top", "0px"), 
        o.css("left", "0px"), o.css("width", $(window).width() + "px"), o.css("min-height", $(window).height() + "px"), 
        o;
    },
    uncoverDown: function(s, i, t, e) {
        TR._uncover(s, i, t, e, "down");
    },
    uncoverUp: function(s, i, t, e) {
        TR._uncover(s, i, t, e, "up");
    },
    uncoverLeft: function(s, i, t, e) {
        TR._uncover(s, i, t, e, "left");
    },
    uncoverRight: function(s, i, t, e) {
        TR._uncover(s, i, t, e, "right");
    },
    _uncover: function(s, i, t, e, n) {
        if (!TR.processing) {
            TR.processing = !0;
            var c = $(s), o = $(i);
            if (t.fromHref == t.toHref) return c.html(t.$new), void (TR.processing = !1);
            TR._clone(c, o, "firstSl");
            var r = $(window).width() + "px", a = $(window).height() + "px", u = TR._clip("firstSl", r, a);
            switch (u.css("background-color", "white"), c.html(t.$new), n) {
              case "down":
                u.transition({
                    y: a,
                    easing: "easeOutCubic",
                    duration: e
                });
                break;

              case "up":
                u.transition({
                    y: "-" + a,
                    easing: "easeOutCubic",
                    duration: e
                });
                break;

              case "right":
                u.transition({
                    x: r,
                    easing: "easeOutCubic",
                    duration: e
                });
                break;

              case "left":
                u.transition({
                    x: "-" + r,
                    easing: "easeOutCubic",
                    duration: e
                });
            }
            setTimeout(function() {
                o.empty(), TR.processing = !1;
            }, e);
        }
    },
    coverDown: function(s, i, t, e) {
        TR._cover(s, i, t, e, "down");
    },
    coverUp: function(s, i, t, e) {
        TR._cover(s, i, t, e, "up");
    },
    coverLeft: function(s, i, t, e) {
        TR._cover(s, i, t, e, "left");
    },
    coverRight: function(s, i, t, e) {
        TR._cover(s, i, t, e, "right");
    },
    _cover: function(s, i, t, e, n) {
        if (!TR.processing) {
            TR.processing = !0;
            var c = $(s), o = $(i);
            if (t.fromHref == t.toHref) return c.html(t.$new), void (TR.processing = !1);
            TR._clone(c, o, "firstSl");
            var r = $(window).width() + "px", a = $(window).height() + "px";
            TR._clip("firstSl", r, a);
            switch (c.css("position", "absolute"), n) {
              case "down":
                c.css("top", "-" + a), c.css("left", "0px");
                break;

              case "up":
                c.css("top", a), c.css("left", "0px");
                break;

              case "right":
                c.css("top", "0px"), c.css("left", r);
                break;

              case "left":
                c.css("top", "0px"), c.css("left", "-" + r);
            }
            switch (c.css("z-index", "9"), c.css("transform", ""), c.html(t.$new), n) {
              case "down":
                c.transition({
                    y: a,
                    easing: "easeOutCubic",
                    duration: e
                });
                break;

              case "up":
                c.transition({
                    y: "-" + a,
                    easing: "easeOutCubic",
                    duration: e
                });
                break;

              case "right":
                c.transition({
                    x: r,
                    easing: "easeOutCubic",
                    duration: e
                });
                break;

              case "left":
                c.transition({
                    x: "-" + r,
                    easing: "easeOutCubic",
                    duration: e
                });
            }
            setTimeout(function() {
                o.empty(), TR.processing = !1;
            }, e);
        }
    },
    fadeIn: function(s, i, t) {
        var e = $(s);
        e.css("opacity", "0"), e.html(i.$new), e.transition({
            opacity: 1
        }, t, "easeOutCubic");
    },
    fadeOut: function(s, i, t, e) {
        $(s).transition({
            opacity: e || .3
        }, t, "linear");
    },
    splitVerticalOut: function(s, i, t, e) {
        if (!TR.processing) {
            TR.processing = !0;
            var n = $(s), c = $(i), o = $(window).width(), r = o + "px", a = o / 2 + "px", u = $(window).height() + "px", p = "rect(0px " + a + " " + u + " 0px)", l = "rect(0px " + r + " " + u + " " + a + ")";
            TR._clone(n, c, "firstSl"), TR._clone(n, c, "cloneSl"), n.html(t.$new);
            var f = $("#firstSl");
            f.css("clip", p), f.css("position", "absolute"), f.css("z-index", 8), f.css("top", "0px"), 
            f.css("left", "0px"), f.css("width", r), f.css("min-height", u), f.css("background-color", "white"), 
            f.css("transform", "");
            var d = $("#cloneSl");
            d.css("clip", l), d.css("position", "absolute"), d.css("z-index", 10), d.css("top", "0px"), 
            d.css("left", "0px"), d.css("width", r), d.css("min-height", u), d.css("background-color", "white"), 
            d.css("transform", ""), f.transition({
                x: "-" + a,
                easing: "easeOutCubic",
                duration: e
            }), d.transition({
                x: a,
                easing: "easeOutCubic",
                duration: e
            }), setTimeout(function() {
                c.empty(), TR.processing = !1;
            }, e);
        }
    }
};