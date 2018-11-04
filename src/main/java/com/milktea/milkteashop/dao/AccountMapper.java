package com.milktea.milkteashop.dao;

import com.milktea.milkteashop.vo.AccountRequestVo;
import com.milktea.milkteashop.vo.AccountVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * Cteated by cxy on 2018/11/1
 */
@Mapper
public interface AccountMapper {

    List<AccountVo>  selectByCondition(AccountRequestVo requestVo);

}
