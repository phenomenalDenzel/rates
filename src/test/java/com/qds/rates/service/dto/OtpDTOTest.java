package com.qds.rates.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class OtpDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OtpDTO.class);
        OtpDTO otpDTO1 = new OtpDTO();
        otpDTO1.setId(1L);
        OtpDTO otpDTO2 = new OtpDTO();
        assertThat(otpDTO1).isNotEqualTo(otpDTO2);
        otpDTO2.setId(otpDTO1.getId());
        assertThat(otpDTO1).isEqualTo(otpDTO2);
        otpDTO2.setId(2L);
        assertThat(otpDTO1).isNotEqualTo(otpDTO2);
        otpDTO1.setId(null);
        assertThat(otpDTO1).isNotEqualTo(otpDTO2);
    }
}
