const multer = require('koa-multer')//解析上传文件
const path = require('path')

let storage = multer.diskStorage({
	//定义文件保存路径
    destination: path.resolve('public/images'),//路径根据具体而定。如果不存在的话会自动创建一个路径
    filename: (ctx, file, cb)=>{
        cb(null, file.originalname);
    },
	//修改文件名
	filename:function(req,file,cb){
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

let upload = multer({ storage: storage});

module.exports = upload