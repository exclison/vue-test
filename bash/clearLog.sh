#!/bin/bash
######################################################################
# 日志定时运行时间为每周日4点2分
# 删除7天之前的日志文件
# 日志文件时间是根据日志名称后面的日期来计算
# 运行脚本注意日志文件中是否有其他相同后缀的非日志文件和日志文件名称是否符合要求
# 其日志格式必须为 ：pro-debug-0-2019-04-13.log ， 即 *2019-04-13.log
######################################################################
 
logpathparam=/Users/Exclison/Documents/Project/vue-test/bash/log
 
clearLogByDate(){

#当前时间
currTime=$(date +"%Y-%m-%d %T")
# echo $currTime

#需要删除的日志文件所在目录
logpath=$1
days=$2
 
#删除日志的记录所在目录
outpath=/Users/Exclison/Documents/Project/vue-test/bash/out
#进入日志目录
cd $logpath
 
 
echo $currTime " 清理日志脚本执行开始 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>">> ${outpath}/catalina.out
#7天之前的日志文件删除



#获取7天之前的日期
del_date=`date +%Y-%m-%d -d "${days} days ago"`
echo $del_date
#获取文件名中的日期字符串，然后对比时间进行相应的操作
for n in `ls *.log`;do
    m=`echo $n | awk -F. '{print $(NF-1)}'`
    m=`echo ${m:0-10}`
    if [ ! $m ]; then
        continue
    fi
    if [[ $m < $del_date || $m = $del_date ]];then
        echo "file" $n "will be deleted." >> ${outpath}/catalina.out
        rm -rf $n
    fi
done
 
echo $currTime" 清理日志脚本执行结束 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>">> ${outpath}/catalina.out
echo "       ">> ${outpath}/catalina.out
echo "       ">> ${outpath}/catalina.out
}

clearLogByDate $logpathparam 7
