package com.qds.rates.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class EmploymentDetailsMapperTest {

    private EmploymentDetailsMapper employmentDetailsMapper;

    @BeforeEach
    public void setUp() {
        employmentDetailsMapper = new EmploymentDetailsMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(employmentDetailsMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(employmentDetailsMapper.fromId(null)).isNull();
    }
}
