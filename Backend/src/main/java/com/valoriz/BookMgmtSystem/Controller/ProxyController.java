package com.valoriz.BookMgmtSystem.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")

public class ProxyController {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${google.api.key}")
    private String googleApiKey;

    @GetMapping("/google")
    public ResponseEntity<?> getBookFromGoogle(@RequestParam String isbn) {

        try {
            String url = "https://www.googleapis.com/books/v1/volumes?q=isbn:"
                    + isbn + "&key=" + googleApiKey;

            // Call Google Books API
            String googleResponse = restTemplate.getForObject(url, String.class);

            return ResponseEntity.ok(googleResponse);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body("Error fetching data from Google Books API: " + e.getMessage());
        }
    }
}

//test