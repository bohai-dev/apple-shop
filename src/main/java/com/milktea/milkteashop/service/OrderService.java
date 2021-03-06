package com.milktea.milkteashop.service;

import java.util.List;

import com.milktea.milkteashop.exception.MilkTeaException;
import com.milktea.milkteashop.vo.ModifyOrderStatusRequestVo;
import com.milktea.milkteashop.vo.OrderNationVo;
import com.milktea.milkteashop.vo.PageRequestVo;
import com.milktea.milkteashop.vo.PageResponseVo;
import com.milktea.milkteashop.vo.QueryOrdersRequestVo;

public interface OrderService {
    
    /**
     * 根据用户名查询订单信息(支持国际化)
     * @param requestVo
     * @return
     * @throws MilkTeaException
     */
    public PageResponseVo<OrderNationVo> queryOrdersByUserNo(PageRequestVo<QueryOrdersRequestVo> requestVo) throws MilkTeaException;
    
    /**
     * 根据订单编号查询订单详情(支持国际化)
     * @param requestVo
     * @return
     * @throws MilkTeaException
     */
    public OrderNationVo queryOrderByOrderNo(QueryOrdersRequestVo requestVo) throws MilkTeaException;
    
    /**
     * 分页查询订单信息
     * @param requestVo
     * @return
     * @throws MilkTeaException
     */
    public PageResponseVo<OrderNationVo> queryOrderPage(PageRequestVo<QueryOrdersRequestVo> requestVo) throws MilkTeaException;

    /**
     * 查询需要推送的订单信息
     * @param requestVo
     * @return
     * @throws MilkTeaException
     */
    public List<OrderNationVo> queryOrder(QueryOrdersRequestVo requestVo) throws MilkTeaException;
    
    /**
     * 修改订单
     * @param requestVo
     * @throws MilkTeaException
     */
    public void modifyOrder(ModifyOrderStatusRequestVo requestVo) throws MilkTeaException;
    
    /**
     * 查询即将超时的预约单
     * @param requestVo
     * @return
     * @throws MilkTeaException
     */
    public List<OrderNationVo> queryDueOrder(QueryOrdersRequestVo requestVo) throws MilkTeaException;
}
