package com.qds.rates.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ApplicationMapperTest {

    private ApplicationMapper applicationMapper;

    @BeforeEach
    public void setUp() {
        applicationMapper = new ApplicationMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(applicationMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(applicationMapper.fromId(null)).isNull();
    }
}
