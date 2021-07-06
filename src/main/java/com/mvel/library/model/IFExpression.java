package com.mvel.library.model;

import lombok.Data;

import java.util.List;

@Data
public class IFExpression extends Expression {
   List<Condition> conditions;
   boolean hasElseBlock;
   ExpressionConfiguration innerIfExpression;
   ExpressionConfiguration innerElseExpression;
}
