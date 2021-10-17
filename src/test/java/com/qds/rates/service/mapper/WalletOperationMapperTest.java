package com.qds.rates.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class WalletOperationMapperTest {

    private WalletOperationMapper walletOperationMapper;

    @BeforeEach
    public void setUp() {
        walletOperationMapper = new WalletOperationMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(walletOperationMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(walletOperationMapper.fromId(null)).isNull();
    }
}
