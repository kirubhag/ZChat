/**
 * Created by WebStorm.
 * User: kirubha-2911
 * Date: 12/5/15
 * Time: 11:00 PM
 * Project: ZChat
 * File Name: handle
 */

var TEMPLATEPATH = "../../template/";//No I18N
Handlebars.getTemplate = function (folderName, fileName) {
    if (Handlebars.templates === undefined || Handlebars.templates[fileName] === undefined) {
        var url = (folderName != undefined && folderName.length != 0) ? TEMPLATEPATH + folderName + "/" + fileName + '.handlebars' : TEMPLATEPATH + fileName + '.handlebars';
        $.ajax({
            url: url,//No I18N
            dataType: "html",//No I18N
            success: function (data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[fileName] = Handlebars.compile(data);
            },
            async: false,
            cache: false
        });
    }
    return Handlebars.templates[fileName];
};

var Handle = (function (Handle) {
    Handle = (Handle) ? Handle : {};


    Handle.init = function () {
        $("body").on("click", ".theme-circle", function () {
            console.log("Theme Changed.");
            $.each(ZChatTheme.Themes, function (index, theme) {
                console.log("Theme Name: ", theme.name);
                if ($(this).data("theme") === theme.name) {
                    console.log("If");
                    ZChatTheme.renderTheme(theme);
                }
            });
        });
    };

    return Handle;
})({});

var ZChatThemeTemplate = Handlebars.getTemplate(undefined, 'ZChatTheme');//No I18N
$("body").append(ZChatThemeTemplate());

//Handle.init();