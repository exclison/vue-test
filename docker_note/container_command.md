<!-- docker 容器常用命令 -->

```bash
docker pull ubuntu #拉取镜像

#使用ubuntu 镜像启动一个容器
# -i 可交互 -t 命令行 -d 后台运行
# exit退出终端
docker run -it ubuntu:18.04 /bin/bash

#查看运行中的容器
# -a 查看全部 -l查看最新创建
docker ps 

#启动/停止/重新启动
docker start/stop/restart [ID/NAME]

#进入容器 exec退出容器不会终止容器 
#attach会终止容器
docker exec -it [ID] [COMMAND]

#导出容器
docker export [ID] > ubuntu.tar
docker export 1eo79 > ./docker/ubuntu.tar

#导入容器
cat docker/ubuntu.tar | docker import -test/ubuntu:v1

#删除容器 可一次删除多个
docker rm -f [ID/NAME] [ID/NAME]

#运行web应用
# 载入镜像
# -P 随机映射端口 -p 4999:5000指定端口
docker pull training/webapp  
docker run -d -P training/webapp python app.py

#查看端口快捷方式
docker port [ID/NAME]

#查看web应用程序日志
#-f可以查看容器内部的标准输出
docker logs [ID/NAME] -f

#查看应用程序进程
docker top [ID/NAME]

#查看底层信息
docker inspect [ID/NAME]



```