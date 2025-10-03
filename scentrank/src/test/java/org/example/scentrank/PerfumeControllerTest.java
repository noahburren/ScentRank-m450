package org.example.scentrank;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;


@WebMvcTest(PerfumeController.class)
class PerfumeControllerTest {

    @Autowired
    MockMvc mvc;

    @TestConfiguration
    static class TestConfig {
        @Bean
        PerfumeService perfumeService() {
            return Mockito.mock(PerfumeService.class);
        }
    }

    @Autowired
    PerfumeService service;

    @Test
    void listReturnsOk() throws Exception {
        when(service.list()).thenReturn(List.of(new Perfume(1L, "X", 0, 0)));

        mvc.perform(get("/api/perfumes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L));
    }
}
