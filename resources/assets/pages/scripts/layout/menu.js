var Menu = function() {
    var generateTopMenu = function(data){
        
        var menu = '<div class="hor-menu   hidden-sm hidden-xs">\n' +
            '  <ul class="nav navbar-nav">\n' +
            '    <li class="classic-menu-dropdown active" aria-haspopup="true">\n' +
            '      <a href="index.html"> Home <span class="selected"> </span> </a>\n' +
            '    </li>\n';
        var menuData  = JSON.parse(data);
        $.each(menuData,function(index,item){
            var className = '';
            var link ='<a href="javascript:;" data-url="'+item.url+'">' +
                '        <i class="'+item.icon+'"></i> ' +item.label +'</a>';
            if(item.items != undefined){
                className = 'classic-menu-dropdown';
                link ='<a href="javascript:;" data-hover="megamenu-dropdown" data-close-others="true">' +
                    '        <i class="'+item.icon+'"></i> ' +item.label +'' +
                    '<i class="fa fa-angle-down"></i></a>';
            }
            menu +='<li class="'+className+'" aria-haspopup="true">';
            menu += link;
            if(item.items != undefined){
                menu += '<ul class="dropdown-menu pull-left">';
                $.each(item.items,function(index,item){
                    className = '';
                    link ='<a href="javascript:;" data-url="'+item.url+'">' +
                        '        <i class="'+item.icon+'"></i> ' +item.label +'</a>';
                    if(item.items != undefined){
                        className = 'dropdown-submenu';
                        link ='<a href="javascript:;"  aria-haspopup="true">' +
                            '        <i class="'+item.icon+'"></i> ' +item.label +'' +
                            '</a>';
                    }
                    menu +='<li class="'+className+'" aria-haspopup="true">';
                    menu += link;
                    if(item.items != undefined){
                        menu += '<ul class="dropdown-menu pull-left">';
                        $.each(item.items,function(index,item){
                            className = '';
                            link ='<a href="javascript:;" data-url="'+item.url+'">' +
                                '        <i class="'+item.icon+'"></i> ' +item.label +'</a>';
                            if(item.items != undefined){
                                className = 'dropdown-submenu';
                                link ='<a href="javascript:;"   aria-haspopup="true">' +
                                    '        <i class="'+item.icon+'"></i> ' +item.label +'' +
                                    '</a>';
                            }
                            menu +='<li class="'+className+'" aria-haspopup="true">';
                            menu += link;
                            if(item.items != undefined){
                                menu += '<ul class="dropdown-menu pull-left">';
                                $.each(item.items,function(index,item){
                                    className = '';
                                    link ='<a href="javascript:;" data-url="'+item.url+'">' +
                                        '        <i class="'+item.icon+'"></i> ' +item.label +'</a>';
                                    if(item.items != undefined){
                                        className = 'dropdown-submenu';
                                        link ='<a href="javascript:;"   aria-haspopup="true">' +
                                            '        <i class="'+item.icon+'"></i> ' +item.label +'' +
                                            '</a>';
                                    }
                                    menu +='<li class="'+className+'" aria-haspopup="true">';
                                    menu += link;
                                    if(item.items != undefined){
                                        menu += '<ul class="dropdown-menu pull-left">';
                                        $.each(item.items,function(index,item){
                                            className = '';
                                            link ='<a href="javascript:;" data-url="'+item.url+'">' +
                                                '        <i class="'+item.icon+'"></i> ' +item.label +'</a>';
                                            if(item.items != undefined){
                                                className = 'dropdown-submenu';
                                                link ='<a href="javascript:;"   aria-haspopup="true">' +
                                                    '        <i class="'+item.icon+'"></i> ' +item.label +'' +
                                                    '</a>';
                                            }
                                            menu +='<li class="'+className+'" aria-haspopup="true">';
                                            menu += link;
                                            menu += '</li>';
                                        });
                                        menu += '</ul>'
                                    }
                                    menu += '</li>';
                                });
                                menu += '</ul>'
                            }
                            menu += '</li>';
                        });
                        menu += '</ul>'
                    }
                    menu += '</li>';

                });
                menu += '</ul>'
            }

            menu += '</li>';
        });

         menu +=   '</ul></div>';
        
        return menu;
    }
    var handleClick = function() {

        $('#leftBar .nav-link').click(function(){
            App.blockUI({
                target: '.page-content',
                message : 'Loading,Please wait ...'

            });
            $('#leftBar .nav-link').parent().removeClass("active");
            $('#leftBar .nav-link').parent().removeClass("open");
            $($('#leftBar .nav-link span.selected')).addClass("arrow");
            $($('#leftBar .nav-link span.selected')).removeClass("selected");
            $(this).parent().addClass("active open");
            $(this).parent().addClass("open");
            $($(this).find("span")[1]).removeClass("arrow");
            $($(this).find("span")[1]).addClass("selected");
            var activityCode = $(this).attr("data-activity");
            var menuId = $(this).attr("data-menuid");
            $.get(CONTEXT_PATH+"/app/getSubMenu/"+menuId+"/"+activityCode).done(function( data ) {
                App.unblockUI(".page-content");
                var links = new MenuLinks();
                 $("#topMenu").html(generateTopMenu(data));
                $(".hor-menu a[data-url]").on("click",function () {
                    $("#contentArea").html("");
                    var page = $(this).data("url");
                    App.blockUI({
                        target: '.page-content',
                        message : 'Loading,Please wait ...'

                    });
                    var that = this;
                    $.get(CONTEXT_PATH+page).done(function( data ) {
                         if(window.jqxWindow) {
                            if ($("[id$='Dlg']").length == 1) {
                                $("[id$='Dlg']").jqxWindow('destroy');
                            } else if ($("[id$='Dlg']").length > 1) {
                                $.each($("[id$='Dlg']"), function (index, item) {
                                     try {
                                        $(item).jqxWindow('destroy');
                                    }
                                    catch(err) {
                                        $(item).jqxWindow('destroy');
                                    }

                                })
                            }
                        }
                        $("#contentArea").html(data);
                        App.unblockUI(".page-content");
                    })
                })
                App.unblockUI(".page-content");
            });
            App.blockUI({
                target: '.page-content',
                message : 'Loading,Please wait ...'

            });
/*
            $.get(CONTEXT_PATH+"/screens/core/application-role/application-role.jsp").done(function( data ) {
                $("#contentArea").html(data);
                App.unblockUI(".page-content");
            })*/
        });
    }

    return {
        init: function() {
            handleClick();
       }

    };

}();
Menu.init();
