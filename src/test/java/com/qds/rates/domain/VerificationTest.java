package com.qds.rates.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class VerificationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Verification.class);
        Verification verification1 = new Verification();
        verification1.setId(1L);
        Verification verification2 = new Verification();
        verification2.setId(verification1.getId());
        assertThat(verification1).isEqualTo(verification2);
        verification2.setId(2L);
        assertThat(verification1).isNotEqualTo(verification2);
        verification1.setId(null);
        assertThat(verification1).isNotEqualTo(verification2);
    }
}
