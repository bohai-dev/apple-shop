package com.milktea.milkteashop.service;

import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.vo.AccountRequestVo;
import com.milktea.milkteashop.vo.AccountVo;

import java.util.List;

/**
 * Cteated by cxy on 2018/11/1
 */
public interface AccountService {
    List<AccountVo> account(AccountRequestVo requestVo) throws MilkTeaException;
}
