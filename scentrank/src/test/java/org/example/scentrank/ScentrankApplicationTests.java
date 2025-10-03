package org.example.scentrank;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ScentrankApplicationTests {

    @Test
    void contextLoads() {}

    @Test
    void mainMethod_runs() {
        ScentrankApplication.main(new String[]{"--server.port=0"});
    }
}
