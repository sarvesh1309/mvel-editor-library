package com.mvel.library.services;

import com.mvel.library.model.*;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.List;


@Service
public class MvelGeneratorService {


    /**
     * @param input
     * @return
     */
    public String generateMvel(Input input) {
        if (input == null) {
            return null;
        }
        StringBuilder mvelBuilder = new StringBuilder();
        if (ObjectUtils.isNotEmpty(input.getCode())) {
            mvelBuilder.append("@code{").append(getCodeString(input.getCode())).append("}");
        }
        if (ObjectUtils.isNotEmpty(input.getExecute())) {
            if (input.getExecute().getType() == ExecutionType.EXPRESSIONS) {
                MvelBasicTemplate basicTemplate = input.getExecute().getExpressions();
                mvelBuilder.append("@{").append(getCodeString(basicTemplate)).append("}");
            } else if (input.getExecute().getType() == ExecutionType.IF_ELSE) {
                List<IFExpression> ifExpressions = input.getExecute().getIfExpressions();
                ifExpressions.forEach(ifExpression -> {
                    mvelBuilder.append(getIfMvelExpression(ifExpression));
                });

            } else {
                new ValidationException("Not Valid Input for Execute Expression");
            }
        }
        return mvelBuilder.toString();

    }


    /**
     * @param exp
     * @return
     */
    private StringBuilder getIfMvelExpression(IFExpression exp) {
        if (exp == null) return new StringBuilder();
        StringBuilder ifMvelBuilder = new StringBuilder();
        List<Condition> conditions = exp.getConditions();
        int i = 0;
        ifMvelBuilder.append("@if{");
        conditions.forEach(condition -> {
            ifMvelBuilder.append(condition.getLeftExp()).append(" ").append(condition.getOperator().getValue()).append(" ").append(condition.getRightExp());
            if (condition.isHasNextCondition()) {
                ifMvelBuilder.append(" ").append(conditions.get(i).getNextConditionOperator().getValue()).append(" ");
            }
        });
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


    /**
     * @param basicTemplate
     * @return
     */
    public StringBuilder getCodeString(MvelBasicTemplate basicTemplate) {
        if (basicTemplate == null) return null;
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
        if (basicTemplate.getLines() != null) {
            basicTemplate.getLines().forEach(
                    variable -> {
                        builder.append(variable).append(";");
                    }
            );
        }
        return builder;
    }

    /**
     * @param assignment
     * @param builder
     */
    private void appendVariable(Assignment assignment, StringBuilder builder) {
        builder.append(assignment.getName()).append(" = ");
        builder.append(assignment.getValue());
        builder.append(";");
    }


    /**
     * @param method
     * @param builder
     */
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
