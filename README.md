#backstage-generator
后端脚手架生成器

### 说明
- 可以选择koa2还是koa1
- 自动为文件头加入作者信息和创建日期

### 使用
现在：
```
git clone https://git.oschina.net/mrbian/koa-generator.git
cd koa-generator
npm link

// change directory
mkdir app
cd app
yo backstage
```

如果以后npm包注册成功
```
npm install -g generator-backstage
mkdir test 
cd test
yo backstage
```

### 友情提示
- 使用Webstorm将templates文件夹mark成outproject，让webstorm自动的Inspection对templates文件夹下的文件失效