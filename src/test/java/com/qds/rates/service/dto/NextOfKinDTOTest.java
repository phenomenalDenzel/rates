package com.qds.rates.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class NextOfKinDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(NextOfKinDTO.class);
        NextOfKinDTO nextOfKinDTO1 = new NextOfKinDTO();
        nextOfKinDTO1.setId(1L);
        NextOfKinDTO nextOfKinDTO2 = new NextOfKinDTO();
        assertThat(nextOfKinDTO1).isNotEqualTo(nextOfKinDTO2);
        nextOfKinDTO2.setId(nextOfKinDTO1.getId());
        assertThat(nextOfKinDTO1).isEqualTo(nextOfKinDTO2);
        nextOfKinDTO2.setId(2L);
        assertThat(nextOfKinDTO1).isNotEqualTo(nextOfKinDTO2);
        nextOfKinDTO1.setId(null);
        assertThat(nextOfKinDTO1).isNotEqualTo(nextOfKinDTO2);
    }
}
