package com.milktea.milkteashop.dao;

import com.milktea.milkteashop.domain.AppGovernment;

public interface AppGovernmentMapper {
    int deleteByPrimaryKey(String id);

    int insert(AppGovernment record);

    int insertSelective(AppGovernment record);

    AppGovernment selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(AppGovernment record);

    int updateByPrimaryKey(AppGovernment record);
}