package com.mvel.library.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MvelBasicTemplate {
    List<Method> methods;
    List<Assignment> assignments;
    List<String> lines;
}
