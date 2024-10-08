package com.createainstyle.ainstyle_backend.controller;

import com.createainstyle.ainstyle_backend.service.CrawlingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/crawl")
public class CrawlingController {

    private static final Logger logger = LoggerFactory.getLogger(CrawlingController.class);

    private final CrawlingService crawlingService;

    @Autowired
    public CrawlingController(CrawlingService crawlingService) {
        this.crawlingService = crawlingService;
    }

    @CrossOrigin(origins = "http://localhost:3000") // 클라이언트 도메인(포트) 명시
    @PostMapping("/images")
    public ResponseEntity<List<String>> getImages(@RequestBody Map<String, String> request) {
        String styleType = request.get("styleType");
        String gender = request.get("gender");
        logger.info("Received styleType: " + styleType);
        logger.info("Received gender: " + gender);
        List<String> imageLinks = crawlingService.getImageLinks(styleType, gender);
        return ResponseEntity.ok(imageLinks);
    }
}
