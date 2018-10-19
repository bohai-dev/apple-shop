package com.milktea.milkteashop.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.milktea.milkteashop.domain.AppGovernment;

@Mapper
public interface AppGovernmentMapper {
    int deleteByPrimaryKey(String id);

    int insert(AppGovernment record);

    int insertSelective(AppGovernment record);

    AppGovernment selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(AppGovernment record);

    int updateByPrimaryKey(AppGovernment record);
    
    @Select(value="select * from APP_GOVERMENT")
    List<AppGovernment> selectAll();
}