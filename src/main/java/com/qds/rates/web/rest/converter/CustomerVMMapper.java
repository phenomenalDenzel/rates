package com.qds.rates.web.rest.converter;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.mapper.EntityMapper;
import com.qds.rates.service.mapper.UserMapper;
import com.qds.rates.web.rest.vm.ManagedCustomerVM;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface CustomerVMMapper extends EntityMapper<CustomerDTO, ManagedCustomerVM> {

    @Mapping(target = "firstName", ignore = true)
    @Mapping(target = "lastName", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    @Mapping(target = "activated", ignore = true)
    @Mapping(target = "langKey", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "login", source = "userLogin")
    @Mapping(target = "id", source = "userId")
    ManagedCustomerVM toEntity(final CustomerDTO dto);

    @Mapping(target = "userId", source = "id")
    @Mapping(target = "userLogin", source = "login")
    @Mapping(target = "walletId", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "wallet", ignore = true)
    CustomerDTO toDto(final ManagedCustomerVM entity);

}
