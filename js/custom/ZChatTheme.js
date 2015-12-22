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

    var ThemeDefault = {
            name: "ThemeDefault"
        },
        ThemeAlpha = {
            name: "ThemeAlpha",
            leftPanel: {
                textColor: {"color": "#fff"},
                userDetailsColor: {"background-color": "#2962FF"},
                chatListColor: {"background-color": "#448AFF"},
                friendRequest: {"background-color": "#448AFF"},
                statusDropDownList: {"background-color": "#448AFF"},
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
                friendRequest: {"background-color": "#7C4DFF"},
                statusDropDownList: {"background-color": "#7C4DFF"},
                chatListHoverColor: {"background-color": "#B388FF", "border-color": "#651FFF"},
                chatListHoverClear: {"background-color": "#7C4DFF", "border-color": "#7C4DFF"},
                scrollBarColor: {"background-color": "#651FFF"},
                scrollBarBGColor: {"background-color": "#7C4DFF"}
            }
        }, ThemeGamma = {
            name: "ThemeGamma",
            leftPanel: {
                textColor: {"color": "#fff"},
                userDetailsColor: {"background-color": "#AD1457"},
                chatListColor: {"background-color": "#C51162"},
                friendRequest: {"background-color": "#C51162"},
                statusDropDownList: {"background-color": "#C51162"},
                chatListHoverColor: {"background-color": "#D81B60", "border-color": "#D81B60"},
                chatListHoverClear: {"background-color": "#C51162", "border-color": "#C51162"},
                scrollBarColor: {"background-color": "#651FFF"},
                scrollBarBGColor: {"background-color": "#C51162"}
            }
        }, ThemeDelta = {
            name: "ThemeDelta",
            leftPanel: {
                textColor: {"color": "#fff"},
                userDetailsColor: {"background-color": "#33691E"},
                chatListColor: {"background-color": "#689F38"},
                friendRequest: {"background-color": "#689F38"},
                statusDropDownList: {"background-color": "#689F38"},
                chatListHoverColor: {"background-color": "#9CCC65", "border-color": "#9CCC65"},
                chatListHoverClear: {"background-color": "#689F38", "border-color": "#689F38"},
                scrollBarColor: {"background-color": "#33691E"},
                scrollBarBGColor: {"background-color": "#689F38"}
            }
        }, ZChatTemplate = '<div id="theme_Wrap" style="position: absolute;right: 100px;top: 12px;">' +
            '<section class="zchat-theme">' +
            '<ul>' +
            '<li>' +
            '<div class="theme-circle forbidden-sign" data-theme="ThemeDefault">' +
            '<span class="forbidden-cross"></span>' +
            '</div>' +
            '</li>' +
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
            friendRequest: ".zcfrntrgstmn",
            statusDropDownList: "#stdropdownlist",
            chatListHoverColor: ".contactslist .chatsel",
            scrollBarColor: "section.zcleftsidebar ::-webkit-scrollbar",
            scrollBarBGColor: "::-webkit-scrollbar"
        }
    };


    //Optional variable declaration
    ZChatTheme.defaultTheme = ZChatTheme.ThemeAlpha;

    //Closure function declaration
    ZChatTheme.init = function () {
        var themeAsString;

        $("#ztb-android").before(ZChatTemplate);
        $("body").on("click", ".theme-circle", function (event) {

            var cnt = 0;
            $.each(ZChatTheme.Themes, function (index, theme) {
                if ($(event.target).data("theme") === theme.name) {
                    themeAsString = JSON.stringify(theme);
                    ZChatTheme.setDataLocally("currentTheme", themeAsString);
                    ZChatTheme.renderTheme();
                    cnt += 1;
                }
            });

            if (cnt === 0) {
                ZChatTheme.setDataLocally("currentTheme", ThemeDefault);
                window.location.reload();
            }
        });

        $("body").on("click", ".zcuserstatus:not(.zcmorechl)", function () {
            var currentTheme = ZChatTheme.getCurrentTheme(),
                hoverClassName = currentTheme.name + "Hover";

            $("." + hoverClassName).removeAttr("style").removeClass(hoverClassName);
            $(".zcuserstatus").attr("style", currentTheme.leftPanel.chatListHoverColor);
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

        var Theme = ZChatTheme.getCurrentTheme(),
            CSSAttribute;

        CSSAttribute = Theme.leftPanel;

        if (Theme.name !== "ThemeDefault") {
            ZChatTheme.clearThemeHoverStyle();
            $(".zcuserstatus:not(.zcmorechl)").removeAttr("style");

            //Render Left panel
            $.each(ZChatTheme.DOMStructure.leftPanel, function (index, domElement) {
                $(domElement).css(CSSAttribute[index]);
            });

            $("body").on("mouseover", ".zcuserstatus:not(.zcmorechl)", function () {
                $(this).css(Theme.leftPanel.chatListHoverColor);
            });
            $("body").on("mouseleave", ".zcuserstatus:not(.zcmorechl)", function () {
                $(this).css(Theme.leftPanel.chatListHoverClear);
            });
        } else {
            ZChatTheme.setDataLocally("currentTheme", ThemeDefault);
            window.location.reload();
        }
    };

    return ZChatTheme;
})({});

ZChatTheme.init();
ZChatTheme.renderTheme();