package com.milktea.milkteashop.vo;

import java.math.BigDecimal;

/**
 * 扣减库存请求参数
 * @author caojia
 *
 */
public class DeductGoodsStockRequestVo {
    
    /**
     * 规格ID
     */
    private String standardId;
    
    /**
     * 扣减数量
     */
    private BigDecimal volume;

    public String getStandardId() {
        return standardId;
    }

    public void setStandardId(String standardId) {
        this.standardId = standardId;
    }

    public BigDecimal getVolume() {
        return volume;
    }

    public void setVolume(BigDecimal volume) {
        this.volume = volume;
    }

}
