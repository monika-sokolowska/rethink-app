package com.example.backend.service;

import com.example.backend.DTO.AddArticleDTO;
import com.example.backend.DTO.ArticleDTO;
import com.example.backend.DTO.DailyFootprintDTO;
import com.example.backend.model.Article;
import com.example.backend.model.DailyFootprint;
import com.example.backend.repository.ArticleRepository;
import com.example.backend.repository.DailyFootprintRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;


    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public ArticleDTO addArticle(AddArticleDTO addArticleDTO)  {

        Article article = new Article();
        article.setTitle(addArticleDTO.title());
        article.setText(addArticleDTO.text());
        article.setImage(addArticleDTO.image());

        articleRepository.save(article);

        return convertArticleToArticleDTO(article);
    };

    public Iterable<Article> findAll() {
        return articleRepository.findAll();
    }

    public ArticleDTO deleteArticleById(Integer id) {
        Article article = articleRepository.findById(id).orElse(null);
        
        if (article == null) {
            return null;
        }
        
        articleRepository.deleteById(id);
        return convertArticleToArticleDTO(article);
    }

    public ArticleDTO convertArticleToArticleDTO(Article article) {
        return new ArticleDTO(
                article.getId_article(),
                article.getTitle(),
                article.getText(),
                article.getImage()
        );
    }
}
