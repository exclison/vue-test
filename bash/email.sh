#!/bin/bash
for yuming in `cat ./domain.txt` #读取存储了需要监测的域名的文件
do
    echo $yuming
    END_TIME=$(echo | openssl s_client -servername $yuming  -connect $yuming:443 2>/dev/null | openssl x509 -noout -dates |grep 'After'| awk -F '=' '{print $2}'| awk -F ' +' '{print $1,$2,$4 }' )
    echo $END_TIME
    #使用openssl获取域名的证书情况，然后获取其中的到期时间
    END_TIME1=$(date +%s -d "$END_TIME") #将日期转化为时间戳
    echo $END_TIME1
    NOW_TIME=$(date +%s -d "$(date | awk -F ' +'  '{print $2,$3,$6}')") #将目前的日期也转化为时间戳
    
    a=`expr $END_TIME1 - $NOW_TIME`
    a=`expr $a / 60`
    a=`expr $a / 60`
    a=`expr $a / 24`
    # a=$(($(($END_TIME1-$NOW_TIME))/(60*60*24))) 到期时间减去目前时间再转化为天数
    echo $a

#    if [ $a  -lt 14  ];  #当到期时间小于14天时发邮件告警
#    then   
        
#         # python mail.py 目标邮箱名 "服务器证书过期提醒"  "域名证书 $yuming  剩下 $a 天过期，请迅速更新"
#     fi
done