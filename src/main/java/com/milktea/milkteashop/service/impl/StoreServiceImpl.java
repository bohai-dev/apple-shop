package com.milktea.milkteashop.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.milktea.milkteashop.dao.TeaStoreInfoMapper;
import com.milktea.milkteashop.domain.TeaStoreInfo;
import com.milktea.milkteashop.exception.MilkTeaErrorConstant;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.service.StoreService;
import com.milktea.milkteashop.vo.TeaStoreInfoNationVo;

@Service("storeService")
public class StoreServiceImpl implements StoreService {
    
    static Logger logger = LoggerFactory.getLogger(StoreServiceImpl.class);
    
    @Autowired
    private TeaStoreInfoMapper storeInfoMapper;
    
    @Override
    public List<TeaStoreInfo> queryStoreInfo(TeaStoreInfo storeInfo) throws MilkTeaException {
        
        List<TeaStoreInfo> stores = null;
        try {
            stores = this.storeInfoMapper.selectByCondition(storeInfo);
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        
        if(storeInfo != null){
            for (TeaStoreInfo teaStoreInfo : stores) {
                teaStoreInfo.setLogo(teaStoreInfo.getUsStorePicture());
            }
        }
        return stores;
    }

    @Override
    public TeaStoreInfo queryStoreInfo(String storeNo) throws MilkTeaException {

        if(storeNo == null){
            throw new MilkTeaException(MilkTeaErrorConstant.STORE_NO_REQUIRED);
        }
        
        TeaStoreInfo storeInfo = null;
        try {
            storeInfo = this.storeInfoMapper.selectByPrimaryKey(storeNo);
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        storeInfo.setLogo(storeInfo.getUsStorePicture());
        return storeInfo;
    }

    @Override
    @Transactional(rollbackFor=MilkTeaException.class)
    public void addStoreInfo(TeaStoreInfo storeInfo) throws MilkTeaException {

        if(storeInfo == null){
            throw new MilkTeaException(MilkTeaErrorConstant.PARAMETER_REQUIRED);
        }
        
        if(StringUtils.isBlank(storeInfo.getCnStoreName())){
            throw new MilkTeaException(MilkTeaErrorConstant.CN_STORE_NAME_REQUIRED);
        }
        
        if(StringUtils.isBlank(storeInfo.getStoreUserName())){
            throw new MilkTeaException(MilkTeaErrorConstant.STORE_USER_NAME_REQUIRED);
        }
        
        if(StringUtils.isBlank(storeInfo.getStorePasswd())){
            throw new MilkTeaException(MilkTeaErrorConstant.STORE_PASSWORD_REQUIRED);
        }
        
        TeaStoreInfo info = null;
        try {
            info = this.storeInfoMapper.selectByCnStoreName(storeInfo.getCnStoreName());
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        if(info != null){
            logger.warn(MilkTeaErrorConstant.CN_STORE_NAME_EXISTS.getCnErrorMsg());
            throw new MilkTeaException(MilkTeaErrorConstant.CN_STORE_NAME_EXISTS);
        }
        
        
        Long count = null;
        
        try {
            count = this.storeInfoMapper.countByStoreUserName(storeInfo.getStoreUserName());
            
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        
        if(count > 0){
            throw new MilkTeaException(MilkTeaErrorConstant.STORE_USER_NAME_EXISTS);
        }
        
        String storeNo = "";
        try {
            storeNo = this.storeInfoMapper.generateStoreNo();
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        
        storeInfo.setUsStorePicture(storeInfo.getLogo());
        storeInfo.setUpdateTime(new Date());
        try {
            storeInfo.setStoreNo(storeNo);
            this.storeInfoMapper.insertSelective(storeInfo);
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }

    }

    @Override
    @Transactional(rollbackFor=MilkTeaException.class)
    public void modifyStoreInfo(TeaStoreInfo storeInfo) throws MilkTeaException {
        
        
        if(storeInfo == null || storeInfo.getStoreNo() == null){
            throw new MilkTeaException(MilkTeaErrorConstant.STORE_NO_REQUIRED);
        }
        
        if(StringUtils.isBlank(storeInfo.getCnStoreName())){
            throw new MilkTeaException(MilkTeaErrorConstant.CN_STORE_NAME_REQUIRED);
        }
        
        if(StringUtils.isBlank(storeInfo.getStoreUserName())){
            throw new MilkTeaException(MilkTeaErrorConstant.STORE_USER_NAME_REQUIRED);
        }
        
        if(StringUtils.isBlank(storeInfo.getStorePasswd())){
            throw new MilkTeaException(MilkTeaErrorConstant.STORE_PASSWORD_REQUIRED);
        }
        
        Long count = null;
        try {
            count = this.storeInfoMapper.countOtherByCnStoreName(storeInfo.getStoreNo(), storeInfo.getCnStoreName());
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        if(count > 0){
            logger.warn(MilkTeaErrorConstant.CN_STORE_NAME_EXISTS.getCnErrorMsg());
            throw new MilkTeaException(MilkTeaErrorConstant.CN_STORE_NAME_EXISTS);
        }
        
        
        try {
            count = this.storeInfoMapper.countOtherByStoreUserName(storeInfo.getStoreNo(),storeInfo.getStoreUserName());
            
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        
        if(count > 0){
            throw new MilkTeaException(MilkTeaErrorConstant.STORE_USER_NAME_EXISTS);
        }
        
        storeInfo.setUsStorePicture(storeInfo.getLogo());
        try {
            this.storeInfoMapper.updateByPrimaryKey(storeInfo);
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        
    }

    @Override
    public void removeStore(String storeNo) throws MilkTeaException {
        
        if(storeNo == null){
            throw new MilkTeaException(MilkTeaErrorConstant.STORE_NO_REQUIRED);
        }
        try {
            this.storeInfoMapper.deleteByPrimaryKey(storeNo);
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
    }

    @Override
    public List<TeaStoreInfoNationVo> queryStoreInfoByLang(String lang) throws MilkTeaException {
        
        if(StringUtils.isBlank(lang)){
            throw new MilkTeaException(MilkTeaErrorConstant.LANG_REQUIRED);
        }
        List<TeaStoreInfoNationVo> vos = null;
        
        List<TeaStoreInfo> stores = null;
        try {
            stores = this.storeInfoMapper.selectAll();
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        if(stores != null && stores.size() > 0){
            vos = new ArrayList<>();
            for (TeaStoreInfo teaStoreInfo : stores) {
                TeaStoreInfoNationVo target = new TeaStoreInfoNationVo();
                BeanUtils.copyProperties(teaStoreInfo, target);
                target.setStoreName(teaStoreInfo.getCnStoreName());
                target.setStoreCity(teaStoreInfo.getCnStoreCity());
                target.setStoreAddress(teaStoreInfo.getCnStoreAddress());
                target.setStoreIntroduction(teaStoreInfo.getCnStoreIntroduction());
                target.setStorePicture(teaStoreInfo.getCnStorePicture());
                vos.add(target);
            }
        }
        
        return vos;
    }

}
