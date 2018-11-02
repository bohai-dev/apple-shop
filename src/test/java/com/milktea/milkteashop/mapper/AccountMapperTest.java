package com.milktea.milkteashop.mapper;

import com.milktea.milkteashop.dao.AccountMapper;
import com.milktea.milkteashop.vo.AccountRequestVo;
import com.milktea.milkteashop.vo.AccountVo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * Cteated by cxy on 2018/11/2
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class AccountMapperTest {

    @Autowired
    AccountMapper accountMapper;

    @Test
    public void selectAll(){
        AccountRequestVo accountRequestVo=new AccountRequestVo();
        accountRequestVo.setBeginTime("2018-10-31");
        accountRequestVo.setFinishTime("2018-11-02");

        List<AccountVo> list=accountMapper.selectAll(accountRequestVo);
        System.out.println("订单总数"+list.get(0).getOrderCount());
        System.out.println("订单总金额"+list.get(0).getOrderTotalMoney());
        System.out.println("店铺名称"+list.get(0).getStoreName());

    }

}
