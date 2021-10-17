package com.qds.rates.service.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.qds.rates.domain.Customer;
import com.qds.rates.service.dto.CustomerDTO;

/**
 * Mapper for the entity {@link Customer} and its DTO {@link CustomerDTO}.
 */
@Mapper(componentModel = "spring", uses = {WalletMapper.class, UserMapper.class, LocationMapper.class,LocalGovtMapper.class,
                                           NextOfKinMapper.class, VerificationMapper.class,
                                           EmploymentDetailsMapper.class})
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {

    @Mapping(source = "wallet.id", target = "walletId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "verified", target = "canApplyForOpportunities")
    @Mapping(target = "bankAccountNumber", ignore = true)
    @Mapping(target = "bankName", ignore = true)
    CustomerDTO toDto(Customer customer);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "canApplyForOpportunities", target = "verified")
    @Mapping(target = "removeAccountVerifications", ignore = true)
    @Mapping(target = "removeNextOfKin", ignore = true)
    @Mapping(target = "removeAddress", ignore = true)
    @Mapping(target = "applications", ignore = true)
    @Mapping(target = "removeApplications", ignore = true)
    Customer toEntity(CustomerDTO customerDTO);

    default Customer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Customer customer = new Customer();
        customer.setId(id);
        return customer;
    }
}
