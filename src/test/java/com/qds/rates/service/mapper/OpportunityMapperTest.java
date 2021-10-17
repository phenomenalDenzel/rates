package com.qds.rates.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class OpportunityMapperTest {

    private OpportunityMapper opportunityMapper;

    @BeforeEach
    public void setUp() {
        opportunityMapper = new OpportunityMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(opportunityMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(opportunityMapper.fromId(null)).isNull();
    }
}
