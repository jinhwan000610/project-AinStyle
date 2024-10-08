package com.createainstyle.ainstyle_backend.service;

import com.createainstyle.ainstyle_backend.model.Style;
import com.createainstyle.ainstyle_backend.repository.StyleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StyleService {
    @Autowired
    private StyleRepository styleRepository;

    public List<Style> getAllStyles() {
        return styleRepository.findAll();
    }

    public Style saveStyle(Style style) {
        return styleRepository.save(style);
    }
}
