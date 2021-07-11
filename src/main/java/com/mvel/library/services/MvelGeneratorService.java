package com.mvel.library.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mvel.library.model.*;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
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
            mvelBuilder.append("@code{").append(getCodeString(input.getCode())).append("}");
        }
        if (input.getExecute() != null) {
            if (input.getExecute().getType() == ExecutionType.EXPRESSIONS) {
                MvelBasicTemplate basicTemplate = input.getExecute().getExpressions();
                mvelBuilder.append("@{").append(getCodeString(basicTemplate)).append("}");
            } else if (input.getExecute().getType() == ExecutionType.IF_ELSE) {
                IFExpression ifExpression = input.getExecute().getIfExpression();
                mvelBuilder.append(getIfMvelExpression(ifExpression));
            } else {
                new ValidationException("Not a valid type");
            }
        }
        return mvelBuilder.toString();

    }

    //    private StringBuilder getExpressionsString(ExpressionConfiguration expression) {
//        System.out.println("starting switch condition");
//        StringBuilder executeBuilder = new StringBuilder();
//            if (expression.getType().equals(ExecutionType.RETURN)) {
//                String returnVariable = (String) expression.getObject();
//                executeBuilder.append("@{").append("return ").append(returnVariable).append("}");
//            } else if (expression.getType().equals(ExecutionType.IF_ELSE)) {
//                IFExpression ifExpressions = mapper.convertValue(expression.getObject(),IFExpression.class);
//                executeBuilder.append(getIfMvelExpression(ifExpressions));
//            }
//        return executeBuilder;
//    }
//
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

        if (exp.isHasInnerIf() && exp.getInnerIfExpression() != null) {
            ifMvelBuilder.append(getIfMvelExpression(exp.getNestedIf()));
        }
        ifMvelBuilder.append("@{").append(getCodeString(exp.getInnerIfExpression())).append("}");

        if (exp.isHasElseBlock()) {
            ifMvelBuilder.append("@else{}").append("@{").append(getCodeString(exp.getInnerElseExpression())).append("}");
        }
        ifMvelBuilder.append("@end{}");
        return ifMvelBuilder;
    }

    private StringBuilder getExpressions(List<Expression> object) {
        return new StringBuilder();
    }

    public StringBuilder getCodeString(MvelBasicTemplate basicTemplate) {
        if(basicTemplate == null) return null;
        StringBuilder builder = new StringBuilder();
        if (basicTemplate.getMethods() != null) {
            basicTemplate.getMethods().forEach(
                    method -> {
                        appendMethod(method, builder);
                    }
            );
        }
        if (basicTemplate.getAssignments() != null) {
            basicTemplate.getAssignments().forEach(
                    variable -> {
                        appendVariable(variable, builder);
                    }
            );
        }
        if (basicTemplate.getExpressions() != null) {
            basicTemplate.getExpressions().forEach(
                    variable -> {
                        builder.append(variable).append(";");
                    }
            );
        }
        return builder;
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
