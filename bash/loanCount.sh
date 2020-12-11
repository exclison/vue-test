#!/bin/bash

#贷款计算器

#参数说明 
#$1计算类型:1 等额本金 2 等额本息
#$2本金
#$3利率
#$4月数
#$5当前月

if [ $# -lt 4 ]
then
    echo "参数不足"
    exit
fi

if [ $1 == 1 ]
then
    principal=`expr $2 / $4`
    # echo $principal
    # interest=`expr ($4-$5+1)*$3/100`
    interest=`expr $4 - $5`
    # echo $interest
    interest=$[interest + 1]
    # echo $interest
    interest=`echo "scale=4; $interest * $3 " | bc`
    # interest=$[interest * $3]
    # echo $interest
    interest=`echo "scale=4; $interest / 100 " | bc`

    # interest=$[interest / 100]
    # echo $interest
    repayment=`echo "scale=4; $principal + $interest " | bc`
    # repayment=`expr $principal+$interest`
    echo $repayment
    exit

fi

if [ $1 == 2 ]
then
    p=`echo "scale=4; $3 / 100 " | bc`
    # echo "11111"
    power=`echo "scale=4; $p + 1 " | bc`
    # echo "22222"
    echo $power


    

    power=`echo "scale=4; $power * $p " | bc`
    # echo "44444"
    echo $power


    power=`echo "scale=4; $power * $2 " | bc`
    # echo "55555"
    echo $power


    power=`echo "scale=4; $power ^ $4 " | bc`
    # echo "33333"
    echo $power


    # n=`echo "scale=4; $4 - 1 " | bc`
    # echo "66666"

    i=`echo "scale=4; $p + 1 " | bc`
    # echo "77777"

    i=`echo "scale=4; $i ^ $4 " | bc`
    i=`echo "scale=4; $i - 1 " | bc`
    # echo "88888"


    repayment=`echo "scale=4; $power / $i " | bc`
    # echo "99999"

    
    echo $repayment
    # echo "0.1212 ^ 12" | bc
    exit
fi