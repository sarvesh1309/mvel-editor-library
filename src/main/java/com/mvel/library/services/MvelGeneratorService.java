package com.mvel.library.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mvel.library.model.*;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;


@Service
public class MvelGeneratorService {

    ObjectMapper mapper = new ObjectMapper();

    public String generateMvel(Input input) {
        if (input == null) {
            return null;
        }
        StringBuilder mvelBuilder = new StringBuilder();
        if (input.getCode() != null) {
            mvelBuilder.append(getCodeString(input));
        }
        if (input.getExecute() != null && input.getExecute().getExpressions() != null) {
            input.getExecute().getExpressions().forEach(exp -> {
                mvelBuilder.append(getExpressionsString(exp));
            });
        }
        return mvelBuilder.toString();

    }

    private StringBuilder getExpressionsString(ExpressionConfiguration expression) {
        System.out.println("starting switch condition");
        StringBuilder executeBuilder = new StringBuilder();
            if (expression.getType().equals(ExpressionType.RETURN)) {
                String returnVariable = (String) expression.getObject();
                executeBuilder.append("@{").append("return ").append(returnVariable).append("}");
            } else if (expression.getType().equals(ExpressionType.IF_ELSE)) {
                IFExpression ifExpressions = mapper.convertValue(expression.getObject(),IFExpression.class);
                executeBuilder.append(getIfMvelExpression(ifExpressions));
            }
        return executeBuilder;
    }

    private StringBuilder getIfMvelExpression(IFExpression exp) {
        if (exp == null) return new StringBuilder();
        StringBuilder ifMvelBuilder = new StringBuilder();
        List<Condition> conditions = exp.getConditions();
        int i = 0;
        ifMvelBuilder.append("@if{");
        do {
            Condition condition = conditions.get(i);
            ifMvelBuilder.append(condition.getLeftExp()).append(" ").append(condition.getOperator().getValue()).append(" ").append(condition.getRightExp());
        } while (conditions.get(i++).isHasNextCondition());
        ifMvelBuilder.append("}");

        ExpressionConfiguration innerIfExpression = exp.getInnerIfExpression();
        ifMvelBuilder.append(getExpressionsString(innerIfExpression));
        if (exp.isHasElseBlock()) {
            ifMvelBuilder.append("@else{}").append(getExpressionsString(exp.getInnerElseExpression()));
        }
        ifMvelBuilder.append("@end{}");
        return ifMvelBuilder;
    }

    private StringBuilder getExpressions(List<Expression> object) {
        return new StringBuilder();
    }

    public StringBuilder getCodeString(Input input) {
        StringBuilder builder = new StringBuilder("@code{");
        if (input.getCode().getMethods() != null) {
            input.getCode().getMethods().forEach(
                    method -> {
                        appendMethod(method, builder);
                    }
            );
        }
        if (input.getCode().getAssignments() != null) {
            input.getCode().getAssignments().forEach(
                    variable -> {
                        appendVariable(variable, builder);
                    }
            );
        }
        return builder.append("}");
    }

    private void appendVariable(Assignment assignment, StringBuilder builder) {
        builder.append(assignment.getName()).append(" = ");
        builder.append(assignment.getValue());
        builder.append(";");
    }

    private void appendMethod(Method method, StringBuilder builder) {
        builder.append(method.getReturnVariable()).append(" = ").append(method.getMethodName()).append("(");
        method.getArguments().forEach(
                argument -> {
                    builder.append(argument).append(",");
                }
        );
        builder.deleteCharAt(builder.length() - 1);
        builder.append("); ");
    }
}
