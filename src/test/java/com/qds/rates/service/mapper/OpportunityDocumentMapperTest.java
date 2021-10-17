package com.qds.rates.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class OpportunityDocumentMapperTest {

    private OpportunityDocumentMapper opportunityDocumentMapper;

    @BeforeEach
    public void setUp() {
        opportunityDocumentMapper = new OpportunityDocumentMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(opportunityDocumentMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(opportunityDocumentMapper.fromId(null)).isNull();
    }
}
