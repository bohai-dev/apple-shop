package com.milktea.milkteashop.vo;

import java.math.BigDecimal;

/**
 * 退货结算VO
 */
public class RejectedAccountVo {
    private String storeNo;
    private String beginTime;
    private String finishTime;
    //退换货次数
    private Integer rejectdCount;
    //退换总金额
    private BigDecimal rejectedMoney;


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

    public Integer getRejectdCount() {
        return rejectdCount;
    }

    public void setRejectdCount(Integer rejectdCount) {
        this.rejectdCount = rejectdCount;
    }

    public BigDecimal getRejectedMoney() {
        return rejectedMoney;
    }

    public void setRejectedMoney(BigDecimal rejectedMoney) {
        this.rejectedMoney = rejectedMoney;
    }

    @Override
    public String toString() {
        return "RejectedAccountVo{" +
                "storeNo='" + storeNo + '\'' +
                ", beginTime='" + beginTime + '\'' +
                ", finishTime='" + finishTime + '\'' +
                ", rejectdCount=" + rejectdCount +
                ", rejectedMoney=" + rejectedMoney +
                '}';
    }
}
