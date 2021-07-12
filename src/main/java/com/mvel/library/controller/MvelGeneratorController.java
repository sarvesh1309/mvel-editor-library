package com.mvel.library.controller;

import com.mvel.library.model.Input;
import com.mvel.library.services.MvelGeneratorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;


/**
 * controller to generate the mvel
 */
@RestController
@RequestMapping(value = "v1/mvelgenerator")
public class MvelGeneratorController {

    @Resource
    MvelGeneratorService generatorService;


    @PostMapping("/generate")
    /**
     * generate mvel based on the input data
     */
    public ResponseEntity<String> generateMvel(@RequestBody Input input) {
        String output = generatorService.generateMvel(input);
        return new ResponseEntity<String>(output, HttpStatus.OK);

    }


}
