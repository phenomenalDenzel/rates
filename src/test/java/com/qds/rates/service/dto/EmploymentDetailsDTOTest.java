package com.qds.rates.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class EmploymentDetailsDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmploymentDetailsDTO.class);
        EmploymentDetailsDTO employmentDetailsDTO1 = new EmploymentDetailsDTO();
        employmentDetailsDTO1.setId(1L);
        EmploymentDetailsDTO employmentDetailsDTO2 = new EmploymentDetailsDTO();
        assertThat(employmentDetailsDTO1).isNotEqualTo(employmentDetailsDTO2);
        employmentDetailsDTO2.setId(employmentDetailsDTO1.getId());
        assertThat(employmentDetailsDTO1).isEqualTo(employmentDetailsDTO2);
        employmentDetailsDTO2.setId(2L);
        assertThat(employmentDetailsDTO1).isNotEqualTo(employmentDetailsDTO2);
        employmentDetailsDTO1.setId(null);
        assertThat(employmentDetailsDTO1).isNotEqualTo(employmentDetailsDTO2);
    }
}
