package org.example.scentrank;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

class PerfumeServiceTest {

    @Test
    void list_returnsAllSeededPerfumes() {
        PerfumeService svc = new PerfumeService();
        List<Perfume> all = svc.list();
        assertTrue(all.size() >= 10);
        assertNotNull(all.stream().filter(p -> p.id() == 1L).findFirst().orElse(null));
    }

    @Test
    void rate_updatesAverageAndCount_andRoundsTo2Decimals() {
        PerfumeService svc = new PerfumeService();
        // set up with two ratings to exercise rounding
        Perfume p1 = svc.rate(1L, 5); // 5.00, count=1
        assertEquals(5.00, p1.avgRating());
        assertEquals(1, p1.ratingsCount());

        Perfume p2 = svc.rate(1L, 4); // (5+4)/2 = 4.50
        assertEquals(4.50, p2.avgRating());
        assertEquals(2, p2.ratingsCount());
    }

    @Test
    void rate_acceptsBoundaryStars1and5() {
        PerfumeService svc = new PerfumeService();
        Perfume low = svc.rate(2L, 1);
        assertEquals(1.00, low.avgRating());
        Perfume high = svc.rate(2L, 5);
        assertEquals(3.00, high.avgRating()); // (1+5)/2
    }

    @Test
    void rate_throwsOnOutOfRangeAndNotFound() {
        PerfumeService svc = new PerfumeService();
        assertThrows(IllegalArgumentException.class, () -> svc.rate(1L, 0));
        assertThrows(IllegalArgumentException.class, () -> svc.rate(1L, 6));
        assertThrows(NoSuchElementException.class, () -> svc.rate(9999L, 5));
    }
}
