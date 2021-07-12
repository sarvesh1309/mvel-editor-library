package com.mvel.library.model;

import lombok.Data;
import java.util.ArrayList;

@Data
public class Execute {
        ExecutionType type;
        MvelBasicTemplate expressions;
        ArrayList<IFExpression> ifExpressions;
}
