package com.milktea.milkteashop.vo;

import java.util.Date;

/**
 * Cteated by cxy on 2018/11/1
 * 结算VO
 */
public class AccountRequestVo {
    //开始时间
    private String beginTime;
    //结束时间
    private String finishTime;
    //店铺编号
    private String storeNo;
    //支付状态
    private String  payStatus;
    //订单状态
    private String orderStatus;

    public String getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(String finishTime) {
        this.finishTime = finishTime;
    }

    public String getStoreNo() {
        return storeNo;
    }

    public void setStoreNo(String storeNo) {
        this.storeNo = storeNo;
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

    @Override
    public String toString() {
        return "AccountRequestVo{" +
                "beginTime='" + beginTime + '\'' +
                ", finishTime='" + finishTime + '\'' +
                ", storeNo='" + storeNo + '\'' +
                ", payStatus='" + payStatus + '\'' +
                ", orderStatus='" + orderStatus + '\'' +
                '}';
    }

}
