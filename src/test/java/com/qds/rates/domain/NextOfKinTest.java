package com.qds.rates.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class NextOfKinTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NextOfKin.class);
        NextOfKin nextOfKin1 = new NextOfKin();
        nextOfKin1.setId(1L);
        NextOfKin nextOfKin2 = new NextOfKin();
        nextOfKin2.setId(nextOfKin1.getId());
        assertThat(nextOfKin1).isEqualTo(nextOfKin2);
        nextOfKin2.setId(2L);
        assertThat(nextOfKin1).isNotEqualTo(nextOfKin2);
        nextOfKin1.setId(null);
        assertThat(nextOfKin1).isNotEqualTo(nextOfKin2);
    }
}
