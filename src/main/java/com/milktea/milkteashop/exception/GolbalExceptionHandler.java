package com.milktea.milkteashop.exception;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.milktea.milkteashop.vo.ResponseHeader;

/**
 * 全局异常处理类
 * @author caojia
 *
 */
@ControllerAdvice
public class GolbalExceptionHandler {
    /** logger */
    private static final Logger LOGGER = LoggerFactory.getLogger(GolbalExceptionHandler.class);

    @ExceptionHandler(value = MilkTeaException.class)
    @ResponseBody
    public ResponseHeader jsonErrorHandler(HttpServletRequest req, MilkTeaException e) {
        ResponseHeader header = new ResponseHeader();
        header.setRspCode(e.getErrorCode());
        header.setCnErrorMsg(e.getCnErrorMsg());
        header.setUsErrorMsg(e.getUsErrorMsg());

        LOGGER.error(e.getErrorCode()+":"+e.getCnErrorMsg());

        return header;
    }

}
