package com.milktea.milkteashop.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.milktea.milkteashop.domain.TeaStoreInfo;
import com.milktea.milkteashop.vo.UserLoginRequestVo;
@Mapper
public interface TeaStoreInfoMapper {
    int deleteByPrimaryKey(String storeNo);

    int insert(TeaStoreInfo record);

    int insertSelective(TeaStoreInfo record);

    TeaStoreInfo selectByPrimaryKey(String storeNo);

    int updateByPrimaryKeySelective(TeaStoreInfo record);

    int updateByPrimaryKey(TeaStoreInfo record);
    
    @Select(value="select * from TEA_STORE_INFO  order by UPDATE_TIME")
    List<TeaStoreInfo> selectAll();
    
    List<TeaStoreInfo> selectByCondition(TeaStoreInfo storeInfo);
    
    TeaStoreInfo selectByUserNameAndPasswd(UserLoginRequestVo requestVo);
    
    @Select(value="select 'D'||lpad(TEA_STORE_NO_SEQ.NEXTVAL,5,'0') from dual")
    String generateStoreNo();
    
    @Select(value="select * from TEA_STORE_INFO where CN_STORE_NAME = #{storeName} and DELETE_FLAG = '0'")
    TeaStoreInfo selectByCnStoreName(String storeName);
    
    @Select(value="select * from TEA_STORE_INFO where US_STORE_NAME = #{storeName} and DELETE_FLAG = '0'")
    TeaStoreInfo selectByUsStoreName(String storeName);
    
    @Update(value="update TEA_STORE_INFO set IS_DEFAULT = '0' where STORE_NO != #{storeNo} and DELETE_FLAG = '0'")
    int updateDefaultByStoreNo(String storeNo);
    
    @Select(value="select count(1) from TEA_STORE_INFO where STORE_USER_NAME = #{userName}")
    Long countByStoreUserName(String userName);
    
    @Select(value="select count(1) from TEA_STORE_INFO where CN_STORE_NAME = #{storeName} and DELETE_FLAG = '0' and STORE_NO != #{storeNo}")
    Long countOtherByCnStoreName(@Param("storeNo")String storeNo, @Param("storeName")String storeName);
    
    @Select(value="select count(1) from TEA_STORE_INFO where US_STORE_NAME = #{storeName} and DELETE_FLAG = '0' and STORE_NO != #{storeNo}")
    Long countOtherByUsStoreName(@Param("storeNo")String storeNo, @Param("storeName")String storeName);
    
    @Select(value="select count(1) from TEA_STORE_INFO where STORE_USER_NAME = #{userName} and STORE_NO != #{storeNo}")
    Long countOtherByStoreUserName(@Param("storeNo")String storeNo, @Param("userName")String userName);
    
    //根据分类查询店铺
    @Select(value="select * from TEA_STORE_INFO t "
            + "where exists (select 1 from TEA_GOODS_INFO t1 where t.STORE_NO = t1.STORE_NO and t1.DELETE_FLAG = '0' "
            + "and exists (select 1 from TEA_GOODS_CLASS t2 where t2.GOODS_ID = t1.GOODS_ID and t2.CLASS_ID = #{classId})) order by t.UPDATE_TIME")
    List<TeaStoreInfo> selectByClass(@Param("classId")String classId);
}