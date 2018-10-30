package com.milktea.milkteashop.service;

import com.milktea.milkteashop.dao.TeaOrderDetailsMapper;
import com.milktea.milkteashop.domain.TeaOrderDetails;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * Cteated by cxy on 2018/10/26
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class OrderServiceTest {
    @Autowired
    TeaOrderDetailsMapper teaOrderDetailsMapper;

    @Test
    public void  selectOrderDetails(){
        List<TeaOrderDetails>  list=teaOrderDetailsMapper.selectByOrderNo("201810261444123");
        for(TeaOrderDetails orderDetails : list){
            System.out.println(123);
        }
    }






}
