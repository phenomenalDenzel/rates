package com.qds.rates.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.qds.rates.web.rest.TestUtil;

public class WalletOperationDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WalletOperationDTO.class);
        WalletOperationDTO walletOperationDTO1 = new WalletOperationDTO();
        walletOperationDTO1.setId(1L);
        WalletOperationDTO walletOperationDTO2 = new WalletOperationDTO();
        assertThat(walletOperationDTO1).isNotEqualTo(walletOperationDTO2);
        walletOperationDTO2.setId(walletOperationDTO1.getId());
        assertThat(walletOperationDTO1).isEqualTo(walletOperationDTO2);
        walletOperationDTO2.setId(2L);
        assertThat(walletOperationDTO1).isNotEqualTo(walletOperationDTO2);
        walletOperationDTO1.setId(null);
        assertThat(walletOperationDTO1).isNotEqualTo(walletOperationDTO2);
    }
}
