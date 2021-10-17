package com.qds.rates.service.mapper;


import com.qds.rates.domain.*;
import com.qds.rates.service.dto.WalletOperationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link WalletOperation} and its DTO {@link WalletOperationDTO}.
 */
@Mapper(componentModel = "spring", uses = {WalletMapper.class})
public interface WalletOperationMapper extends EntityMapper<WalletOperationDTO, WalletOperation> {

    @Mapping(source = "wallet.id", target = "walletId")
    @Mapping(source = "wallet.externalId", target = "walletExternalId")
    WalletOperationDTO toDto(WalletOperation walletOperation);

    @Mapping(source = "walletId", target = "wallet")
    WalletOperation toEntity(WalletOperationDTO walletOperationDTO);

    default WalletOperation fromId(Long id) {
        if (id == null) {
            return null;
        }
        WalletOperation walletOperation = new WalletOperation();
        walletOperation.setId(id);
        return walletOperation;
    }
}
