package com.milktea.milkteashop.utils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.milktea.milkteashop.vo.AccountRequestVo;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HttpUtilsTest {

   @Test
   public void  getTest(){
       String url="http://localhost:8080/contactUs/findOne";
       try {
           String content=HttpUtil.get(url);
           CompanyUser user=JsonUtil.parseStrToClass(content,CompanyUser.class);
           System.out.println(user);
       } catch (Exception e) {
           e.printStackTrace();
       }

   }

    @Test
    public void  jsonToListTest(){

        String url="http://localhost:8080/contactUs/findList";  //返回jsonArray   List<CompanyUser> findList()
        try {
            String content=HttpUtil.get(url);
            List<CompanyUser> userList=JsonUtil.parseStrToList(content,CompanyUser.class);
            userList.forEach(user->System.out.println(user.getUserName()+":"+user.getPassword()));
        } catch (Exception e) {
            e.printStackTrace();
        }

   }

   @Test
    public void postTest(){

       String url="http://192.168.16.42:8088/queryClassGoods";
       Map<String,String> map=new HashMap<>();
       map.put("storeNo", "D00005");
       map.put("classType", null);
       try {
           String res=HttpUtil.post(url,map);
           System.out.println(res);
       } catch (Exception e) {
           e.printStackTrace();
       }

   }

   @Test
    public void createJsonStr(){
       AccountRequestVo accountRequestVo=new AccountRequestVo();
       String jsonStr=JSON.toJSONString(accountRequestVo,SerializerFeature.WriteMapNullValue);
       System.out.println(jsonStr);

   }
}
