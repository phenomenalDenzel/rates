package com.qds.rates.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ProviderMapperTest {

    private ProviderMapper providerMapper;

    @BeforeEach
    public void setUp() {
        providerMapper = new ProviderMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(providerMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(providerMapper.fromId(null)).isNull();
    }
}
