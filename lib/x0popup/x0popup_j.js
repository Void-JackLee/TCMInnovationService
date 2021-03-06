/* x0popup - v0.3.3 | http://gao-sun.github.io/x0popup */
"use strict";
var x0popup, x0p, x0pDefaultConfig = {
    title: "Message",
    text: null,
    theme: "default",
    overlay: !0,
    width: "90%",
    height: "50%",
    maxWidth: "450px",
    maxHeight: "200px",
    type: "text",
    customContent: null,
    customCallback: null,
icon: null,
    iconURL: null,
    inputType: null,
    inputValue: null,
    inputPlaceholder: null,
    inputColor: null,
    inputValidator: null,
    inputPromise: null,
    showCancelButton: null,
    buttons: null,
    autoClose: null,
    html: !1,
    animation: !0,
    animationType: "pop",
    overlayAnimation: !0,
    keyResponse: !0,
    showButtonOutline: !1,
    buttonTextOk: "OK",
    buttonTextConfirm: "Confirm",
    buttonTextCancel: "Cancel",
    buttonTextDefault: "Button"
};
x0popup = x0p = function() {
    function t() {
        var t = "";
        return t += "width: " + y.width + ";",
            t += "height: " + y.height + ";",
        null != y.maxWidth && (t += "max-width: " + y.maxWidth + ";"),
        null != y.maxHeight && (t += "max-height: " + y.maxHeight + ";"),
        y.animation && (t += "-webkit-animation-name: x0p" + y.animationType + "; animation-name: x0p" + y.animationType + ";"),
        !y.overlay && (t += "outline: 1px solid #ddd"),
            t
    }
    function e() {
        var t = "",
            e = null == y.icon ? y.type: y.icon;
        switch (t += '<div class="icon-wrapper">', e) {
            case "ok":
                t += '<i class="xi xi-ok"><span class="xi-ok-left"></span><span class="xi-ok-right"></span></i>';
                break;
            case "error":
                t += '<i class="xi xi-error"><span class="xi-error-left"></span><span class="xi-error-right"></span></i>';
                break;
            case "info":
                t += '<i class="xi xi-info"><span class="xi-info-circle"></span><span class="xi-info-line"></span></i>';
                break;
            case "warning":
                t += '<i class="xi xi-warning"><span class="xi-warning-circle"></span><span class="xi-warning-line"></span></i>';
                break;
            case "custom":
                t += "<i class='xi' style='background: url('" + y.iconURL + "') no-repeat center center; background-size: 100% 100%;\"></i>"
        }
        return t += "</div>"
    }
    function n() {
        var t = "";
        if (x = y.buttons, null == x && (x = [], 1 != y.showCancelButton && (0 == y.showCancelButton || "warning" != y.type && "input" != y.type) || x.push({
            type: "cancel",
            key: 27
        }), "text" == y.type || "input" == y.type ? x.push({
            type: "info",
            key: 13
        }) : x.push({
            type: y.type,
            key: 13
        })), 0 == x.length) return "";
        var e = 1 == y.keyResponse ? "button": "div",
            n = x.length,
            i = "width: " + (100 / n).toFixed(2) + "%; width: calc(100% / " + n + ");",
            l = 1 == y.showButtonOutline ? " button-outline": "";
        t += '<div id="x0p-buttons" class="buttons">';
        for (var o = 0; o < x.length; ++o) {
            var a = x[o];
            t += "<" + e + ' id="x0p-button-' + o + '" class="button button-' + a.type + l + '" style="' + i + '">' + c(a) + "</" + e + ">"
        }
        return t += "</div>"
    }
    function i(t) {
        var e = document.getElementById(t);
        null != e && e.parentNode.removeChild(e)
    }
    function l() {
        g.classList.remove("noscroll"),
            document.removeEventListener("keydown", u),
            i("x0popup"),
            i("x0p-overlay")
    }
    function o() {
        var t = document.getElementById("x0p-buttons");
        t.innerHTML = '<div class="x0l"><div class="ball ball-4"></div><div class="ball ball-3"></div><div class="ball ball-2"></div><div class="ball ball-1"></div></div>'
    }
    function a() {
        for (var t = x.length - 1,
                 e = 0; e < x.length; ++e) {
            var n = document.getElementById("x0p-button-" + e); !
                function(t, e) {
                    n.addEventListener("click",
                        function() {
                            r(t, e)
                        })
                } (x[e].type, x[e].showLoading),
                n.addEventListener("mousedown",
                    function(t) {
                        t.preventDefault ? t.preventDefault() : t.returnValue = !1
                    }),
            1 == x[e]["default"] && (t = e)
        }
        if (y.keyResponse && x.length > 0) {
            var i = document.getElementById("x0p-button-" + (x.length - 1));
            i.addEventListener("keydown",
                function(t) {
                    9 == t.keyCode && (document.getElementById("x0p-button-0").focus(), t.preventDefault ? t.preventDefault() : t.returnValue = !1)
                }),
                document.getElementById("x0p-button-" + t).focus()
        } else document.activeElement.blur()
    }
    function u(t) {
        for (var e = t.keyCode,
                 n = 0; n < x.length; ++n) if (e == x[n].key) {
            var i = document.getElementById("x0p-button-" + n);
            t.preventDefault ? t.preventDefault() : t.returnValue = !1,
            i && i.click()
        }
    }
    function r(t, e) {
        var n = document.getElementById("x0popup");
        if (null != n) {
            var i = document.getElementById("x0p-input");
            if ("cancel" != t && null != E && null != i) {
                if (null != y.inputPromise) return void y.inputPromise(t, i.value).then(function(n) {
                    null != n ? p(n) : s(t, e)
                });
                if (null != y.inputValidator) {
                    var l = y.inputValidator(t, i.value);
                    if (null != l) return void p(l)
                }
            }
            s(t, e)
        }
    }
    function s(t, e) {
        var n = document.getElementById("x0p-input");
        var k = y.customCallback === null ? undefined : y.customCallback();
        clearTimeout(h),
            1 == e ? o() : l();
        var i = null == n ? null: n.value;
        null != m && m(t, i, l),
            w({
                button: t,
                text: i,
                close: l,
                data: k
            })
    }
    function p(t) {
        i("x0p-input-error");
        var e = document.getElementById("x0p-input-anchor");
        e.insertAdjacentHTML("beforeend", '<div id="x0p-input-error" class="error">' + t + "</div>")
    }
    function c(t) {
        if (t.hasOwnProperty("text")) return t.text;
        switch (t.type) {
            case "ok":
            case "error":
            case "info":
                return x0pDefaultConfig.buttonTextOk;
            case "warning":
                return x0pDefaultConfig.buttonTextConfirm;
            case "cancel":
                return x0pDefaultConfig.buttonTextCancel;
            default:
                return x0pDefaultConfig.buttonTextDefault
        }
    }
    function d() {
        var t = y.inputColor;
        return null == t ? "": "<style>#x0p-input:focus { border-color:" + t + "; color:" + t + "; }</style>"
    }
    function v(t) {
        var e = document.createElement("div");
        return e.innerText = e.textContent = t,
            t = e.innerHTML
    }
    var x, f = arguments[0],
        m = null,
        y = JSON.parse(JSON.stringify(x0pDefaultConfig)),
        h = null,
        g = document.body;
    if ("string" == typeof f) y.title = arguments[0],
    void 0 != arguments[1] && (y.text = arguments[1]),
    void 0 != arguments[2] && (y.type = arguments[2]),
    void 0 != arguments[3] && ("boolean" == typeof arguments[3] ? y.overlayAnimation = arguments[3] : m = arguments[3]);
    else {
        for (var b in f) y[b] = f[b];
        void 0 != arguments[1] && (m = arguments[1])
    }
    var w, k, C = "",
        T = null == y.icon && ("text" == y.type || "input" == y.type),
        E = null != y.inputType ? y.inputType: "input" == y.type ? "text": null,
        B = null == y.inputValue ? "": y.inputValue,
        D = null == y.inputPlaceholder ? "": y.inputPlaceholder,
        L = n(),
        K = y.customContent == null ? "" : y.customContent,
        I = new Promise(function(n, i) {
            w = n,
                k = i,
            y.overlay && (C += '<div id="x0p-overlay" class="x0p-overlay' + (y.animation && y.overlayAnimation ? "": " no-animation") + '"></div>'),
                C += '<div id="x0popup" class="x0p ' + y.theme + (0 == y.animation ? " no-animation": "") + (0 == x.length ? " no-button": "") + '" style="' + t() + '">',
                C += '<div class="content">',
                C += T ? '<div class="text-pure-wrapper">': e() + '<div class="text-wrapper">',
                C += '<div class="text-anchor">',
                C += '<div class="title">' + y.title + "</div>",
                C += K,
            null != y.text && (C += '<div class="text">' + (y.html ? y.text: v(y.text)) + "</div>"),
            null != E && (C += '<div id="x0p-input-anchor" class="input">' + d() + '<input id="x0p-input" type="' + E + '" placeholder="' + D + '" value="' + B + '"></div>'),
                C += "</div>",
                C += "</div>",
                C += "</div>",
                C += L,
                C += "</div>",
                l(),
                g.insertAdjacentHTML("beforeend", C),
                g.classList.add("noscroll"),
                a(),
            1 == y.keyResponse && document.addEventListener("keydown", u);
            var o = document.getElementById("x0p-input");
            null != E && o.focus(),
            null != y.autoClose && (h = setTimeout(function() {
                    r("timeout")
                },
                y.autoClose))
        });
    return I
},
    x0popup.setDefault = x0p.setDefault = function() {
        var t = arguments[0];
        for (var e in t) x0pDefaultConfig[e] = t[e]
    },
"object" == typeof module && (module.exports = x0popup);