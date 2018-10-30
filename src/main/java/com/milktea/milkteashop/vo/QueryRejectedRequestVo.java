package com.milktea.milkteashop.vo;

/**
 * Cteated by cxy on 2018/10/29
 * 退换货VO
 */
public class QueryRejectedRequestVo {

    private String storeNo;
    private String storeName;
    private String orderNo;
    private String userNo;
    private String handleStatus;   //处理状态，0待处理；1处理中；2处理成功

    public String getStoreNo() {
        return storeNo;
    }

    public void setStoreNo(String storeNo) {
        this.storeNo = storeNo;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

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

    public String getHandleStatus() {
        return handleStatus;
    }

    public void setHandleStatus(String handleStatus) {
        this.handleStatus = handleStatus;
    }

}
