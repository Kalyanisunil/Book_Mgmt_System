package com.valoriz.BookMgmtSystem.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Document(collection = "books")
public class Book {

    @Id
    private String id;
    private String bookId;

    @NotBlank
    @Size(max = 100)
    private String title;

    @NotBlank
    @Size(max = 50)
    private String author;

    @NotNull
    private LocalDate publicationDate;

    @NotBlank
    @Pattern(regexp = "\\d{13}", message = "ISBN must be exactly 13 digits")
    private String isbn;

    @NotBlank
    private String genre;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer rating;

    public Book(String author, String genre, String id, String isbn, LocalDate publicationDate, Integer rating, String title) {
        this.author = author;
        this.genre = genre;
        this.id = id;
        this.isbn = isbn;
        this.publicationDate = publicationDate;
        this.rating = rating;
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public LocalDate getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }
}
