package com.qds.rates.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class OpportunityDocumentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OpportunityDocument.class);
        OpportunityDocument opportunityDocument1 = new OpportunityDocument();
        opportunityDocument1.setId(1L);
        OpportunityDocument opportunityDocument2 = new OpportunityDocument();
        opportunityDocument2.setId(opportunityDocument1.getId());
        assertThat(opportunityDocument1).isEqualTo(opportunityDocument2);
        opportunityDocument2.setId(2L);
        assertThat(opportunityDocument1).isNotEqualTo(opportunityDocument2);
        opportunityDocument1.setId(null);
        assertThat(opportunityDocument1).isNotEqualTo(opportunityDocument2);
    }
}
