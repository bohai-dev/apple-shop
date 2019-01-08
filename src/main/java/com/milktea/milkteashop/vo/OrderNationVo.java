package com.milktea.milkteashop.vo;

import com.alibaba.fastjson.annotation.JSONField;
import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
/**
 * 订单信息
 * @author caojia
 *
 */
public class OrderNationVo extends MessageType{
    
    private String orderNo;

    private String userNo;

    private String telephone;

    private String weixinId;

    private String promotionId;

    private String remark;

    private BigDecimal origPrice;

    private BigDecimal discount;

    private BigDecimal orderPrice;

    private String storeNo;

    //快递单号
    private String takeNo;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8" )
    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Date orderTime;

    private String orderStatus;

    private String payStatus;

    private String orderType;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @JSONField (format="yyyy-MM-dd HH:mm:ss")
    private Date makeFinishTime;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    @JSONField (format="yyyy-MM-dd HH:mm:ss")
    private Date bookTime;

    //用户收货地址
    private String postAddress;

    //用户收货电话
    private String postTel;

    //用户收货姓名
    private String postName;

    List<OrderDetailsNationVo> orderDetails;

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getUserNo() {
        return userNo;
    }

    public void setUserNo(String userNo) {
        this.userNo = userNo;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getWeixinId() {
        return weixinId;
    }

    public void setWeixinId(String weixinId) {
        this.weixinId = weixinId;
    }

    public String getPromotionId() {
        return promotionId;
    }

    public void setPromotionId(String promotionId) {
        this.promotionId = promotionId;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public BigDecimal getOrigPrice() {
        return origPrice;
    }

    public void setOrigPrice(BigDecimal origPrice) {
        this.origPrice = origPrice;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(BigDecimal orderPrice) {
        this.orderPrice = orderPrice;
    }

    public String getStoreNo() {
        return storeNo;
    }

    public void setStoreNo(String storeNo) {
        this.storeNo = storeNo;
    }

    public String getTakeNo() {
        return takeNo;
    }

    public void setTakeNo(String takeNo) {
        this.takeNo = takeNo;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getPayStatus() {
        return payStatus;
    }

    public void setPayStatus(String payStatus) {
        this.payStatus = payStatus;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public Date getMakeFinishTime() {
        return makeFinishTime;
    }

    public void setMakeFinishTime(Date makeFinishTime) {
        this.makeFinishTime = makeFinishTime;
    }

    public Date getBookTime() {
        return bookTime;
    }

    public void setBookTime(Date bookTime) {
        this.bookTime = bookTime;
    }

    public List<OrderDetailsNationVo> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetailsNationVo> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public String getPostAddress() {
        return postAddress;
    }

    public void setPostAddress(String postAddress) {
        this.postAddress = postAddress;
    }

    public String getPostTel() {
        return postTel;
    }

    public void setPostTel(String postTel) {
        this.postTel = postTel;
    }

    public String getPostName() {
        return postName;
    }

    public void setPostName(String postName) {
        this.postName = postName;
    }


}
