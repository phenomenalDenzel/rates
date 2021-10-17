package com.qds.rates.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class ProviderDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProviderDTO.class);
        ProviderDTO providerDTO1 = new ProviderDTO();
        providerDTO1.setId(1L);
        ProviderDTO providerDTO2 = new ProviderDTO();
        assertThat(providerDTO1).isNotEqualTo(providerDTO2);
        providerDTO2.setId(providerDTO1.getId());
        assertThat(providerDTO1).isEqualTo(providerDTO2);
        providerDTO2.setId(2L);
        assertThat(providerDTO1).isNotEqualTo(providerDTO2);
        providerDTO1.setId(null);
        assertThat(providerDTO1).isNotEqualTo(providerDTO2);
    }
}
