$(document).ready(function() {
    $("#generateYamlButton").click(function(){
        const data =createJsonFromFormData();
        console.log(data);
        $.ajax({
            url: "v1/mvelgenerator/generate",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function(data) {
                console.log("Success");
                $("#outputYaml").val(data);
            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback
                console.log("fail"+textStatus);
            }
        });
    });

    $("#add-code-exp").click(function() {
        var lastField = $("#code-block div:last");
        var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
        if($("#code-exp option:selected").val() == "method") {
            var fieldWrapper = $("<div class=\"code fieldwrapper methodCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var mName = $("<input type=\"text\" class=\"inputfield methodName\" placeholder = \"Method Name\" size=\"50\"  />");
            var mreturnVariable = $("<input type=\"text\" class=\"inputfield returnVar\" placeholder = \"Return Variable Name\" />");
            var paramVariable = $("<input type=\"text\" id=\"param0\" class=\"inputfield paramVar\" placeholder = \"Arg Name\" />");
            var addNewArgButton = $("<input type=\"button\" class=\"add\" value=\"Add Argument\" id=\"field" + intId + "\"/>");
            fieldWrapper.append(mName);
            fieldWrapper.append(mreturnVariable);
            fieldWrapper.append(paramVariable);
            fieldWrapper.append(addNewArgButton);
            addNewArgButton.click(function() {
                var paramId = $(".paramVar").length + 1;
                fieldWrapper.append($("<input type=\"text\" class=\"inputfield argVar\" placeholder = \"Arg Name\" id=\"param" + paramId + "\"/>"));
            });
        }else if ($("#code-exp option:selected").val() == "assignment"){
            var fieldWrapper = $("<div class=\"code fieldwrapper assignmentCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var lVar = $("<input type=\"text\" class=\"inputfield leftVar\"  placeholder = \"Left Variable\"/>");
            var rVar = $("<input type=\"text\" class=\"inputfield rightVar\" placeholder = \"Right Variable / Value\"/>");
            fieldWrapper.append(lVar);
            fieldWrapper.append(rVar);
        }else {
            var fieldWrapper = $("<div class=\"code fieldwrapper sleCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var singleLineExp = $("<input type=\"text\" class=\"inputfield singlelineexp\" size=\"100\" placeholder = \"Single Line Expression\"/>");
            fieldWrapper.append(singleLineExp);
        }
        var removeButton = $("<input type=\"button\" class=\"remove\" value=\"Remove Expression\" />");
        var NextLine = $("<br/>");
        removeButton.click(function() {
            $(this).parent().remove();
        });
        fieldWrapper.append(removeButton);
        fieldWrapper.append(NextLine);
        $("#code-block").append(fieldWrapper);
    });


    $("#add-code-exp2").on("click", (function() {
        var lastField = $("#code-block2 div:last");
        var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
        if($("#code-exp2 option:selected").val() == "method") {
            var fieldWrapper = $("<div class=\"code fieldwrapper methodCont\" id=\"field2" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var mName = $("<input type=\"text\" class=\"inputfield methodName\" placeholder = \"Method Name\" size=\"50\"  />");
            var mreturnVariable = $("<input type=\"text\" class=\"inputfield returnVar\" placeholder = \"Return Variable Name\" />");
            var paramVariable = $("<input type=\"text\" id=\"param0\" class=\"inputfield paramVar\" placeholder = \"Arg Name\" />");
            var addNewArgButton = $("<input type=\"button\" class=\"add\" value=\"Add Argument\" id=\"field2" + intId + "\"/>");
            fieldWrapper.append(mName);
            fieldWrapper.append(mreturnVariable);
            fieldWrapper.append(paramVariable);
            fieldWrapper.append(addNewArgButton);
            addNewArgButton.click(function() {
                var paramId = $(".paramVar").length + 1;
                fieldWrapper.append($("<input type=\"text\" class=\"inputfield argVar\" placeholder = \"Arg Name\" id=\"param" + paramId + "\"/>"));
            });
        }else if ($("#code-exp2 option:selected").val() == "assignment"){
            var fieldWrapper = $("<div class=\"code fieldwrapper assignmentCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var lVar = $("<input type=\"text\" class=\"inputfield leftVar\"  placeholder = \"Left Variable\"/>");
            var rVar = $("<input type=\"text\" class=\"inputfield rightVar\" placeholder = \"Right Variable / Value\"/>");
            fieldWrapper.append(lVar);
            fieldWrapper.append(rVar);
        }else {
            var fieldWrapper = $("<div class=\"code fieldwrapper sleCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var singleLineExp = $("<input type=\"text\" class=\"inputfield singlelineexp\" size=\"100\" placeholder = \"Single Line Expression\"/>");
            fieldWrapper.append(singleLineExp);
        }
        var removeButton = $("<input type=\"button\" class=\"remove\" value=\"Remove Expression\" />");
        var NextLine = $("<br/>");
        removeButton.click(function() {
            $(this).parent().remove();
        });
        fieldWrapper.append(removeButton);
        fieldWrapper.append(NextLine);
        $("#code-block2").append(fieldWrapper);
    }));
});

function createJsonFromFormData(){
    var fields = $("#code-block").children("div");
    var methods = [];
    var assignments = [];
    var expressions = [];
    for(var i=0; i < fields.length; i++){
        if($(fields[i]).hasClass("methodCont")){
            var methodObj = {};
            var arguments = [];
            var inputs = $(fields[i]).children(".inputfield");
            for(var j=0; j < inputs.length; j++){
                if($(inputs[j]).hasClass("methodName")){
                    methodObj.methodName = $(inputs[j]).val();
                } else if($(inputs[j]).hasClass("returnVar")){
                    methodObj.returnVariable = $(inputs[j]).val();
                } else{
                    arguments.push($(inputs[j]).val());
                    methodObj.arguments = arguments;
                }
            }
            methods.push(methodObj);
        } else if($(fields[i]).hasClass("assignmentCont")){
            var assignmentObj = {};
            var inputs = $(fields[i]).children(".inputfield");
            for(var j=0; j < inputs.length; j++){
                if($(inputs[j]).hasClass("leftVar")){
                    assignmentObj.name = $(inputs[j]).val();
                } else if($(inputs[j]).hasClass("rightVar")){
                    assignmentObj.value = $(inputs[j]).val();
                }
            }
            assignments.push(assignmentObj);
        } else {
            var expressionObj = {};
            var inputs = $(fields[i]).children(".inputfield");
            for(var j=0; j < inputs.length; j++){
                if($(inputs[j]).hasClass("singlelineexp")){
                    expressions.push($(inputs[j]).val());
                }
            }
        }
    }
    //
    // var fields = $("#code-block2").children("div");
    // var methodsExecute = [];
    // var assignmentsExecute = [];
    // var expressionsExecute = [];
    // for(var i=0; i < fields.length; i++){
    //     if($(fields[i]).hasClass("methodCont")){
    //         var methodObj = {};
    //         var arguments = [];
    //         var inputs = $(fields[i]).children(".inputfield");
    //         for(var j=0; j < inputs.length; j++){
    //             if($(inputs[j]).hasClass("methodName")){
    //                 methodObj.methodName = $(inputs[j]).val();
    //             } else if($(inputs[j]).hasClass("returnVar")){
    //                 methodObj.returnVariable = $(inputs[j]).val();
    //             } else{
    //                 arguments.push($(inputs[j]).val());
    //                 methodObj.arguments = arguments;
    //             }
    //         }
    //         methodsExecute.push(methodObj);
    //     } else if($(fields[i]).hasClass("assignmentCont")){
    //         var assignmentObj = {};
    //         var inputs = $(fields[i]).children(".inputfield");
    //         for(var j=0; j < inputs.length; j++){
    //             if($(inputs[j]).hasClass("leftVar")){
    //                 assignmentObj.leftVar = $(inputs[j]).val();
    //             } else if($(inputs[j]).hasClass("rightVar")){
    //                 assignmentObj.returnVariable = $(inputs[j]).val();
    //             }
    //         }
    //         assignmentsExecute.push(assignmentObj);
    //     } else {
    //         var expressionObj = {};
    //         var expressionValue = $(".singlelineexp").val();
    //         expressionObj.expression = expressionValue;
    //         expressionsExecute.push(expressionObj);
    //     }
    // }

    return {
        "code": {
            "methods": methods,
            "assignments": assignments,
            "expressions": expressions
        }
        // ,
        // "execute": {
        //     "methods": methodsExecute,
        //     "assignments": assignmentsExecute,
        //     "expressions": expressionsExecute
        // },
    }
}

