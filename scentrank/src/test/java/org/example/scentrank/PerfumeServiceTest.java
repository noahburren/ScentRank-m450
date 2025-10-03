package org.example.scentrank;


import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PerfumeServiceTest {
    @Test
    void ratesAreAveragedToTwoDecimals() {
        var svc = new PerfumeService();
        var after = svc.rate(1L, 5);
        assertEquals(5.00, after.avgRating());
        var after2 = svc.rate(1L, 3);
        assertEquals(4.00, after2.avgRating());
        assertEquals(2, after2.ratingsCount());
    }

    @Test
    void rejectsOutOfRangeStars() {
        var svc = new PerfumeService();
        assertThrows(IllegalArgumentException.class, () -> svc.rate(1L, 0));
    }
}