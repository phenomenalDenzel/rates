package com.qds.rates.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;

import com.qds.rates.domain.Opportunity;
import com.qds.rates.repository.OpportunityRepository;
import com.qds.rates.repository.search.OpportunitySearchRepository;
import com.qds.rates.service.dto.OpportunityDTO;
import com.qds.rates.service.mapper.OpportunityFacetMapper;
import com.qds.rates.service.mapper.OpportunityMapper;
import com.qds.rates.service.mapper.OpportunitySearchMapper;

@ExtendWith(MockitoExtension.class)
public class OpportunityServiceTest {

    private OpportunityRepository opportunityRepository = mock(OpportunityRepository.class);
    private OpportunityMapper opportunityMapper = mock(OpportunityMapper.class);
    private OpportunitySearchMapper opportunitySearchMapper = mock(OpportunitySearchMapper.class);
    private OpportunitySearchRepository opportunitySearchRepository = mock(OpportunitySearchRepository.class);
    private  OpportunityFacetMapper opportunityFacetMapper = mock(OpportunityFacetMapper.class);
    private  ElasticsearchOperations elasticSearchTemplate = mock(ElasticsearchOperations.class);

    private OpportunityService opportunityService;

    @BeforeEach
    void setUp() {
        opportunityService = new OpportunityService(opportunityRepository, opportunityMapper, opportunitySearchMapper, opportunitySearchRepository, opportunityFacetMapper, elasticSearchTemplate);
    }

    @Test
    public void isAmountValidForOpportunity_ShouldThrowIllegalArgumentException_WhenOpportunityIdDoesntExist(){
        when(opportunityRepository.findById(1l)).thenReturn(Optional.empty());
        Assertions.assertThrows(IllegalArgumentException.class, ()->opportunityService.isAmountValidForOpportunity(1,
                                                                                                                   new BigDecimal(20000)));
    }

    @Test
    public void isAmountValidForOpportunity_ShouldReturnFalse_WhenAmountIsLessThanMinimumInvestment(){
        final Opportunity opportunityEntity = new Opportunity();
        when(opportunityRepository.findById(1l)).thenReturn(Optional.of(opportunityEntity));

        OpportunityDTO opportunityDTO = new OpportunityDTO();
        opportunityDTO.setMinimumInvestment(new BigDecimal(30000));
        when(opportunityMapper.toDto(opportunityEntity)).thenReturn(opportunityDTO);

        boolean result = opportunityService.isAmountValidForOpportunity(1, new BigDecimal(20000));

        assertThat(result).isFalse();
    }

    @Test
    public void isAmountValidForOpportunity_ShouldReturnTrue_WhenAmountIsValidForDenomination(){
        final Opportunity opportunityEntity = new Opportunity();
        when(opportunityRepository.findById(1l)).thenReturn(Optional.of(opportunityEntity));

        OpportunityDTO opportunityDTO = new OpportunityDTO();
        opportunityDTO.setMinimumInvestment(new BigDecimal(30000));
        opportunityDTO.setDenomination(new BigDecimal(500));
        when(opportunityMapper.toDto(opportunityEntity)).thenReturn(opportunityDTO);

        boolean result = opportunityService.isAmountValidForOpportunity(1, new BigDecimal(40000));

        assertThat(result).isTrue();
    }

    @Test
    public void isAmountValidForOpportunity_ShouldReturnFalse_WhenAmountIsNotValidForDenomination(){
        final Opportunity opportunityEntity = new Opportunity();
        when(opportunityRepository.findById(1l)).thenReturn(Optional.of(opportunityEntity));

        OpportunityDTO opportunityDTO = new OpportunityDTO();
        opportunityDTO.setMinimumInvestment(new BigDecimal(30000));
        opportunityDTO.setDenomination(new BigDecimal(500));
        when(opportunityMapper.toDto(opportunityEntity)).thenReturn(opportunityDTO);

        boolean result = opportunityService.isAmountValidForOpportunity(1, new BigDecimal(35023));

        assertThat(result).isFalse();
    }

    @Test
    public void isAmountValidForOpportunity_ShouldReturnTrue_WhenRemainingAmountInvestedIsZero(){
        final Opportunity opportunityEntity = new Opportunity();
        when(opportunityRepository.findById(1l)).thenReturn(Optional.of(opportunityEntity));

        OpportunityDTO opportunityDTO = new OpportunityDTO();
        opportunityDTO.setMinimumInvestment(new BigDecimal(40000));
        opportunityDTO.setDenomination(new BigDecimal(500));
        when(opportunityMapper.toDto(opportunityEntity)).thenReturn(opportunityDTO);

        boolean result = opportunityService.isAmountValidForOpportunity(1, new BigDecimal(40000));

        assertThat(result).isTrue();
    }
}