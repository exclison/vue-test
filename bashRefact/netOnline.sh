#!/bin/bash

#测试主机是否在线

echo "请输入域名或IP地址"

read ip_num


ping -c 2 $ip_num >/dev/null

if [ $? -eq 0 ];
then

        echo "echo $ip_num is yes"

        # echo $ip_num is yes >> ip_yes.txt

else

        echo "echo $ip_num is no"

        # echo echo $ip_num is no >> ip_no.txt

fi
