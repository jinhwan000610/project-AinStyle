package com.createainstyle.ainstyle_backend.service;

import com.createainstyle.ainstyle_backend.model.Comment;
import com.createainstyle.ainstyle_backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }
}
