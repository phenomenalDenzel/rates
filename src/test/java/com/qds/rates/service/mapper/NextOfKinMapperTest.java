package com.qds.rates.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class NextOfKinMapperTest {

    private NextOfKinMapper nextOfKinMapper;

    @BeforeEach
    public void setUp() {
        nextOfKinMapper = new NextOfKinMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(nextOfKinMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(nextOfKinMapper.fromId(null)).isNull();
    }
}
