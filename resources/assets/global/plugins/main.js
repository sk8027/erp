
require.config({
    paths: {
        "jQuery": "jqwidgets/scripts/jquery-1.11.1.min.js",
         "jqxcore": "qwidgets/jqwidgets/jqxcore",
        "jqxdata" :"jqwidgets/jqwidgets/jqxdata",
        "jqxbuttons": "jqwidgets/jqwidgets/jqxbuttons",
        "jqxscrollbar": "jqwidgets/jqwidgets/jqxscrollbar",
        "jqxmenu": "jqwidgets/jqwidgets/jqxmenu",
        "jqxcheckbox" : "jqwidgets/jqwidgets/jqxcheckbox",
        "jqxlistbox" : "jqwidgets/jqwidgets/jqxlistbox",
        "jqxdropdownlist" : "jqwidgets/jqwidgets/jqxdropdownlist",
        "jqxgrid" : "jqwidgets/jqwidgets/jqxgrid",
        "jqxgrid.sort" : "jqwidgets/jqwidgets/jqxgrid.sort",
        "jqxgrid.pager" : "jqwidgets/jqwidgets/jqxgrid.pager",
        "jqxgrid.selection" : "jqwidgets/jqwidgets/jqxgrid.selection",
        "jqxgrid.edit" : "jqwidgets/jqwidgets/jqxgrid.edit",
        "jqxgrid.filter" : "jqwidgets/jqwidgets/jqxgrid.filter",
        "jqxtree": "jqwidgets/jqwidgets/jqxtree"
    },
    shim: {
        "jqxcore": {
            export: "$",
            deps: ['jQuery']
        },
        "jqxbuttons": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxdata": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxscrollbar": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxmenu": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxcheckbox": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxslistbox": {
            export: "$",
            deps: ['jQuery', "jqxcore","jqxdata"]
        },
        "jqxsdropdownlist": {
            export: "$",
            deps: ['jQuery', "jqxcore","jqxdata"]
        },
        "jqxsgrid": {
            export: "$",
            deps: ['jQuery', "jqxcore","jqxdata","jqxgrid.sort",,"jqxgrid.pager",,"jqxgrid.selection",,"jqxgrid.edit",,"jqxgrid.filter"]
        },
        "jqxtree": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        }
    }
});
