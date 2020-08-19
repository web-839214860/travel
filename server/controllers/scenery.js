const sceneryDao = require('../service/scenery_dao')

module.exports = {

    //获取景点信息
    getsceneryinfo:async (ctx) => {
        const allsceneryinfo = await sceneryDao.getAllScenery();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allsceneryinfo
        }
    },

    //删除景点信息
    deletescenery: async (ctx) => {
        const msg = ctx.params.id;
        console.log(msg);
        const deletescenery = await sceneryDao.delectScenery(msg);
        console.log(deletescenery);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '删除成功'
            }
        }
    },

    //formData 传递数据用 ctx.req 接收。
    //ctx.request:是Koa2中context经过封装的请求对象，它用起来更直观和简单。
    //ctx.req:是context提供的node.js原生HTTP请求对象。这个虽然不那么直观，但是可以得到更多的内容，适合深度编程。
    
    //添加景点信息
    postscenery: async (ctx) => {
        const data = ctx.req.body;
        const image = ctx.req.file; //接收图片
        console.log(data);
        console.log(image);
        const msg = {};
        // 查询景点是否已经存在
        const scenery = await sceneryDao.getSceneryInfo(data.s_name);
        if(scenery == null){
            msg.s_name = data.s_name;
            msg.s_synopsis = data.s_synopsis;
            msg.s_place = data.s_place;
            msg.s_phone = data.s_phone;
            msg.s_num = data.s_num;
            msg.s_numquota = data.s_numquota;
            msg.s_image = 'http://localhost:3000/' + image.filename;
            await sceneryDao.createScenery(msg)

            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '添加成功'
                }
            }
        }else{
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '该景点已在存在，请勿重复添加'
                }
            }
        }
    },

    //获取需要编辑的景点的信息
    getonesceneryinfo:async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);
        let onesceneryinfo = await sceneryDao.getSceneryInfo(msg);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '获取成功',
                onesceneryinfo: onesceneryinfo
            }
        }
    },

    //编辑景点信息
    putonesceneryinfo:async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);
        const info=ctx.request.body;
        let sceneryInfo = {
            s_name: info.s_name, 
            s_synopsis : info.s_synopsis,
            s_place : info.s_place,
            s_phone : info.s_phone,
            s_num : info.s_num,
            s_numquota : info.s_numquota,
            s_image : info.s_image,
        }
        console.log(sceneryInfo);
        let data=await sceneryDao.updateScenery(sceneryInfo,msg);
        console.log(data);

            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '修改成功',
                }
            }
    },
    
}