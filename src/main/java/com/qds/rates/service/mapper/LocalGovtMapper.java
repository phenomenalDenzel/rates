package com.qds.rates.service.mapper;


import com.qds.rates.domain.*;
import com.qds.rates.service.dto.LocalGovtDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link LocalGovt} and its DTO {@link LocalGovtDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LocalGovtMapper extends EntityMapper<LocalGovtDTO, LocalGovt> {



    default LocalGovt fromId(Long id) {
        if (id == null) {
            return null;
        }
        LocalGovt localGovt = new LocalGovt();
        localGovt.setId(id);
        return localGovt;
    }
}
