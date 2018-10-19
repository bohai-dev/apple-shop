package com.milktea.milkteashop;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.milktea.milkteashop.domain.AppGovernment;
import com.milktea.milkteashop.domain.TeaCarouselFigure;
import com.milktea.milkteashop.domain.TeaContact;
import com.milktea.milkteashop.vo.DeductGoodsStockRequestVo;
import com.milktea.milkteashop.vo.OrderDetailsNationVo;
import com.milktea.milkteashop.vo.OrderNationVo;
import com.milktea.milkteashop.vo.PageRequestVo;
import com.milktea.milkteashop.vo.PageResponseVo;
import com.milktea.milkteashop.vo.PromotionVo;
import com.milktea.milkteashop.vo.QueryOrdersRequestVo;
import com.milktea.milkteashop.vo.ResponseBody;
import com.milktea.milkteashop.vo.TeaAttributesInfoNationVo;

public class JsonGenerate {
    
    public static void main(String[] args) {
        
        PageResponseVo<AppGovernment> pageResponseVo = new PageResponseVo<>();
        
        AppGovernment requestVo = new AppGovernment();
        List<AppGovernment> l = new ArrayList<AppGovernment>();
        l.add(requestVo);
        pageResponseVo.setRows(l);
        PageRequestVo vo = new PageRequestVo<>();
        System.out.println(JSON.toJSONString(vo,SerializerFeature.WriteMapNullValue));
    }

}
