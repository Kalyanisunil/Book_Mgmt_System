package com.valoriz.BookMgmtSystem.Controller;


import com.valoriz.BookMgmtSystem.Models.Book;
import com.valoriz.BookMgmtSystem.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class BookController {

    @Autowired
    BookRepository bookrepo;

    @GetMapping("/books")
    public ResponseEntity<List<Book>>getAllBooks(@RequestParam(required = false) String title)
    {
        List<Book> books = bookrepo.findAll();
        return new ResponseEntity<>(books,HttpStatus.OK);
    }


    @GetMapping("/books/{id}")
    public ResponseEntity<?> getBookById(@PathVariable("id") String id) {
        Optional<Book> book = bookrepo.findById(id);

        if (book.isPresent()) {
            return new ResponseEntity<>(book.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid ID", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/books")
    public ResponseEntity<Book> insertBook(@RequestBody Book book) {

        Book savedBook = bookrepo.save(book);

        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);

    }

    @PutMapping("/books/{id}")
    public ResponseEntity<?> updateBook(@PathVariable("id") String id, @RequestBody Book updatedBook) {

        Optional<Book> bookdata=bookrepo.findById(id);

        if(bookdata.isPresent())
        {
            Book book= bookdata.get();

         book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setPublicationDate(updatedBook.getPublicationDate());
            book.setIsbn(updatedBook.getIsbn());
            book.setGenre(updatedBook.getGenre());
            book.setRating(updatedBook.getRating());

            Book saved = bookrepo.save(book);

            return new ResponseEntity<>(saved, HttpStatus.OK);

        }

        else  {
            return new ResponseEntity<>("Invalid ID", HttpStatus.NOT_FOUND);
        }
    }
}
