package com.milktea.milkteashop.service.impl;

import com.milktea.milkteashop.exception.MilkTeaErrorConstant;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.vo.AccountRequestVo;
import com.milktea.milkteashop.vo.AccountVo;
import org.apache.commons.lang.StringUtils;

/**
 * Cteated by cxy on 2018/11/1
 * 结算service
 */
public class AccountServiceImpl {


    private void account(AccountRequestVo requestVo) throws MilkTeaException{
        String beginTime=requestVo.getBeginTime();
        String finishTime=requestVo.getFinishTime();
        String storeNo=requestVo.getStoreNo();

        if (StringUtils.isBlank(beginTime)){
            throw new MilkTeaException(MilkTeaErrorConstant.QUERY_TIME_REQUIRED);
        }
        if (StringUtils.isBlank(finishTime)){
            throw new MilkTeaException(MilkTeaErrorConstant.QUERY_TIME_REQUIRED);
        }



    }

}
