package com.example.backend.controller;

import com.example.backend.DTO.AddArticleDTO;
import com.example.backend.DTO.ArticleDTO;
import com.example.backend.DTO.DeleteDTO;
import com.example.backend.model.Article;
import com.example.backend.service.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "article")
public class ArticleController {

    private ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Article> getAllArticles() {
        return articleService.findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path="/add")
    public ResponseEntity<ArticleDTO> addTransport(@RequestBody AddArticleDTO addArticleDTO) {


        return ResponseEntity.ok(articleService.addArticle(addArticleDTO));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(path="/delete")
    public ResponseEntity<ArticleDTO> deleteArticle(@RequestBody DeleteDTO deleteDTO) {
        return ResponseEntity.ok(articleService.deleteArticleById(deleteDTO.id()));
    }

}
