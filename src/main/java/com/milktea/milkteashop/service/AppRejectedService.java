package com.milktea.milkteashop.service;

import com.milktea.milkteashop.domain.AppRejected;
import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.vo.PageRequestVo;
import com.milktea.milkteashop.vo.PageResponseVo;
import com.milktea.milkteashop.vo.QueryRejectedRequestVo;

/**
 * Cteated by cxy on 2018/10/29
 */
public interface AppRejectedService {

    PageResponseVo<AppRejected> queryByPage(PageRequestVo<QueryRejectedRequestVo> pageRequestVo) throws MilkTeaException;
}
