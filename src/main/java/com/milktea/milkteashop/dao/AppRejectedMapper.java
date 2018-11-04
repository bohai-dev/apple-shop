package com.milktea.milkteashop.dao;

import com.milktea.milkteashop.domain.AppRejected;
import com.milktea.milkteashop.vo.QueryRejectedRequestVo;
import com.milktea.milkteashop.vo.RejectedAccountVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface AppRejectedMapper {

    int deleteByPrimaryKey(String id);



    int insertSelective(AppRejected record);

    AppRejected selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(AppRejected record);

    List<AppRejected> selectByConditions(QueryRejectedRequestVo vo);

    //统计结算
    RejectedAccountVo account(RejectedAccountVo rejectedAccountVo);


}