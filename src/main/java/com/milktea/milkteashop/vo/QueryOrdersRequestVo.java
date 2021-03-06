package com.milktea.milkteashop.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class QueryOrdersRequestVo {
    
    private String userNo;
    
    private String telephone;
    
    private String orderNo;
    
    private String lang;
    
    private String storeNo;
    //活动id
    private String promotionId;
    
    //订单类型 0:预约 1:堂吃
    private String orderType;
    
    //订单状态 0下单成功，待发货 ；1已发货，待收货 ；2用户退货；3用户确认收货，本单完成；4系统确认收货（15天后由客服联系用户后在后台确认收货），本单完成; 5用户取消订单
    private String orderStatus;
    
    //支付状态 0:待支付 1:支付成功 2:支付失败
    private String payStatus;
    
   // @JsonFormat(pattern="yyyy-MM-dd")
    private String beginDate;
    
   // @JsonFormat(pattern="yyyy-MM-dd")
    private String endDate;

    private String storeName;

    public String getPromotionId() {
        return promotionId;
    }

    public void setPromotionId(String promotionId) {
        this.promotionId = promotionId;
    }

    public String getPayStatus() {
        return payStatus;
    }

    public void setPayStatus(String payStatus) {
        this.payStatus = payStatus;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getStoreNo() {
        return storeNo;
    }

    public void setStoreNo(String storeNo) {
        this.storeNo = storeNo;
    }

    public String getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(String beginDate) {
        this.beginDate = beginDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getUserNo() {
        return userNo;
    }

    public void setUserNo(String userNo) {
        this.userNo = userNo;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }


    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    @Override
    public String toString() {
        return "QueryOrdersRequestVo{" +
                "userNo='" + userNo + '\'' +
                ", telephone='" + telephone + '\'' +
                ", orderNo='" + orderNo + '\'' +
                ", lang='" + lang + '\'' +
                ", storeNo='" + storeNo + '\'' +
                ", promotionId='" + promotionId + '\'' +
                ", orderType='" + orderType + '\'' +
                ", orderStatus='" + orderStatus + '\'' +
                ", payStatus='" + payStatus + '\'' +
                ", beginDate='" + beginDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", storeName='" + storeName + '\'' +
                '}';
    }
}
