package com.qds.rates.service.mapper;


import com.qds.rates.domain.*;
import com.qds.rates.service.dto.ProviderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Provider} and its DTO {@link ProviderDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProviderMapper extends EntityMapper<ProviderDTO, Provider> {


    @Mapping(target = "opportunities", ignore = true)
    @Mapping(target = "removeOpportunities", ignore = true)
    Provider toEntity(ProviderDTO providerDTO);

    default Provider fromId(Long id) {
        if (id == null) {
            return null;
        }
        Provider provider = new Provider();
        provider.setId(id);
        return provider;
    }
}
