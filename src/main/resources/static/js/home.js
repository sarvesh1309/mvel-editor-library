$(document).ready(function () {
    $("#execute-exp-next").click(function () {
        if ($("#execute-exp-type").val() == "EXPRESSIONS") {
            document.getElementById("executeHtmlContent-expression").style.display = "block";
            document.getElementById("executeHtmlContent-if-Else").style.display = "none";
            //document.getElementById("executeHtmlContent-if-Else").innerHTML = "";

        } else {
            document.getElementById("executeHtmlContent-if-Else").style.display = "block";
            document.getElementById("executeHtmlContent-expression").style.display = "none";
           // document.getElementById("executeHtmlContent-expression").innerHTML = "";
        }
    });
    $("#generateYamlButton").click(function () {
        const data = createJsonFromFormData();
        console.log(data);
        $.ajax({
            url: "v1/mvelgenerator/generate",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (data) {
                console.log("Success");
                $("#outputYaml").val(data);
            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback
                console.log("fail" + textStatus);
            }
        });
    });

    $("#add-code-exp").click(function () {
        var lastField = $("#code-block div:last");
        var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
        if ($("#code-exp option:selected").val() == "method") {
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
            addNewArgButton.click(function () {
                var paramId = $(".paramVar").length + 1;
                fieldWrapper.append($("<input type=\"text\" class=\"inputfield argVar\" placeholder = \"Arg Name\" id=\"param" + paramId + "\"/>"));
            });
        } else if ($("#code-exp option:selected").val() == "assignment") {
            var fieldWrapper = $("<div class=\"code fieldwrapper assignmentCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var lVar = $("<input type=\"text\" class=\"inputfield leftVar\"  placeholder = \"Left Variable\"/>");
            var rVar = $("<input type=\"text\" class=\"inputfield rightVar\" placeholder = \"Right Variable / Value\"/>");
            fieldWrapper.append(lVar);
            fieldWrapper.append(rVar);
        } else {
            var fieldWrapper = $("<div class=\"code fieldwrapper sleCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var singleLineExp = $("<input type=\"text\" class=\"inputfield singlelineexp\" size=\"100\" placeholder = \"Single Line Expression\"/>");
            fieldWrapper.append(singleLineExp);
        }
        var removeButton = $("<input type=\"button\" class=\"remove\" value=\"Remove Expression\" />");
        var NextLine = $("<br/>");
        removeButton.click(function () {
            $(this).parent().remove();
        });
        fieldWrapper.append(removeButton);
        fieldWrapper.append(NextLine);
        $("#code-block").append(fieldWrapper);
    });

    $("#add-condition").on("click", (function () {
        var lastField = $("#condition-block div:last");
        lastField.find('input[type="checkbox"]').get(0).checked = true;
        // var operatorField = lastField.find("#conditionOperator");
        // operatorField.get(0).style.display = "block";
        // lastField.getElementsByClassName("condition_operator").style.display = "block";
        var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
        var fieldWrapper = $("<div class=\"execute fieldwrapper conditionCont\" id=\"condition-field" + intId + "\"/>");
        fieldWrapper.data("idx", intId);
        var conditionLeft = $("<input type=\"text\" class=\"inputfield conditionLeft\" placeholder = \"left Var\" size=\"50\"  />");
        var operator = $("<select class=\"inputfield operator\">\n" +
            "                                <option value=\"EQUALS\">EQUALS</option>\n" +
            "                                <option value=\"NOT_EQUALS\">NOT_EQUALS</option>\n" +
            "                            </select>");
        var conditionRight = $("<input type=\"text\" class=\"inputfield conditionRight\" placeholder = \"right Var\" size=\"50\"  />");
        var check = $("<input type=\"checkbox\" class=\"inputfield conditionMore\">");
        var conditionOperator = $("<select id=\"conditionOperator\" class=\"conditionOperator\">\n" +
            "                                        <option value=\"OR\">OR</option>\n" +
            "                                        <option value=\"AND\">AND</option>\n" +
            "                                    </select>");
        // var button = $("<input type=\"button\" value=\" Add Condition\" id=\"add-condition\" />");
        var NextLine = $("<br/>");
        fieldWrapper.append(conditionLeft);
        fieldWrapper.append(operator);
        fieldWrapper.append(conditionRight);
        fieldWrapper.append(check);
        fieldWrapper.append(conditionOperator);
        fieldWrapper.append(NextLine);

        $("#condition-block").append(fieldWrapper);

    }));

    $("#add-execute-else-block").on("click", (function () {
        var lastField = $("#else-block div:last");
        var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;

        if ($("#execute-exp-else option:selected").val() == "method") {
            var fieldWrapper = $("<div class=\"execute fieldwrapper methodCont\" id=\"field2" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var mName = $("<input type=\"text\" class=\"inputfield methodName\" placeholder = \"Method Name\" size=\"50\"  />");
            var mreturnVariable = $("<input type=\"text\" class=\"inputfield returnVar\" placeholder = \"Return Variable Name\" />");
            var paramVariable = $("<input type=\"text\" id=\"param0\" class=\"inputfield paramVar\" placeholder = \"Arg Name\" />");
            var addNewArgButton = $("<input type=\"button\" class=\"add\" value=\"Add Argument\" id=\"field2" + intId + "\"/>");
            fieldWrapper.append(mName);
            fieldWrapper.append(mreturnVariable);
            fieldWrapper.append(paramVariable);
            fieldWrapper.append(addNewArgButton);
            addNewArgButton.click(function () {
                var paramId = $(".paramVar").length + 1;
                fieldWrapper.append($("<input type=\"text\" class=\"inputfield argVar\" placeholder = \"Arg Name\" id=\"param" + paramId + "\"/>"));
            });
        } else if ($("#execute-exp-else option:selected").val() == "assignment") {
            var fieldWrapper = $("<div class=\"execute fieldwrapper assignmentCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var lVar = $("<input type=\"text\" class=\"inputfield leftVar\"  placeholder = \"Left Variable\"/>");
            var rVar = $("<input type=\"text\" class=\"inputfield rightVar\" placeholder = \"Right Variable / Value\"/>");
            fieldWrapper.append(lVar);
            fieldWrapper.append(rVar);
        } else {
            var fieldWrapper = $("<div class=\"execute fieldwrapper sleCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var singleLineExp = $("<input type=\"text\" class=\"inputfield singlelineexp\" size=\"100\" placeholder = \"Single Line Expression\"/>");
            fieldWrapper.append(singleLineExp);
        }
        var removeButton = $("<input type=\"button\" class=\"remove\" value=\"Remove Expression\" />");
        var NextLine = $("<br/>");
        removeButton.click(function () {
            $(this).parent().remove();
        });
        fieldWrapper.append(removeButton);
        fieldWrapper.append(NextLine);
        $("#else-block").append(fieldWrapper);
    }));

    $("#add-execute-if-block").on("click", (function () {
        var lastField = $("#if-block div:last");
        var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;

        if ($("#execute-exp-if option:selected").val() == "method") {
            var fieldWrapper = $("<div class=\"execute fieldwrapper methodCont\" id=\"field2" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var mName = $("<input type=\"text\" class=\"inputfield methodName\" placeholder = \"Method Name\" size=\"50\"  />");
            var mreturnVariable = $("<input type=\"text\" class=\"inputfield returnVar\" placeholder = \"Return Variable Name\" />");
            var paramVariable = $("<input type=\"text\" id=\"param0\" class=\"inputfield paramVar\" placeholder = \"Arg Name\" />");
            var addNewArgButton = $("<input type=\"button\" class=\"add\" value=\"Add Argument\" id=\"field2" + intId + "\"/>");
            fieldWrapper.append(mName);
            fieldWrapper.append(mreturnVariable);
            fieldWrapper.append(paramVariable);
            fieldWrapper.append(addNewArgButton);
            addNewArgButton.click(function () {
                var paramId = $(".paramVar").length + 1;
                fieldWrapper.append($("<input type=\"text\" class=\"inputfield argVar\" placeholder = \"Arg Name\" id=\"param" + paramId + "\"/>"));
            });
        } else if ($("#execute-exp-if option:selected").val() == "assignment") {
            var fieldWrapper = $("<div class=\"execute fieldwrapper assignmentCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var lVar = $("<input type=\"text\" class=\"inputfield leftVar\"  placeholder = \"Left Variable\"/>");
            var rVar = $("<input type=\"text\" class=\"inputfield rightVar\" placeholder = \"Right Variable / Value\"/>");
            fieldWrapper.append(lVar);
            fieldWrapper.append(rVar);
        } else {
            var fieldWrapper = $("<div class=\"execute fieldwrapper sleCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var singleLineExp = $("<input type=\"text\" class=\"inputfield singlelineexp\" size=\"100\" placeholder = \"Single Line Expression\"/>");
            fieldWrapper.append(singleLineExp);
        }
        var removeButton = $("<input type=\"button\" class=\"remove\" value=\"Remove Expression\" />");
        var NextLine = $("<br/>");
        removeButton.click(function () {
            $(this).parent().remove();
        });
        fieldWrapper.append(removeButton);
        fieldWrapper.append(NextLine);
        $("#if-block").append(fieldWrapper);
    }));

    $("#add-expression-block").on("click", (function () {
        var lastField = $("#expression-block div:last");
        var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;

        if ($("#execute-exp option:selected").val() == "method") {
            var fieldWrapper = $("<div class=\"execute fieldwrapper methodCont\" id=\"field2" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var mName = $("<input type=\"text\" class=\"inputfield methodName\" placeholder = \"Method Name\" size=\"50\"  />");
            var mreturnVariable = $("<input type=\"text\" class=\"inputfield returnVar\" placeholder = \"Return Variable Name\" />");
            var paramVariable = $("<input type=\"text\" id=\"param0\" class=\"inputfield paramVar\" placeholder = \"Arg Name\" />");
            var addNewArgButton = $("<input type=\"button\" class=\"add\" value=\"Add Argument\" id=\"field2" + intId + "\"/>");
            fieldWrapper.append(mName);
            fieldWrapper.append(mreturnVariable);
            fieldWrapper.append(paramVariable);
            fieldWrapper.append(addNewArgButton);
            addNewArgButton.click(function () {
                var paramId = $(".paramVar").length + 1;
                fieldWrapper.append($("<input type=\"text\" class=\"inputfield argVar\" placeholder = \"Arg Name\" id=\"param" + paramId + "\"/>"));
            });
        } else if ($("#execute-exp option:selected").val() == "assignment") {
            var fieldWrapper = $("<div class=\"execute fieldwrapper assignmentCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var lVar = $("<input type=\"text\" class=\"inputfield leftVar\"  placeholder = \"Left Variable\"/>");
            var rVar = $("<input type=\"text\" class=\"inputfield rightVar\" placeholder = \"Right Variable / Value\"/>");
            fieldWrapper.append(lVar);
            fieldWrapper.append(rVar);
        } else {
            var fieldWrapper = $("<div class=\"execute fieldwrapper sleCont\" id=\"field" + intId + "\"/>");
            fieldWrapper.data("idx", intId);
            var singleLineExp = $("<input type=\"text\" class=\"inputfield singlelineexp\" size=\"100\" placeholder = \"Single Line Expression\"/>");
            fieldWrapper.append(singleLineExp);
        }
        var removeButton = $("<input type=\"button\" class=\"remove\" value=\"Remove Expression\" />");
        var NextLine = $("<br/>");
        removeButton.click(function () {
            $(this).parent().remove();
        });
        fieldWrapper.append(removeButton);
        fieldWrapper.append(NextLine);
        $("#expression-block").append(fieldWrapper);
    }));
});

function createJsonFromFormData() {
    var fields = $("#code-block").children("div");



    for (var i = 0; i < fields.length; i++) {
        if ($(fields[i]).hasClass("methodCont")) {
            var methodObj = {};
            var arguments = [];
            var inputs = $(fields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("methodName")) {
                    methodObj.methodName = $(inputs[j]).val();
                } else if ($(inputs[j]).hasClass("returnVar")) {
                    methodObj.returnVariable = $(inputs[j]).val();
                } else {
                    arguments.push($(inputs[j]).val());
                    methodObj.arguments = arguments;
                }
            }
            var methods = [];
            methods.push(methodObj);
        } else if ($(fields[i]).hasClass("assignmentCont")) {
            var assignmentObj = {};
            var inputs = $(fields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("leftVar")) {
                    assignmentObj.name = $(inputs[j]).val();
                } else if ($(inputs[j]).hasClass("rightVar")) {
                    assignmentObj.value = $(inputs[j]).val();
                }
            }
            var assignments = [];
            assignments.push(assignmentObj);
        } else {
            var lines = [];
            var expressionObj = {};
            var inputs = $(fields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("singlelineexp")) {
                    lines.push($(inputs[j]).val());
                }
            }
        }
    }
    var type = $("#execute-exp-type").val();
    // Expressions within execute block
    var fields = $("#expression-block").children("div");

    for (var i = 0; i < fields.length; i++) {
        if ($(fields[i]).hasClass("methodCont")) {
            var methodObj = {};
            var arguments = [];
            var inputs = $(fields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("methodName")) {
                    methodObj.methodName = $(inputs[j]).val();
                } else if ($(inputs[j]).hasClass("returnVar")) {
                    methodObj.returnVariable = $(inputs[j]).val();
                } else {
                    arguments.push($(inputs[j]).val());
                    methodObj.arguments = arguments;
                }
            }
            var methodsExecute = [];
            methodsExecute.push(methodObj);
        } else if ($(fields[i]).hasClass("assignmentCont")) {
            var assignmentObj = {};
            var inputs = $(fields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("leftVar")) {
                    assignmentObj.leftVar = $(inputs[j]).val();
                } else if ($(inputs[j]).hasClass("rightVar")) {
                    assignmentObj.returnVariable = $(inputs[j]).val();
                }
            }
            var assignmentsExecute = [];
            assignmentsExecute.push(assignmentObj);
        } else {
            var linesExecute = [];
            var expressionObj = {};
            var inputs = $(fields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("singlelineexp")) {
                    linesExecute.push($(inputs[j]).val());
                }
            }
        }
    }
    // if else within execute block
    var ifExpressionsObj = [];

    // condition block

    var conditionfields = $("#condition-block").children("div");
    for (var i = 0; i < conditionfields.length; i++) {
        if ($(conditionfields[i]).hasClass("conditionCont")) {
            var conditions = [];
            var conditionObj = {};
            var inputs = $(conditionfields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("conditionLeft")) {
                    conditionObj.leftExp = $(inputs[j]).val();
                } else if ($(inputs[j]).hasClass("conditionRight")) {
                    conditionObj.rightExp = $(inputs[j]).val();
                } else if ($(inputs[j]).hasClass("operator")) {
                    conditionObj.operator = $(inputs[j]).val();
                } else if ($(inputs[j]).hasClass("conditionMore")) {
                    conditionObj.hasNextCondition = $(inputs[j]).is(":checked") ? "true" : "false";
                } else if ($(inputs[j]).hasClass("conditionOperator")) {
                    conditionObj.nextConditionOperator = $(inputs[j]).val();
                }
            }
            conditions.push(conditionObj);
        }
    }
   //  inner if expression
    var iffields = $("#if-block").children("div");



    for (var i = 0; i < iffields.length; i++) {
        if ($(iffields[i]).hasClass("methodCont")) {
            var methodObj = {};
            var arguments = [];
            var inputs = $(iffields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("methodName")) {
                    methodObj.methodName = $(inputs[j]).val();
                } else if ($(inputs[j]).hasClass("returnVar")) {
                    methodObj.returnVariable = $(inputs[j]).val();
                } else {
                    arguments.push($(inputs[j]).val());
                    methodObj.arguments = arguments;
                }
            }
            var ifmethodsExecute = [];
            ifmethodsExecute.push(methodObj);
        } else if ($(iffields[i]).hasClass("assignmentCont")) {
            var assignmentObj = {};
            var inputs = $(iffields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("leftVar")) {
                    assignmentObj.leftVar = $(inputs[j]).val();
                } else if ($(inputs[j]).hasClass("rightVar")) {
                    assignmentObj.returnVariable = $(inputs[j]).val();
                }
            }
            var ifassignmentsExecute = [];
            ifassignmentsExecute.push(assignmentObj);
        } else {
            var iflinesExecute = [];
            var expressionObj = {};
            var inputs = $(iffields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("singlelineexp")) {
                    iflinesExecute.push($(inputs[j]).val());
                }
            }
        }
    }

    // inner else expression

    var elsefields = $("#else-block").children("div");


    for (var i = 0; i < elsefields.length; i++) {
        if ($(elsefields[i]).hasClass("methodCont")) {
            var methodObj = {};
            var arguments = [];
            var inputs = $(elsefields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("methodName")) {
                    methodObj.methodName = $(inputs[j]).val();
                } else if ($(inputs[j]).hasClass("returnVar")) {
                    methodObj.returnVariable = $(inputs[j]).val();
                } else {
                    arguments.push($(inputs[j]).val());
                    methodObj.arguments = arguments;
                }
            }
            var elsemethodsExecute = [];
            elsemethodsExecute.push(methodObj);
        } else if ($(elsefields[i]).hasClass("assignmentCont")) {
            var assignmentObj = {};
            var inputs = $(elsefields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("leftVar")) {
                    assignmentObj.leftVar = $(inputs[j]).val();
                } else if ($(inputs[j]).hasClass("rightVar")) {
                    assignmentObj.returnVariable = $(inputs[j]).val();
                }
            }
            var elseassignmentsExecute = [];
            elseassignmentsExecute.push(assignmentObj);
        } else {
            var elselinesExecute = [];
            var expressionObj = {};
            var inputs = $(elsefields[i]).children(".inputfield");
            for (var j = 0; j < inputs.length; j++) {
                if ($(inputs[j]).hasClass("singlelineexp")) {
                    elselinesExecute.push($(inputs[j]).val());
                }
            }

        }
    }


    return {
        "code": {
            "methods": methods,
            "assignments": assignments,
            "lines": lines
        }
        ,
        "execute": {
            "type": type,
            "expressions": {
                "methods": methodsExecute,
                "assignments": assignmentsExecute,
                "lines": linesExecute
            },
            "ifExpressions": [
                {
                    "innerIfExpression":{
                        "methods": ifmethodsExecute,
                        "assignments": ifassignmentsExecute,
                        "lines": iflinesExecute
                    },
                    "conditions":conditions,
                    "hasElseBlock":true,
                    "hasInnerIf":false,
                    "innerElseExpression":{
                        "methods": elsemethodsExecute,
                        "assignments": elseassignmentsExecute,
                        "lines": elselinesExecute
                    }
                }
            ]
        },
    }
}

