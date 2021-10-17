package com.qds.rates.service.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.qds.rates.domain.Wallet;
import com.qds.rates.service.dto.WalletDTO;

/**
 * Mapper for the entity {@link Wallet} and its DTO {@link WalletDTO}.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface WalletMapper extends EntityMapper<WalletDTO, Wallet> {

    @Mapping(source = "customer.id", target = "customerId")
    WalletDTO toDto(Wallet wallet);

    @Mapping(target = "transactions", ignore = true)
    @Mapping(target = "removeTransactions", ignore = true)
    @Mapping(source = "customerId", target = "customer")
    Wallet toEntity(WalletDTO walletDTO);

    default Wallet fromId(Long id) {
        if (id == null) {
            return null;
        }
        Wallet wallet = new Wallet();
        wallet.setId(id);
        return wallet;
    }
}
