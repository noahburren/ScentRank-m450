package org.example.scentrank;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = TestBadController.class)
@Import({ GlobalExceptionHandler.class, TestBadController.class })
class GlobalExceptionHandlerMvcTest {

    @Autowired
    MockMvc mvc;

    @Test
    void illegalArgument_is400_withJsonBody() throws Exception {
        mvc.perform(get("/boom-illegal"))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("bad_request"))
                .andExpect(jsonPath("$.message").value("stars 1..5"));
    }

    @Test
    void notFound_is404_withJsonBody() throws Exception {
        mvc.perform(get("/boom-notfound"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("not found"))
                .andExpect(jsonPath("$.message").value("not found"));
    }
}
