package com.mvel.library.model;

import lombok.Data;

@Data
public class Condition {
     String leftExp;
     String rightExp;
     ConditionalOperator operator;
     boolean hasNextCondition;
     String nextConditionOperator;


}
