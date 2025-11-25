package com.valoriz.BookMgmtSystem.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Document(collection = "books")
public class Book {

    @Id
    private String id;

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
}
