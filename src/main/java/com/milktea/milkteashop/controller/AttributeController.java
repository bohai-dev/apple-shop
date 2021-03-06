package com.milktea.milkteashop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.milktea.milkteashop.domain.TeaAttributesInfo;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.service.AttributeService;
import com.milktea.milkteashop.vo.ResponseBody;
import com.milktea.milkteashop.vo.ResponseHeader;

@RestController
@CrossOrigin
public class AttributeController {

    @Autowired
    private AttributeService attributeService;
    
    @RequestMapping(value="saveAttribute", method=RequestMethod.POST)
    public ResponseHeader saveAttribute(@RequestBody TeaAttributesInfo attributesInfo) throws MilkTeaException{
        ResponseHeader header = new ResponseHeader();
        this.attributeService.addAttribute(attributesInfo);
        return header;
    }
    
    @RequestMapping(value="modifyAttribute", method=RequestMethod.POST)
    public ResponseHeader modifyAttribute(@RequestBody TeaAttributesInfo attributesInfo) throws MilkTeaException{
        ResponseHeader header = new ResponseHeader();
        this.attributeService.modifyAttribute(attributesInfo);
        return header;
    }
    
    @RequestMapping(value="removeAttribute/{attrId}", method=RequestMethod.DELETE)
    public ResponseHeader removeAttribute(@PathVariable String attrId) throws MilkTeaException{
        ResponseHeader header = new ResponseHeader();
        this.attributeService.removeAttribute(attrId);
        return header;
    }
    
    @RequestMapping(value="queryAttributes", method=RequestMethod.GET)
    public ResponseBody<List<TeaAttributesInfo>> queryAttributes() throws MilkTeaException{
        ResponseBody<List<TeaAttributesInfo>> responseBody = new ResponseBody<>();
        responseBody.setData(this.attributeService.queryAttributesInfo());
        return responseBody;
    }
    
    @RequestMapping(value="queryAttribute/{attrId}", method=RequestMethod.GET)
    public ResponseBody<TeaAttributesInfo> queryAttribute(@PathVariable String attrId) throws MilkTeaException{
        ResponseBody<TeaAttributesInfo> responseBody = new ResponseBody<>();
        responseBody.setData(this.attributeService.queryAttributesByAttrId(attrId));
        return responseBody;
    }
}
