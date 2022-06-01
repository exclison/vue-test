<!-- docker 镜像常用命令 -->

```bash

#列出镜像列表
docker iamges

#获取新镜像
docker pull ubuntu:18.04

#查找镜像
docker search httpd

#使用镜像
docker run httpd

#删除镜像
docker rmi hello-world

#创建镜像的两种方式
#个人理解:
#说明:创建镜像基本都是基于现有的镜像封装
# 1. 更新镜像
# 1)首先创建容器
docker run -it ubuntu /bin/bash
# 2)然后更新 完成后exit退出
apt-get update
# 3)提交镜像
# -m 提交信息 -a 作者 e21 ID exclison 镜像名
docker commit -m="has update" -a="exclison" e213wde3 exclison/ubuntu:v2

# 2. 构建镜像
# 需要Dockerfile 文件告知如何构建镜像
# FROM 指定镜像源 RUN执行命令告诉docker安装什么
cat Dockerfile
FROM centos:6.7
MAINTAINER  Fisher "fisher@sudops.com"
RUN     /bin/echo 'root:123456' |chpasswd
RUN     useradd runoob
RUN     /bin/echo 'runoob:123456' |chpasswd
RUN     /bin/echo -e "LANG=\"en_US.UTF-8\"" >/etc/default/local
EXPOSE  22
EXPOSE  80
CMD     /usr/sbin/sshd -D

# 使用docker build构建镜像
# -t 指定目标镜像名 . Dockerfile文件目录
docker build -t runoob/centos:6.7 .

#设置镜像标签
docker tag 860c279d2fec runoob/centos:dev


```