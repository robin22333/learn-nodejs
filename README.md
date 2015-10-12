# learn-nodejs
### nodejs安装
首先安装nvm,直接从 github clone nvm 到本地, 我这里使用 ~/git 目录存放 git 项目:
```bash
$ git clone https://github.com/cnpm/nvm.git
```
配置终端启动时自动执行 source ~/git/nvm/nvm.sh, 在 ~/.bashrc, ~/.bash_profile, ~/.profile, 或者 ~/.zshrc 文件添加以下命令:
```bash这里
source ~/git/nvm/nvm.sh
```
使用nvm安装nodejs,我这里安装0.12.×的版本
```bash
$ nvm install 0.12
```
这时在bash输入node,就会进入Node交互模式
```bash
$ node
>
```
###nodejs学习资料
[Node.js 包教不包会](https://github.com/alsotang/node-lessons)

[七天学会NodeJS](https://github.com/nqdeng/7-days-nodejs)
