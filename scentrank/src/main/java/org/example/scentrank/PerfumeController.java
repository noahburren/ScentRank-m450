package org.example.scentrank;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perfumes")
public class PerfumeController {

    private final PerfumeService service;

    public PerfumeController(PerfumeService service) { this.service = service; }

    @GetMapping
    public List<Perfume> list() { return service.list(); }

    @PostMapping("/{id}/rate")
    public Perfume rate(@PathVariable long id,
                        @RequestParam @Min(1) @Max(5) int stars) {
        return service.rate(id, stars);
    }
}
