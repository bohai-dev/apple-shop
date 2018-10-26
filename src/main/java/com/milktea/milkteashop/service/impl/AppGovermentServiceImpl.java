package com.milktea.milkteashop.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.milktea.milkteashop.dao.AppGovernmentMapper;
import com.milktea.milkteashop.dao.TeaClassInfoMapper;
import com.milktea.milkteashop.domain.AppGovernment;
import com.milktea.milkteashop.exception.MilkTeaErrorConstant;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.service.AppGovermentService;
import com.milktea.milkteashop.vo.PageRequestVo;
import com.milktea.milkteashop.vo.PageResponseVo;
import com.milktea.milkteashop.vo.ResponseBody;

@Service("appGovermentService")
public class AppGovermentServiceImpl implements AppGovermentService {
    
    static Logger logger = LoggerFactory.getLogger(AppGovermentServiceImpl.class);

    @Autowired
    private AppGovernmentMapper governmentMapper;
    
    @Autowired
    private TeaClassInfoMapper classInfoMapper; 
    
    @Override
    public void save(AppGovernment appGovernment) throws MilkTeaException {
        
        if(appGovernment == null){
            throw new MilkTeaException(MilkTeaErrorConstant.PARAMETER_REQUIRED);
        }
        
        if(StringUtils.isBlank(appGovernment.getTitle())){
            
        }
        
        appGovernment.setId(this.classInfoMapper.generateClassId());
        appGovernment.setCreateTime(new Date());
        try {
            this.governmentMapper.insertSelective(appGovernment);
        } catch (Exception e) {
            logger.error("插入政府信息失败",e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE);
        }
        
    }

    @Override
    public void modify(AppGovernment appGovernment) throws MilkTeaException {
        
        if(appGovernment == null){
            throw new MilkTeaException(MilkTeaErrorConstant.PARAMETER_REQUIRED);
        }
        
        if(StringUtils.isBlank(appGovernment.getId())){
            
        }
        
        if(StringUtils.isBlank(appGovernment.getTitle())){
            
        }
        //更新时间
        appGovernment.setUpdateTime(new Date());
        try {
            this.governmentMapper.updateByPrimaryKey(appGovernment);
        } catch (Exception e) {
            logger.error("更新政府信息失败",e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE);
        }
        

    }

    @Override
    public void remove(String id) throws MilkTeaException {
        
        if(StringUtils.isBlank(id)){
            
        }
        
        try {
            this.governmentMapper.deleteByPrimaryKey(id);
        } catch (Exception e) {
            logger.error("删除政府信息失败",e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE);
        }

    }

    @Override
    public PageResponseVo<AppGovernment> query(PageRequestVo pageRequestVo) throws MilkTeaException {
        
        if(pageRequestVo == null){
            throw new MilkTeaException(MilkTeaErrorConstant.PARAMETER_REQUIRED);
        }
        
        if(pageRequestVo.getPageNumber() == null){
            throw new MilkTeaException(MilkTeaErrorConstant.PAGE_NUMBER_REQUIRED);
        }

        if(pageRequestVo.getPageSize() == null){
            throw new MilkTeaException(MilkTeaErrorConstant.PAGE_SIZE_REQUIRED);
        }
        PageResponseVo<AppGovernment> pageResponseVo = new PageResponseVo<>();
        try {
            PageHelper.startPage(pageRequestVo.getPageNumber(), pageRequestVo.getPageSize());
            List<AppGovernment> list = this.governmentMapper.selectAll();
            
            Page<AppGovernment> page = (Page<AppGovernment>)list;
            pageResponseVo.setTotal(page.getTotal());
            pageResponseVo.setRows(list);
            page.close();
        } catch (Exception e) {
            logger.error("查询政府信息失败",e);
            throw new MilkTeaException(MilkTeaErrorConstant.UNKNOW_EXCEPTION);
        }
        return pageResponseVo;
    }

    @Override
    public AppGovernment queryGoverment(String id) throws MilkTeaException {
        
        return this.governmentMapper.selectByPrimaryKey(id);
    }

}
