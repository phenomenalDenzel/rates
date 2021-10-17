package com.qds.rates.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class LocalGovtMapperTest {

    private LocalGovtMapper localGovtMapper;

    @BeforeEach
    public void setUp() {
        localGovtMapper = new LocalGovtMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(localGovtMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(localGovtMapper.fromId(null)).isNull();
    }
}
