package com.qds.rates.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class OpportunityDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OpportunityDTO.class);
        OpportunityDTO opportunityDTO1 = new OpportunityDTO();
        opportunityDTO1.setId(1L);
        OpportunityDTO opportunityDTO2 = new OpportunityDTO();
        assertThat(opportunityDTO1).isNotEqualTo(opportunityDTO2);
        opportunityDTO2.setId(opportunityDTO1.getId());
        assertThat(opportunityDTO1).isEqualTo(opportunityDTO2);
        opportunityDTO2.setId(2L);
        assertThat(opportunityDTO1).isNotEqualTo(opportunityDTO2);
        opportunityDTO1.setId(null);
        assertThat(opportunityDTO1).isNotEqualTo(opportunityDTO2);
    }
}
