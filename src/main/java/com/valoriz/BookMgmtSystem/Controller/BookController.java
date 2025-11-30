package com.valoriz.BookMgmtSystem.Controller;


import com.valoriz.BookMgmtSystem.Models.Book;
import com.valoriz.BookMgmtSystem.Repository.BookRepository;
import com.valoriz.BookMgmtSystem.Service.SequenceGeneratorService;
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

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

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
        //unique id generation happens here
        try {
            long seq = sequenceGeneratorService.getSequenceNumber("book_sequence");

            book.setBookId("B-" + String.format("%03d", seq));

        }
        catch (Exception e) {
            throw new RuntimeException(" DB Server down");
        }
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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable String id) {

        if (!bookrepo.existsById(id)) {
            return ResponseEntity.status(404).body("Book not found");
        }

        bookrepo.deleteById(id);
        return ResponseEntity.ok("Book deleted successfully!");
    }
}
