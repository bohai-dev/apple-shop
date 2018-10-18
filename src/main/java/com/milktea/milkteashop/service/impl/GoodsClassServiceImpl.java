package com.milktea.milkteashop.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.milktea.milkteashop.dao.TeaClassInfoMapper;
import com.milktea.milkteashop.dao.TeaStoreInfoMapper;
import com.milktea.milkteashop.domain.TeaClassInfo;
import com.milktea.milkteashop.domain.TeaStoreInfo;
import com.milktea.milkteashop.exception.MilkTeaErrorConstant;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.service.GoodsClassService;
import com.milktea.milkteashop.vo.ClassStoreVo;
import com.milktea.milkteashop.vo.TeaStoreInfoNationVo;

@Service("goodsClassService")
public class GoodsClassServiceImpl implements GoodsClassService {
    
    static Logger logger = LoggerFactory.getLogger(GoodsClassServiceImpl.class);
    
    @Autowired
    private TeaClassInfoMapper classInfoMapper;
    
    @Autowired
    private TeaStoreInfoMapper storeInfoMapper;

    @Override
    public void addClass(TeaClassInfo classInfo) throws MilkTeaException {
        
        if(classInfo == null){
            throw new MilkTeaException(MilkTeaErrorConstant.PARAMETER_REQUIRED);
        }
        
        if(StringUtils.isBlank(classInfo.getCnClassName())){
            throw new MilkTeaException(MilkTeaErrorConstant.CN_CLASS_NAME_REQUIRED);
        }
        
        if(StringUtils.isBlank(classInfo.getUsClassName())){
            throw new MilkTeaException(MilkTeaErrorConstant.US_CLASS_NAME_REQUIRED);
        }
        
        if(StringUtils.isBlank(classInfo.getCnClassLogo())){
            throw new MilkTeaException(MilkTeaErrorConstant.CN_CLASS_LOGO_REQUIRED);
        }
        
        if(StringUtils.isBlank(classInfo.getUsClassLogo())){
            throw new MilkTeaException(MilkTeaErrorConstant.US_CLASS_LOGO_REQUIRED);
        }
        
        if(StringUtils.isBlank(classInfo.getClassType())){
            throw new MilkTeaException(MilkTeaErrorConstant.CLASS_TYPE_REQUIRED);
        }
        
        if(classInfo.getIndexNo() == null){
            throw new MilkTeaException(MilkTeaErrorConstant.INDEX_NO_REQUIRED);
        }
        
        Long count = null;
        /*try {
            count = this.classInfoMapper.countByIndexNo(classInfo.getIndexNo());
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        
        if(count > 0){
            throw new MilkTeaException(MilkTeaErrorConstant.INDEX_NO_EXISTS);
        }*/
        
        try {
            count = this.classInfoMapper.countByCnName(classInfo.getCnClassName());
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        
        if(count > 0){
            throw new MilkTeaException(MilkTeaErrorConstant.CN_CLASS_NAME_EXISTS);
        }
        
        try {
            count = this.classInfoMapper.countByUsName(classInfo.getUsClassName());
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        
        if(count > 0){
            throw new MilkTeaException(MilkTeaErrorConstant.US_CLASS_NAME_EXISTS);
        }
        
        try {
            classInfo.setClassId(this.classInfoMapper.generateClassId());
            this.classInfoMapper.insertSelective(classInfo);
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }

    }

    @Override
    public void removeClass(String classId) throws MilkTeaException {
        
        if(StringUtils.isBlank(classId)){
            throw new MilkTeaException(MilkTeaErrorConstant.CLASS_ID_REQUIRED);
        }
        
        try {
            this.classInfoMapper.deleteByPrimaryKey(classId);
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }

    }

    @Override
    public void modifyClass(TeaClassInfo classInfo) throws MilkTeaException {

        if(classInfo == null){
            throw new MilkTeaException(MilkTeaErrorConstant.PARAMETER_REQUIRED);
        }
        
        if(StringUtils.isBlank(classInfo.getClassId())){
            throw new MilkTeaException(MilkTeaErrorConstant.CLASS_ID_REQUIRED);
        }
        
        if(StringUtils.isBlank(classInfo.getCnClassName())){
            throw new MilkTeaException(MilkTeaErrorConstant.CN_CLASS_NAME_REQUIRED);
        }
        
        if(StringUtils.isBlank(classInfo.getUsClassName())){
            throw new MilkTeaException(MilkTeaErrorConstant.US_CLASS_NAME_REQUIRED);
        }
        
        if(StringUtils.isBlank(classInfo.getCnClassLogo())){
            throw new MilkTeaException(MilkTeaErrorConstant.CN_CLASS_LOGO_REQUIRED);
        }
        
        if(StringUtils.isBlank(classInfo.getUsClassLogo())){
            throw new MilkTeaException(MilkTeaErrorConstant.US_CLASS_LOGO_REQUIRED);
        }
        
        if(StringUtils.isBlank(classInfo.getClassType())){
            throw new MilkTeaException(MilkTeaErrorConstant.CLASS_TYPE_REQUIRED);
        }
        
        Long count = null;
        
        try {
            count = this.classInfoMapper.countOtherByCnName(classInfo.getClassId(),classInfo.getCnClassName());
            
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        
        if(count > 0){
            throw new MilkTeaException(MilkTeaErrorConstant.CN_CLASS_NAME_EXISTS);
        }
        
        try {
            count = this.classInfoMapper.countOtherByUsName(classInfo.getClassId(),classInfo.getUsClassName());
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        
        if(count > 0){
            throw new MilkTeaException(MilkTeaErrorConstant.US_CLASS_NAME_EXISTS);
        }
        
        try {
            this.classInfoMapper.updateByPrimaryKey(classInfo);
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }

    }

    @Override
    public List<TeaClassInfo> queryClassInfo() throws MilkTeaException {

        List<TeaClassInfo> list = null;
        try {
            list = this.classInfoMapper.selectAll();
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        return list;
    }

    @Override
    public TeaClassInfo queryClassInfo(String classId) throws MilkTeaException {

        TeaClassInfo classInfo = null;
        try {
            classInfo = this.classInfoMapper.selectByPrimaryKey(classId);
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        return classInfo;
    }

    @Override
    public List<ClassStoreVo> queryClassStore() throws MilkTeaException {
        
        List<ClassStoreVo> classStores = new ArrayList<>();
        
        List<TeaClassInfo> list = null;
        try {
            list = this.classInfoMapper.selectAll();
        } catch (Exception e) {
            logger.error(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE.getCnErrorMsg(), e);
            throw new MilkTeaException(MilkTeaErrorConstant.DATABASE_ACCESS_FAILURE, e);
        }
        
        for (TeaClassInfo teaClassInfo : list) {
            ClassStoreVo classStoreVo = new ClassStoreVo();
            classStoreVo.setClassId(teaClassInfo.getClassId());
            classStoreVo.setClassName(teaClassInfo.getCnClassName());
            classStoreVo.setClassLogo(teaClassInfo.getCnClassLogo());
            classStoreVo.setDeleteFlag(teaClassInfo.getDeleteFlag());
            classStoreVo.setIndexNo(teaClassInfo.getIndexNo());
            classStoreVo.setUpdateTime(teaClassInfo.getUpdateTime());
            
            //查询店铺
            List<TeaStoreInfo> stores = this.storeInfoMapper.selectByClass(teaClassInfo.getClassId());
            
            List<TeaStoreInfoNationVo> nationVos = new ArrayList<>();
            for (TeaStoreInfo teaStoreInfo : stores) {
                TeaStoreInfoNationVo target = new TeaStoreInfoNationVo();
                BeanUtils.copyProperties(teaStoreInfo, target);
                target.setStoreName(teaStoreInfo.getCnStoreName());
                target.setStoreCity(teaStoreInfo.getCnStoreCity());
                target.setStoreAddress(teaStoreInfo.getCnStoreAddress());
                target.setStoreIntroduction(teaStoreInfo.getCnStoreIntroduction());
                target.setStorePicture(teaStoreInfo.getCnStorePicture());
                //LOGO放这个字段
                target.setLogo(teaStoreInfo.getUsStorePicture());
                nationVos.add(target);
            }
            
            classStoreVo.setStores(nationVos);
            classStores.add(classStoreVo);
        }
        
        return classStores;
    }
    
    

}
