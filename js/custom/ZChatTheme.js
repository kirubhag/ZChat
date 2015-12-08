/**
 * Created by WebStorm.
 * User: kirubha-2911
 * Date: 11/26/15
 * Time: 9:19 PM
 * Project: ZChat
 * File Name: ZChatTheme
 */

var ZChatTheme = (function (ZChatTheme) {

    ZChatTheme = (ZChatTheme) ? ZChatTheme : {};

    //Constant variable declaration
    ZChatTheme.Themes = [];

    var ThemeAlpha = {
        name: "ThemeAlpha",
        leftPanel: {
            textColor: {"color": "#fff"},
            userDetailsColor: {"background-color": "#2962FF"},
            chatListColor: {"background-color": "#448AFF"},
            chatListHoverColor: {"background-color": "#2979FF", "border-color": "#2962FF"},
            chatListHoverClear: {"background-color": "#448AFF", "border-color": "#448AFF"},
            scrollBarColor: {"background-color": "#E3F2FD"},
            scrollBarBGColor: {"background-color": "#0D47A1"}
        }
    }, ThemeBeta = {
        name: "ThemeBeta",
        leftPanel: {
            textColor: {"color": "#fff"},
            userDetailsColor: {"background-color": "#6200EA"},
            chatListColor: {"background-color": "#7C4DFF"},
            chatListHoverColor: {"background-color": "#B388FF", "border-color": "#651FFF"},
            chatListHoverClear: {"background-color": "#7C4DFF", "border-color": "#7C4DFF"},
            scrollBarColor: {"background-color": "#651FFF"},
            scrollBarBGColor: {"background-color": "#7C4DFF"}
        }
    }, ThemeGamma = {
        name: "ThemeGamma",
        leftPanel: {
            textColor: {"color": "#fff"},
            userDetailsColor: {"background-color": "#C51162"},
            chatListColor: {"background-color": "#FF4081"},
            chatListHoverColor: {"background-color": "#F50057", "border-color": "#FF80AB"},
            chatListHoverClear: {"background-color": "#FF4081", "border-color": "#FF4081"},
            scrollBarColor: {"background-color": "#651FFF"},
            scrollBarBGColor: {"background-color": "#FF4081"}
        }
    }, ThemeDelta = {
        name: "ThemeDelta",
        leftPanel: {
            textColor: {"color": "#fff"},
            userDetailsColor: {"background-color": "#00C853"},
            chatListColor: {"background-color": "#69F0AE"},
            chatListHoverColor: {"background-color": "#00E676", "border-color": "#B9F6CA"},
            chatListHoverClear: {"background-color": "#69F0AE", "border-color": "#69F0AE"},
            scrollBarColor: {"background-color": "#651FFF"},
            scrollBarBGColor: {"background-color": "#69F0AE"}
        }
    }, ZChatTemplate = '<div id="theme_Wrap" style="/* display: none; */position: absolute;right: 75px;top: 10px;">' +
        '<section class="zchat-theme">' +
        '<ul>' +
        '<li><span class="theme-circle alpha" data-theme="ThemeAlpha"></span></li>' +
        '<li><span class="theme-circle beta" data-theme="ThemeBeta"></span></li>' +
        '<li><span class="theme-circle gamma" data-theme="ThemeGamma"></span></li>' +
        '<li><span class="theme-circle delta" data-theme="ThemeDelta"></span></li>' +
        '</ul>' +
        '</section>' +
        '</div>';


    ZChatTheme.Themes.push(ThemeAlpha);
    ZChatTheme.Themes.push(ThemeBeta);
    ZChatTheme.Themes.push(ThemeGamma);
    ZChatTheme.Themes.push(ThemeDelta);

    ZChatTheme.DOMStructure = {
        leftPanel: {
            textColor: ".zcbdytitle",
            userDetailsColor: ".chatheader",
            chatListColor: ".contactslist",
            chatListHoverColor: ".contactslist .chatsel",
            scrollBarColor: "section.zcleftsidebar ::-webkit-scrollbar",
            scrollBarBGColor: "::-webkit-scrollbar"
        }
    };


    //Optional variable declaration
    ZChatTheme.defaultTheme = ZChatTheme.ThemeAlpha;

    //Closure function declaration
    ZChatTheme.init = function () {
        $("#ztb-android").before(ZChatTemplate);

        $("body").on("click", ".theme-circle", function (event) {

            $.each(ZChatTheme.Themes, function (index, theme) {
                if ($(event.target).data("theme") === theme.name) {
                    var themeAsString = JSON.stringify(theme);
                    ZChatTheme.setDataLocally("currentTheme", themeAsString);
                    ZChatTheme.renderTheme();
                }
            });
        });

        $("body").on("click", ".zcuserstatus:not(.zcmorechl)", function () {
            var themeName = ZChatTheme.getCurrentTheme(),
                hoverClassName = themeName.name + "Hover";

            $(this).removeAttr("style");
            $(this).addClass(hoverClassName);
        });
    };

    ZChatTheme.clearThemeHoverStyle = function () {
        $(".ThemeAlphaHover").removeClass("ThemeAlphaHover");
        $(".ThemeBetaHover").removeClass("ThemeBetaHover");
        $(".ThemeGammaHover").removeClass("ThemeGammaHover");
        $(".ThemeDeltaHover").removeClass("ThemeDeltaHover");
    };

    ZChatTheme.setDataLocally = function (key, value) {
        if (ZChatTheme.canIAccessLocalStorage) {
            localStorage[key] = value;
        }
    };

    ZChatTheme.getDataFromLocalStorage = function (key) {
        if (ZChatTheme.canIAccessLocalStorage) {
            return (localStorage[key]) ? localStorage[key] : false;
        }
    };

    ZChatTheme.canIAccessLocalStorage = function () {
        return (localStorage) ? true : false;
    };

    ZChatTheme.getCurrentTheme = function () {
        var themeName = ZChatTheme.getDataFromLocalStorage("currentTheme"),
            CSSAttribute;

        if (themeName && typeof themeName === "string" && JSON.parse(themeName)) {
            themeName = JSON.parse(themeName);
        } else {
            themeName = ZChatTheme.Themes[0];
        }

        return themeName;
    };

    ZChatTheme.renderTheme = function () {

        var themeName = ZChatTheme.getCurrentTheme(),
            CSSAttribute;

        CSSAttribute = themeName.leftPanel;

        ZChatTheme.clearThemeHoverStyle();
        $(".zcuserstatus:not(.zcmorechl)").removeAttr("style");

        //Render Left panel
        $.each(ZChatTheme.DOMStructure.leftPanel, function (index, domElement) {
            $(domElement).css(CSSAttribute[index]);
        });

        $("body").on("mouseover", ".zcuserstatus:not(.zcmorechl)", function () {
            $(this).css(themeName.leftPanel.chatListHoverColor);
        });
        $("body").on("mouseleave", ".zcuserstatus:not(.zcmorechl)", function () {
            $(this).css(themeName.leftPanel.chatListHoverClear);
        });
    };

    return ZChatTheme;
})({});

ZChatTheme.init();
ZChatTheme.renderTheme();