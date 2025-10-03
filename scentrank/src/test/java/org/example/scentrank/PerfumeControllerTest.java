package org.example.scentrank;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.NoSuchElementException;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = PerfumeController.class)
@Import(GlobalExceptionHandler.class) // <--- Advice einschalten
class PerfumeControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private PerfumeService service;

    @Test
    void list_returnsPerfumes() throws Exception {
        when(service.list()).thenReturn(List.of(
                new Perfume(1L, "A", 4.5, 2),
                new Perfume(2L, "B", 3.0, 1)
        ));

        mvc.perform(get("/perfumes"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("A"))
                .andExpect(jsonPath("$[0].avgRating").value(4.5))
                .andExpect(jsonPath("$[0].ratingsCount").value(2));

        verify(service).list();
    }

    @Test
    void rate_returnsUpdatedPerfume() throws Exception {
        when(service.rate(1L, 5)).thenReturn(new Perfume(1L, "A", 5.0, 1));

        mvc.perform(post("/perfumes/1/rate").param("stars", "5"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.avgRating").value(5.0))
                .andExpect(jsonPath("$.ratingsCount").value(1));

        verify(service).rate(1L, 5);
    }

    @Test
    void rate_returns404WhenNotFound() throws Exception {
        when(service.rate(42L, 5)).thenThrow(new NoSuchElementException("not found"));

        mvc.perform(post("/perfumes/42/rate").param("stars", "5"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("not found"))
                .andExpect(jsonPath("$.message").value("not found"));
    }

    @Test
    void rate_returns400OnValidationViolation() throws Exception {
        // @Min/@Max schlägt zu -> unser Advice liefert JSON mit error/messages
        mvc.perform(post("/perfumes/1/rate").param("stars", "0"))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("validation_failed"))
                .andExpect(jsonPath("$.messages").isArray());

        verifyNoInteractions(service);
    }
}
