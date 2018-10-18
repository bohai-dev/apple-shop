package com.milktea.milkteashop.service;

import com.milktea.milkteashop.domain.AppGovernment;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.vo.PageRequestVo;
import com.milktea.milkteashop.vo.PageResponseVo;

/**
 * 政府宣传
 * @author caojia
 *
 */
public interface AppGovermentService {
    
    /**
     * 保存政府宣传信息
     * @param appGovernment
     * @throws MilkTeaException
     */
    public void save(AppGovernment appGovernment) throws MilkTeaException;

    /**
     * 修改政府宣传信息
     * @param appGovernment
     * @throws MilkTeaException
     */
    public void modify(AppGovernment appGovernment) throws MilkTeaException;
    
    /**
     * 删除政府宣传信息
     * @param id
     * @throws MilkTeaException
     */
    public void remove(String id) throws MilkTeaException;
    
    /**
     * 分页查询
     * @param pageRequestVo
     * @return
     * @throws MilkTeaException
     */
    public PageResponseVo<AppGovernment> query(PageRequestVo pageRequestVo) throws MilkTeaException;
    
}
