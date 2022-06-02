<!-- 容器连接相关命令 -->

```bash

# 个人理解: 容器连接会创建一个父子关系,首先创建一个网络,所有容器都连接到这个网络

# 1. 新建网络
# -d 指定网络类型 test_net 网络名
docker network create -d bridge test_net

# 2. 运行容器并连接到网络test_net
# --name 容器名 --network网络名
docker run -itd --name test1 --network test_net ubuntu /bin/bash

docker run -itd --name test2 --network test_net ubuntu /bin/bash

# 3. 可以使用ping验证是否连接成功
# 需要安装ping 进入容器运行更新命令
docker exec -it 23df /bin/bash
apt-get update
apt install iputils-ping

# 可以更新镜像重新以更新后的镜像运行
docker commit -m "update" -a "exclison" 1e4 exclison/ubuntu1

# 使用ping测试 首先进入容器
docker exec -it 234d /bin/bash
ping test1

```