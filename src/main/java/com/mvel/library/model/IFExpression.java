package com.mvel.library.model;

import lombok.Data;

import java.util.List;

@Data
public class IFExpression {
   List<Condition> conditions;
   boolean hasElseBlock;
   boolean hasInnerIf;
   IFExpression nestedIf;
   MvelBasicTemplate innerIfExpression;
   MvelBasicTemplate innerElseExpression;
}
