package com.mvel.library.model;

import lombok.Data;
import lombok.Getter;

@Getter
public enum ConditionalOperator {
    EQUALS("=="),
    NOT_EQUALS("!="),
    GREATER_AND_EQUAL(">="),
    GREATER(">"),
    LOWER(">"),
    LOWER_EQUAL(">"),
    AND("&&"),
    OR("||");


    private String value;

    ConditionalOperator(String value) {
        this.value = value;
    }




}
