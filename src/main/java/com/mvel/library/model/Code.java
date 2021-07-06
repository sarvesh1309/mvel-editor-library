package com.mvel.library.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Code {
    List<Method> methods;
    List<Assignment> assignments;
    String simpleExpression;
}
