package com.qds.rates.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class VerificationDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VerificationDTO.class);
        VerificationDTO verificationDTO1 = new VerificationDTO();
        verificationDTO1.setId(1L);
        VerificationDTO verificationDTO2 = new VerificationDTO();
        assertThat(verificationDTO1).isNotEqualTo(verificationDTO2);
        verificationDTO2.setId(verificationDTO1.getId());
        assertThat(verificationDTO1).isEqualTo(verificationDTO2);
        verificationDTO2.setId(2L);
        assertThat(verificationDTO1).isNotEqualTo(verificationDTO2);
        verificationDTO1.setId(null);
        assertThat(verificationDTO1).isNotEqualTo(verificationDTO2);
    }
}
