package com.milktea.milkteashop.vo;

import java.util.Date;
import java.util.List;

/**
 * 分类商店
 * @author caojia
 *
 */
public class ClassStoreVo {
    
    private String classId;

    private String className;

    private String classLogo;

    private Short indexNo;

    private String deleteFlag;

    private Date updateTime;
    
    private List<TeaStoreInfoNationVo> stores;

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getClassLogo() {
        return classLogo;
    }

    public void setClassLogo(String classLogo) {
        this.classLogo = classLogo;
    }

    public Short getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Short indexNo) {
        this.indexNo = indexNo;
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public List<TeaStoreInfoNationVo> getStores() {
        return stores;
    }

    public void setStores(List<TeaStoreInfoNationVo> stores) {
        this.stores = stores;
    }
    
}
