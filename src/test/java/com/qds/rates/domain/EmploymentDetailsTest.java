package com.qds.rates.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class EmploymentDetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmploymentDetails.class);
        EmploymentDetails employmentDetails1 = new EmploymentDetails();
        employmentDetails1.setId(1L);
        EmploymentDetails employmentDetails2 = new EmploymentDetails();
        employmentDetails2.setId(employmentDetails1.getId());
        assertThat(employmentDetails1).isEqualTo(employmentDetails2);
        employmentDetails2.setId(2L);
        assertThat(employmentDetails1).isNotEqualTo(employmentDetails2);
        employmentDetails1.setId(null);
        assertThat(employmentDetails1).isNotEqualTo(employmentDetails2);
    }
}
