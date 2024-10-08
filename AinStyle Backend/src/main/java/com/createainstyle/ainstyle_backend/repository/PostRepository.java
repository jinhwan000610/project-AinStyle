package com.createainstyle.ainstyle_backend.repository;

import com.createainstyle.ainstyle_backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}