package com.mvel.library.model;

import lombok.Data;

@Data
public class ExpressionConfiguration {
    ExpressionType type;
    // object can be String for RETURN | IfExpression for IF-ELSE | List<Expressions> for expressions;
    Object object;
}
