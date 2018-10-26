package com.milktea.milkteashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.milktea.milkteashop.domain.AppGovernment;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.service.AppGovermentService;
import com.milktea.milkteashop.vo.PageRequestVo;
import com.milktea.milkteashop.vo.PageResponseVo;
import com.milktea.milkteashop.vo.ResponseBody;
import com.milktea.milkteashop.vo.ResponseHeader;

@RestController
@CrossOrigin
public class AppGovermentController {
    
    @Autowired
    private AppGovermentService govermentService;
    
    @PostMapping(value="saveGoverment")
    public ResponseHeader saveGoverment(@RequestBody(required=false) AppGovernment appGovernment) throws MilkTeaException{
        
        this.govermentService.save(appGovernment);
        return new ResponseHeader();
    }
    
    @PostMapping(value="updateGoverment")
    public ResponseHeader updateGoverment(@RequestBody(required=false) AppGovernment appGovernment) throws MilkTeaException{
        
        this.govermentService.modify(appGovernment);
        return new ResponseHeader();
    }
    
    @DeleteMapping(value="removeGoverment/{id}")
    public ResponseHeader removeGoverment(@PathVariable String id) throws MilkTeaException{
        
        this.govermentService.remove(id);
        return new ResponseHeader();
    }
    
    @PostMapping(value="queryPageGoverment")
    public PageResponseVo<AppGovernment> queryPageGoverment(@RequestBody(required=false) PageRequestVo pageRequestVo) throws MilkTeaException{
        return this.govermentService.query(pageRequestVo);
    }
    
    @GetMapping(value="queryGoverment/{id}")
    public ResponseBody<AppGovernment> queryGoverment(@PathVariable String id) throws MilkTeaException{
        ResponseBody<AppGovernment> responseBody = new ResponseBody<AppGovernment>();
        responseBody.setData(this.govermentService.queryGoverment(id));
        return responseBody;
    }
    

}
