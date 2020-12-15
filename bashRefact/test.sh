#!/bin/bash
# echo "hello world"
# myName="exclison"
# echo $myName
# # for skill in Ada Coffe Action Java; do
# #     echo "I am good at ${skill}Script"
# # done

# str="abcd"
# echo ${#str}

# arr=(1,2,3,4)
# echo ${arr[@]}
# :<<'
# 11111
# '


# echo "Shell 传递参数实例！";
# echo "执行的文件名：$0";
# echo "第一个参数为：$1";
# echo "第二个参数为：$2";
# echo "第三个参数为：$3";

a=10
b=20
val=`expr $a + $b`
echo $val
echo `expr $a + $b`

if [ $a == $b ]
then
    echo "a等于b"
fi
if [ $a != $b ]
then
    echo "a不等于b"
fi