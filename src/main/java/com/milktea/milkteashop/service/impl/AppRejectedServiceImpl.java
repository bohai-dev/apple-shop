package com.milktea.milkteashop.service.impl;

import com.github.pagehelper.PageHelper;
import com.milktea.milkteashop.dao.AppRejectedMapper;
import com.milktea.milkteashop.dao.AppStandardMapper;
import com.milktea.milkteashop.domain.AppRejected;
import com.milktea.milkteashop.exception.MilkTeaErrorConstant;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.service.AppRejectedService;
import com.milktea.milkteashop.vo.PageRequestVo;
import com.milktea.milkteashop.vo.PageResponseVo;
import com.milktea.milkteashop.vo.QueryRejectedRequestVo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

/**
 * Cteated by cxy on 2018/10/29
 * 退换货 service
 */
@Service
public class AppRejectedServiceImpl implements AppRejectedService {

    @Autowired
    AppRejectedMapper   rejectedMapper;

    /**
     *  分页查询
     * @param pageRequestVo
     * @return
     * @throws MilkTeaException
     */
    public PageResponseVo<AppRejected> queryByPage(PageRequestVo<QueryRejectedRequestVo> pageRequestVo) throws MilkTeaException{

        if(pageRequestVo == null){
            throw new MilkTeaException(MilkTeaErrorConstant.PARAMETER_REQUIRED);
        }

        if(pageRequestVo.getPageNumber() == null){
            throw new MilkTeaException(MilkTeaErrorConstant.PAGE_NUMBER_REQUIRED);
        }

        if(pageRequestVo.getPageSize() == null){
            throw new MilkTeaException(MilkTeaErrorConstant.PAGE_SIZE_REQUIRED);
        }

        PageResponseVo<AppRejected> responseVo=new PageResponseVo<>();

        PageHelper.startPage(pageRequestVo.getPageNumber(), pageRequestVo.getPageSize());
        List<AppRejected> list=rejectedMapper.selectByConditions(pageRequestVo.getParams());

        responseVo.setTotal((long)(list.size()));
        responseVo.setRows(list);

        return responseVo;



    }


    public void updateRejected(AppRejected appRejected) throws MilkTeaException{

        if (StringUtils.isNotBlank(appRejected.getId())){
           throw  new MilkTeaException(MilkTeaErrorConstant.REJECTED_ID_REQUIRED);
        }

        rejectedMapper.updateByPrimaryKeySelective(appRejected);

    }




}
