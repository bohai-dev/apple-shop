package com.milktea.milkteashop.controller;

import com.milktea.milkteashop.domain.AppRejected;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.service.AppRejectedService;
import com.milktea.milkteashop.vo.PageRequestVo;
import com.milktea.milkteashop.vo.PageResponseVo;
import com.milktea.milkteashop.vo.QueryRejectedRequestVo;
import com.milktea.milkteashop.vo.ResponseHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Cteated by cxy on 2018/10/29
 */
@RestController
@RequestMapping("/returngoods")
public class AppRejectedController {

    @Autowired
    AppRejectedService rejectedService;



    @RequestMapping("/selectbypage")
    public PageResponseVo<AppRejected> selectByPage(@RequestBody PageRequestVo<QueryRejectedRequestVo> requestVo)throws MilkTeaException {

         return rejectedService.queryByPage(requestVo);
    }

    @RequestMapping("/updatebyid")
    public ResponseHeader updateRejected(@RequestBody AppRejected appRejected) throws MilkTeaException{
        ResponseHeader responseHeader=new ResponseHeader();

        rejectedService.updateRejected(appRejected);

        return  responseHeader;

    }

}
