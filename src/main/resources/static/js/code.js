$(document).ready(function() {
    $("#add-code-exp").click(function() {
        var lastField = $("#code-block div:last");
        var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
        var fieldWrapper = $("<div class=\"code fieldwrapper\" id=\"field" + intId + "\"/>");
        fieldWrapper.data("idx", intId);
        if($("#code-exp option:selected").val() == "method") {
            var mName = $("<input type=\"text\" class=\"inputfield methodName\" placeholder = \"Method Name\" size=\"50\"  />");
            var mreturnVariable = $("<input type=\"text\" class=\"inputfield returnVar\" placeholder = \"Return Variable Name\" />");
            fieldWrapper.append(mName);
            fieldWrapper.append(mreturnVariable);
        }else if ($("#code-exp option:selected").val() == "assignment"){
            var lVar = $("<input type=\"text\" class=\"inputfield leftVar\"  placeholder = \"Left Variable\"/>");
            var rVar = $("<input type=\"text\" class=\"inputfield rightVar\" placeholder = \"Right Variable / Value\"/>");
            fieldWrapper.append(lVar);
            fieldWrapper.append(rVar);
        }else {
            var singleLineExp = $("<input type=\"text\" class=\"inputfield singlelineexp\" size=\"100\" placeholder = \"Single Line Expression\"/>");
            fieldWrapper.append(singleLineExp);
        }
        var removeButton = $("<input type=\"button\" class=\"remove\" value=\"-\" />");
        var NextLine = $("<br/>");
        removeButton.click(function() {
            $(this).parent().remove();
        });
        fieldWrapper.append(removeButton);
        fieldWrapper.append(NextLine);
        $("#code-block").append(fieldWrapper);

    });
});
