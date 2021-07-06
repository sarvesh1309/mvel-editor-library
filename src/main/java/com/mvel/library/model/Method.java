package com.mvel.library.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Method {
    String methodName ;
    String returnVariable;
    List<String> arguments;
}
