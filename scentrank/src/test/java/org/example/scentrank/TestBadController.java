package org.example.scentrank;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
class TestBadController {

    @GetMapping("/boom-illegal")
    public String boomIllegal() {
        throw new IllegalArgumentException("stars 1..5");
    }

    @GetMapping("/boom-notfound")
    public String boomNotFound() {
        throw new NoSuchElementException("not found");
    }
}
