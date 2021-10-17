package com.qds.rates.web.rest.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.mapper.EntityMapper;
import com.qds.rates.web.rest.vm.CustomerProfileVM;

@Mapper(componentModel = "spring")
public interface CustomerProfileVMMapper extends EntityMapper<CustomerProfileVM, CustomerDTO> {

    @Mapping(target = "user.lastName", source = "lastName")
    @Mapping(target = "user.firstName", source = "firstName")
    @Mapping(target = "user.email", ignore = true)
    @Mapping(target = "annualIncome",ignore = true)
    @Mapping(target = "employmentStatus",ignore = true)
    @Mapping(target = "qualificationLevel",ignore = true)
    @Mapping(target = "bvn",ignore = true)
    @Mapping(target = "countryOfBirth",ignore = true)
    @Mapping(target = "nationality",ignore = true)
    @Mapping(target = "mothersMaidenName",ignore = true)
    @Mapping(target = "accountVerifications",ignore = true)
    @Mapping(target = "nextOfKins",ignore = true)
    @Mapping(target = "addresses",ignore = true)
    @Mapping(target = "employmentDetails",ignore = true)
    @Mapping(target = "walletId",ignore = true)
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "userId",ignore = true)
    @Mapping(target = "userLogin",ignore = true)
    @Mapping(target = "bankAccountNumber",ignore = true)
    @Mapping(target = "canApplyForOpportunities",ignore = true)
    @Mapping(target = "bankName",ignore = true)
    @Mapping(target = "wallet", ignore = true)
    CustomerDTO toEntity(CustomerProfileVM dto);

    @Mapping(target = "lastName", source = "user.lastName")
    @Mapping(target = "firstName", source = "user.firstName")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "verified", source = "canApplyForOpportunities")
    CustomerProfileVM toDto(CustomerDTO entity);
}
