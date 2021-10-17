package com.qds.rates.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class VerificationMapperTest {

    private VerificationMapper verificationMapper;

    @BeforeEach
    public void setUp() {
        verificationMapper = new VerificationMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(verificationMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(verificationMapper.fromId(null)).isNull();
    }
}
