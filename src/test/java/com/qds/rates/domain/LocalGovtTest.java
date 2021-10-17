package com.qds.rates.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class LocalGovtTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LocalGovt.class);
        LocalGovt localGovt1 = new LocalGovt();
        localGovt1.setId(1L);
        LocalGovt localGovt2 = new LocalGovt();
        localGovt2.setId(localGovt1.getId());
        assertThat(localGovt1).isEqualTo(localGovt2);
        localGovt2.setId(2L);
        assertThat(localGovt1).isNotEqualTo(localGovt2);
        localGovt1.setId(null);
        assertThat(localGovt1).isNotEqualTo(localGovt2);
    }
}
