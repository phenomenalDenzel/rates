package com.qds.rates.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class WalletOperationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WalletOperation.class);
        WalletOperation walletOperation1 = new WalletOperation();
        walletOperation1.setId(1L);
        WalletOperation walletOperation2 = new WalletOperation();
        walletOperation2.setId(walletOperation1.getId());
        assertThat(walletOperation1).isEqualTo(walletOperation2);
        walletOperation2.setId(2L);
        assertThat(walletOperation1).isNotEqualTo(walletOperation2);
        walletOperation1.setId(null);
        assertThat(walletOperation1).isNotEqualTo(walletOperation2);
    }
}
