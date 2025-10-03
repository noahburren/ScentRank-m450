package org.example.scentrank;


import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PerfumeService {
    private final Map<Long, Perfume> store = new ConcurrentHashMap<>();

    public PerfumeService() {
        store.put(1L, new Perfume(1L, "Acqua di Parma Colonia", 0, 0));
        store.put(2L, new Perfume(2L, "Xerjoff Naxos", 0, 0));
        store.put(3L, new Perfume(3L, "Parfums de Marly Layton", 0, 0));
        store.put(4L, new Perfume(4L, "Creed Aventus", 0, 0));
        store.put(5L, new Perfume(5L, "Dior Sauvage", 0, 0));
        store.put(6L, new Perfume(6L, "Chanel Bleu de Chanel", 0, 0));
        store.put(7L, new Perfume(7L, "Tom Ford Tobacco Vanille", 0, 0));
        store.put(8L, new Perfume(8L, "Maison Francis Kurkdjian Baccarat Rouge 540", 0, 0));
        store.put(9L, new Perfume(9L, "Jean Paul Gaultier Le Male", 0, 0));
        store.put(10L, new Perfume(10L, "Versace Eros", 0, 0));
    }


    public List<Perfume> list() {
        return new ArrayList<>(store.values());
    }

    public Perfume rate(long id, int stars) {
        if (stars < 1 || stars > 5) throw new IllegalArgumentException("stars 1..5");
        Perfume p = store.get(id);
        if (p == null) throw new NoSuchElementException("not found");

        double sum = p.avgRating() * p.ratingsCount() + stars;
        int count = p.ratingsCount() + 1;
        Perfume updated = new Perfume(p.id(), p.name(),
                Math.round((sum / count) * 100.0) / 100.0, count);
        store.put(id, updated);
        return updated;
    }
}