package com.milktea.milkteashop.service.impl;

import com.milktea.milkteashop.dao.AccountMapper;
import com.milktea.milkteashop.dao.AppRejectedMapper;
import com.milktea.milkteashop.exception.MilkTeaErrorConstant;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.service.AccountService;
import com.milktea.milkteashop.vo.AccountRequestVo;
import com.milktea.milkteashop.vo.AccountVo;
import com.milktea.milkteashop.vo.RejectedAccountVo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * Cteated by cxy on 2018/11/1
 * 结算service
 */
@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    AccountMapper accountMapper;
    @Autowired
    AppRejectedMapper rejectedMapper;


    @Override
    public List<AccountVo>  account(AccountRequestVo requestVo) throws MilkTeaException{
        String beginTime=requestVo.getBeginTime();
        String finishTime=requestVo.getFinishTime();
     //   String storeNo=requestVo.getStoreNo();

        if (StringUtils.isBlank(beginTime)){
            throw new MilkTeaException(MilkTeaErrorConstant.QUERY_TIME_REQUIRED);
        }
        if (StringUtils.isBlank(finishTime)){
            throw new MilkTeaException(MilkTeaErrorConstant.QUERY_TIME_REQUIRED);
        }
      //  if (StringUtils.isBlank(storeNo)){
            //查询所有
            requestVo.setPayStatus("1");  //1支付成功
            List<AccountVo>  accountList=accountMapper.selectByCondition(requestVo);
            for (AccountVo accountVo : accountList){
                RejectedAccountVo rejectedAccountVo=new RejectedAccountVo();
                rejectedAccountVo.setBeginTime(requestVo.getBeginTime());
                rejectedAccountVo.setFinishTime(requestVo.getFinishTime());
                rejectedAccountVo.setStoreNo(accountVo.getStoreNo());
                //查询退货信息
                RejectedAccountVo resultRejectedVo=rejectedMapper.account(rejectedAccountVo);
                //设置退货总额
                accountVo.setReturnMoney(resultRejectedVo.getRejectedMoney());
                //设置退货次数
                accountVo.setReturnCount(resultRejectedVo.getRejectdCount());
                //计算最终金额
                BigDecimal totalMoney=accountVo.getOrderTotalMoney().subtract(accountVo.getReturnMoney());
                accountVo.setFinalMoney(totalMoney);
                //设置结算时间
                accountVo.setAccountDate(new Date());
                //设置开始时间和结束时间
                accountVo.setBeginTime(requestVo.getBeginTime());
                accountVo.setFinishTime(requestVo.getFinishTime());
            }

            return accountList;




     //   }



    }

}
