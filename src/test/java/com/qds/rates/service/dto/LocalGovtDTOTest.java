package com.qds.rates.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class LocalGovtDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalGovtDTO.class);
        LocalGovtDTO localGovtDTO1 = new LocalGovtDTO();
        localGovtDTO1.setId(1L);
        LocalGovtDTO localGovtDTO2 = new LocalGovtDTO();
        assertThat(localGovtDTO1).isNotEqualTo(localGovtDTO2);
        localGovtDTO2.setId(localGovtDTO1.getId());
        assertThat(localGovtDTO1).isEqualTo(localGovtDTO2);
        localGovtDTO2.setId(2L);
        assertThat(localGovtDTO1).isNotEqualTo(localGovtDTO2);
        localGovtDTO1.setId(null);
        assertThat(localGovtDTO1).isNotEqualTo(localGovtDTO2);
    }
}
