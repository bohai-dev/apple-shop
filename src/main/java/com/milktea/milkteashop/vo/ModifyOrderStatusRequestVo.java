package com.milktea.milkteashop.vo;

public class ModifyOrderStatusRequestVo {
    
    //订单编号
    private String orderNo;
    
    //订单状态 0下单成功，待发货 ；1已发货，待收货 ；2用户退货；3用户确认收货，本单完成；4系统确认收货（15天后由客服联系用户后在后台确认收货），本单完成; 5用户取消订单
    private String orderStatus;

    //快递单号
    private String trakingNo;

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getTrakingNo() {
        return trakingNo;
    }

    public void setTrakingNo(String trakingNo) {
        this.trakingNo = trakingNo;
    }
}
