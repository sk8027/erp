var MenuLinks = (function(){
    var links =  new Object();
    function MenuLinks(){
        //links[101640] = "system/documents/document-header/document-header.jsp";
          links[101640] = "/screens/core/documents/document-header/document-header.jsp";

        links[101660] = "/screens/core/documents/doc-mapping/doc-mapping.jsp";
        links[103300] = "/screens/core/application-role/application-role.jsp";
    };
     MenuLinks.prototype.getLink= function (activityCode) {
        return links[activityCode];
    };


    return MenuLinks;
})();