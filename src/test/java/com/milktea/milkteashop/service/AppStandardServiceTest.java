package com.milktea.milkteashop.service;

import com.milktea.milkteashop.domain.AppStandard;
import com.milktea.milkteashop.exception.MilkTeaException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;
import java.util.List;

/**
 * Cteated by cxy on 2018/10/17
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class AppStandardServiceTest {

    @Autowired
    AppStandardService standardService;

    @Test
    public void addTest(){
        AppStandard standard=new AppStandard();
        standard.setName("斤");
        standard.setDescription("苹果一斤50元");
        standard.setGoodId("50");
        standard.setPrice(new BigDecimal(20.00));
        standard.setStock(new BigDecimal(50));

        try {
            int result=standardService.addStanard(standard);
            Assert.assertEquals(1L,result);

        } catch (MilkTeaException e) {
            e.printStackTrace();
        }

    }

    @Test
    public void selectById(){
        String id="1";
        AppStandard standard=standardService.selectById(id);
        Assert.assertNotNull(standard);

    }

    @Test
    public void  selectByGoodsId(){
        String goodsId="50";
        List<AppStandard> list=standardService.selectByGoodsId(goodsId);
        Assert.assertEquals(1L,list.size());
    }
}
