package com.milktea.milkteashop.service;

import com.milktea.milkteashop.domain.AppStandard;
import com.milktea.milkteashop.exception.MilkTeaException;

import java.util.List;

/**
 * Cteated by cxy on 2018/10/17
 */
public interface AppStandardService {

     int addStanard(AppStandard appStandard) throws MilkTeaException;

     int deleteStandard(String id);

     int updataStandard(AppStandard appStandard) throws MilkTeaException;

     AppStandard selectById(String id);

     List<AppStandard> selectByGoodsId(String id);

}
