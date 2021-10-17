package com.qds.rates.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class OtpMapperTest {

    private OtpMapper otpMapper;

    @BeforeEach
    public void setUp() {
        otpMapper = new OtpMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(otpMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(otpMapper.fromId(null)).isNull();
    }
}
