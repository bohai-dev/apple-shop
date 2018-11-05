package com.milktea.milkteashop.controller;

import com.milktea.milkteashop.MilkteaShopApplication;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.service.AccountService;
import com.milktea.milkteashop.vo.AccountRequestVo;
import com.milktea.milkteashop.vo.AccountVo;
import com.milktea.milkteashop.vo.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class AccountController {
    @Autowired
    AccountService accountService;

    @RequestMapping("/account")
    public ResponseBody<List<AccountVo>> account(@RequestBody AccountRequestVo requestVo) throws MilkTeaException {

        ResponseBody<List<AccountVo>> responseBody=new ResponseBody<>();
        List<AccountVo> list=accountService.account(requestVo);
        responseBody.setData(list);

        return responseBody;

    }

}
