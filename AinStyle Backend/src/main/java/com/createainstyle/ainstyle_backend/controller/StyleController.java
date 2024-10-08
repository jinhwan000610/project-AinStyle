package com.createainstyle.ainstyle_backend.controller;

import com.createainstyle.ainstyle_backend.model.Style;
import com.createainstyle.ainstyle_backend.service.StyleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/styles")
public class StyleController {
    @Autowired
    private StyleService styleService;

    @GetMapping
    public List<Style> getAllStyles() {
        return styleService.getAllStyles();
    }

    @PostMapping
    public Style createStyle(@RequestBody Style style) {
        return styleService.saveStyle(style);
    }
}
