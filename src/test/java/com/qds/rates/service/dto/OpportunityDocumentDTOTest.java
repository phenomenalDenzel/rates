package com.qds.rates.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class OpportunityDocumentDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OpportunityDocumentDTO.class);
        OpportunityDocumentDTO opportunityDocumentDTO1 = new OpportunityDocumentDTO();
        opportunityDocumentDTO1.setId(1L);
        OpportunityDocumentDTO opportunityDocumentDTO2 = new OpportunityDocumentDTO();
        assertThat(opportunityDocumentDTO1).isNotEqualTo(opportunityDocumentDTO2);
        opportunityDocumentDTO2.setId(opportunityDocumentDTO1.getId());
        assertThat(opportunityDocumentDTO1).isEqualTo(opportunityDocumentDTO2);
        opportunityDocumentDTO2.setId(2L);
        assertThat(opportunityDocumentDTO1).isNotEqualTo(opportunityDocumentDTO2);
        opportunityDocumentDTO1.setId(null);
        assertThat(opportunityDocumentDTO1).isNotEqualTo(opportunityDocumentDTO2);
    }
}
