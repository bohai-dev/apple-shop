package com.milktea.milkteashop.service.impl;

import com.milktea.milkteashop.dao.AppStandardMapper;
import com.milktea.milkteashop.domain.AppStandard;
import com.milktea.milkteashop.exception.MilkTeaErrorConstant;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.service.AppStandardService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Cteated by cxy on 2018/10/17
 */
@Service
public class AppStandardServiceImpl implements AppStandardService {

    @Autowired
    AppStandardMapper standardMapper;
    /**
     * 添加规格
     * @param appStandard
     * @return
     */
    @Override
    public int addStanard(AppStandard appStandard) throws MilkTeaException{
        String standardName=appStandard.getName();

        if (StringUtils.isBlank(standardName)){
            throw new MilkTeaException(MilkTeaErrorConstant.STANDARD_NAME_REQUIRD);
        }
        List<AppStandard> list=standardMapper.selectByName(standardName);
        if (list.size()>0){
           throw new MilkTeaException(MilkTeaErrorConstant.STANDARD_NAME_EXISTS);
        }
        String id=standardMapper.generateAttrId();
        appStandard.setId(id);
        appStandard.setDeleteFlag("0");
        appStandard.setCreatedTime(new Date());
        appStandard.setUpdatedTime(new Date());
        return  standardMapper.insertSelective(appStandard);
    }


    /**
     * 删除规格
     * @param id
     * @return
     */
    @Override
    public int deleteStandard(String id) {

        int result=standardMapper.updateStatusById(id);
        return result;
    }

    /**
     * 更新规格
     * @param appStandard
     * @return
     */
    @Override
    public int updataStandard(AppStandard appStandard) throws MilkTeaException{
        String standardName=appStandard.getName();
        String id=appStandard.getId();

        if (StringUtils.isBlank(id)){
            throw new MilkTeaException(MilkTeaErrorConstant.STANDARD_ID_REQUIRED) ;
        }

        if (StringUtils.isBlank(standardName)){
            throw new MilkTeaException(MilkTeaErrorConstant.STANDARD_NAME_REQUIRD);
        }
        List<AppStandard> list=standardMapper.selectByName(standardName);
        if (list.size()>0){
            throw new MilkTeaException(MilkTeaErrorConstant.STANDARD_NAME_EXISTS);
        }
        appStandard.setUpdatedTime(new Date());
        return  standardMapper.updateByPrimaryKeySelective(appStandard);

    }

    /**
     * 根据id查询规格
     * @param id
     * @return
     */
    @Override
    public AppStandard selectById(String id) {
        return standardMapper.selectByPrimaryKey(id);
    }

    /**
     * 根据商品名称查询规格
     * @param id
     * @return
     */
    @Override
    public List<AppStandard> selectByGoodsId(String id) {
        return standardMapper.selectByGoodsId(id);
    }
}
