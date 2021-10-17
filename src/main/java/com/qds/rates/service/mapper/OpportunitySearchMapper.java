package com.qds.rates.service.mapper;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import com.qds.rates.domain.Opportunity;
import com.qds.rates.service.dto.OpportunitySearchDTO;

@Mapper(componentModel = "spring", uses = {ProviderMapper.class})
@Component
public interface OpportunitySearchMapper extends EntityMapper<OpportunitySearchDTO, Opportunity>{

    @Mapping(source = "provider.id", target = "providerId")
    @Mapping(source = "provider.name", target = "providerName")
    @Mapping(source = "endDate", target = "closingDays", qualifiedByName = "convertToClosingDays")
    OpportunitySearchDTO toDto(Opportunity opportunity);

    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "removeDocuments", ignore = true)
    @Mapping(source = "providerId", target = "provider")
    Opportunity toEntity(OpportunitySearchDTO opportunitySearchDTO);

    @Named("convertToClosingDays")
    default int convertToClosingDays(Instant endDate){
        LocalDate endDay = endDate.truncatedTo(ChronoUnit.DAYS).atZone(ZoneId.of("UTC")).toLocalDate();
        LocalDate today = Instant.now().truncatedTo(ChronoUnit.DAYS).atZone(ZoneId.of("UTC")).toLocalDate();
        int closingDays = (int)ChronoUnit.DAYS.between(today,endDay);
        return closingDays;
    }
}
