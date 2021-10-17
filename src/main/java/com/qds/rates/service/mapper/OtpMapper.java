package com.qds.rates.service.mapper;


import org.mapstruct.Mapper;

import com.qds.rates.domain.Otp;
import com.qds.rates.service.dto.OtpDTO;

/**
 * Mapper for the entity {@link Otp} and its DTO {@link OtpDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OtpMapper extends EntityMapper<OtpDTO, Otp> {



    default Otp fromId(Long id) {
        if (id == null) {
            return null;
        }
        Otp otp = new Otp();
        otp.setId(id);
        return otp;
    }
}
