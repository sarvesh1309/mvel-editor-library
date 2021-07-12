package com.mvel.library.model;

import lombok.Data;

import javax.validation.Valid;

@Data

public class Condition {
     String leftExp;
     String rightExp;
     ConditionalOperator operator;
     boolean hasNextCondition;
     ConditionalOperator nextConditionOperator;


}
