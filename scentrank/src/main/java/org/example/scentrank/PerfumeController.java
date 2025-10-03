package org.example.scentrank;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/perfumes")
@RequiredArgsConstructor
public class PerfumeController {
    private final PerfumeService service;

    @GetMapping
    public List<Perfume> list() {
        return service.list();
    }

    @PostMapping("/{id}/rate")
    public Perfume rate(@PathVariable long id, @RequestParam int stars) {
        return service.rate(id, stars);
    }
}