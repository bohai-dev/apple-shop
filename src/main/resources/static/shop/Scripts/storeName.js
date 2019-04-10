 $(function (){
        try {
            var href = window.location.href;
            console.log(href);
            var addr = href.split("?");
            var addrVal = addr[1].split("=");
            var storeNo = addrVal[1];
            // $.post('queryStoreInfo/{storeNo}', {storeNo: storeNo}, function(data) {
            //     $("#store").text(data.cnStoreName);
            // }); 
            console.log(storeNo);
            // $("#logout").click(function(){
            //     //        if (confirm("您确定要退出控制面板吗？"))
            //     top.location = "Login.html";
            //     return false;
            // })
                
            if (!storeNo) {
                window.location.href = "./login.html";
            }     
            $.ajax({
                type: 'GET',
                url: 'http://47.101.136.194:8089/queryStoreInfo/'+storeNo,
                // contentType:"application/json",
                // data:JSON.stringify(storeNo),
                success:function(msg){
                    //alert(msg);
                    console.log(msg);
                    if(msg.rspCode==00000){
                        console.log(msg.data.cnStoreName);
                        $("#store").text(msg.data.cnStoreName);   
                        $("#userName").text(msg.data.storeUserName);
                    }else{
                        alert(msg.cnErrorMsg);
                        }
                        
                },
                error:function(xhr){
                    console.log(xhr)
                }
            })
        } catch (error) {
            window.location.href = "./login.html"
        }
            // var href = window.location.href;
            // console.log(href);
            // var addr = href.split("?");
            // var addrVal = addr[1].split("=");
            // var storeNo = addrVal[1];
            // // $.post('queryStoreInfo/{storeNo}', {storeNo: storeNo}, function(data) {
            // //     $("#store").text(data.cnStoreName);
            // // }); 
            // console.log(storeNo);
            // // $("#logout").click(function(){
            // //     //        if (confirm("您确定要退出控制面板吗？"))
            // //     top.location = "Login.html";
            // //     return false;
            // // })
                
            // if (!storeNo) {
            //     window.location.href = "./login.html"
            // }     
            // $.ajax({
            //     type: 'GET',
            //     url: 'http://47.101.136.194:8089/queryStoreInfo/'+storeNo,
            //     // contentType:"application/json",
            //     // data:JSON.stringify(storeNo),
            //     success:function(msg){
            //         //alert(msg);
            //         console.log(msg);
            //         if(msg.rspCode==00000){
            //             console.log(msg.data.cnStoreName);
            //             $("#store").text(msg.data.cnStoreName);   
            //             $("#userName").text(msg.data.storeUserName);
            //         }else{
            //             alert(msg.cnErrorMsg);
            //             }
                        
            //     },
            //     error:function(xhr){
            //         console.log(xhr)
            //     }
            // })
            
 });