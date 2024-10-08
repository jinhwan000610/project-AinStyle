package com.createainstyle.ainstyle_backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping("/")
    public String home() {
        return "index"; // `index.html` 파일을 가리킵니다.
    }
}