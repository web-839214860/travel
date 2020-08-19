const userDao = require('../service/user_dao')
const md5 = require('../util/tools')
const passport = require('../middlewares/passport')
const jwt = require('jsonwebtoken');
const uuid = require('../node_modules/uuid')

module.exports = {

    //登录
    postlogin: async (ctx) => {  
        const data = ctx.request.body
        const user = await userDao.getUserInfo(data.u_userId) // 查询用户,判断用户是否存在

        if (!user) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '该用户不存在,请先前往注册'
                }
            };
            return;
        }
        
        //验证密码
        let md5pass = await md5.MD5(data.u_password, user.solt)
        if (md5pass === user.u_password && user.role==3) {
            const payload = {
                u_userId: user.u_userId,
                u_name: user.u_name
            };
            //生成token
            const token = jwt.sign(payload, "gamercode", {
                expiresIn: 3600
            });
            console.log("生成token：" + token)
            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '登录成功',
                    token: 'Bearer ' + token
                }
            }
        }else if (md5pass === user.u_password && user.role == 1){ //高级管理员
            const payload = {
                u_userId: user.u_userId,
                u_name: user.u_name
            };
            //生成token
            const token = jwt.sign(payload, "gamercode", {
                expiresIn: 3600
            });
            console.log("生成token：" + token)
            ctx.status = 200;
            ctx.body = {
                code: 2,
                data: {
                    message: '登录成功',
                    token: 'Bearer ' + token
                }
            }
        }
        else if (md5pass === user.u_password && user.role == 2){ //景点管理员
            const payload = {
                u_userId: user.u_userId,
                u_name: user.u_name
            };
            //生成token
            const token = jwt.sign(payload, "gamercode", {
                expiresIn: 3600
            });
            console.log("生成token：" + token)
            ctx.status = 200;
            ctx.body = {
                code: 3,
                data: {
                    message: '登录成功',
                    token: 'Bearer ' + token
                }
            }
        }
        else{
            ctx.status = 200;
            ctx.body = {
                code: 0,
                data: {
                    message: '请输入正确的密码'
                }
            };
        }
    },

    //查看用户自身信息
    userinfo: async (ctx) => {
        console.log(ctx.state.user)
        ctx.body = {
            data: {
                message: '用户信息',
                user: ctx.state.user
            }
        };
    },

    //注册
    postuser: async(ctx)=>{  
        const data = ctx.request.body
        console.log(data);
        const msg={};
        const user = await userDao.getUserInfo(data.u_userId) // 查询用户账号是否已经注册过

        if(user == null){
            var solt = uuid.v4();
            var password = data.u_password;
            var md5Pass = await md5.MD5(password, solt);
            msg.u_userId=data.u_userId;
            msg.u_password=md5Pass;
            msg.u_name=data.u_name;
            msg.u_sex=data.u_sex;
            msg.u_position=data.u_position;
            msg.role=3;
            msg.solt = solt;
            await userDao.createUser(msg)
        
            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '注册成功'
                }
            }
        }else{
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '该账号已被注册过,请更换账号!'
                }
            }
        }
    },

    //修改密码
    putpassword: async(ctx) =>{  
        const data = ctx.request.body
        console.log(data);
        const msg={}
        // 查询用户
        const user = await userDao.getUserInfo(data.u_userId)
        console.log(user);
        //验证旧密码
        let md5pass = await md5.MD5(data.old_password, user.solt)
        console.log(md5pass);
        if (md5pass === user.u_password) {
            //修改为新密码
            var solt = uuid.v4();
            var password = data.new_password;
            var md5Pass2 = await md5.MD5(password, solt);
            msg.solt=solt;
            msg.u_password=md5Pass2;
            await userDao.updateUser(msg,data.u_userId)
            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '修改密码成功,请重新登录'
                }
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '修改错误,请确认是否输对原始密码'
                }
            };
        }
    },

    //管理员添加用户
    postoneuser:async(ctx) => {
        const data = ctx.request.body
        console.log(data);
        const msg = {};
        // 查询用户账号是否已经存在过
        const user = await userDao.getUserInfo(data.u_userId)
        if (user == null) {
            var solt = uuid.v4();
            var password = data.u_password;
            var md5Pass = await md5.MD5(password, solt);
            msg.u_userId = data.u_userId;
            msg.u_password = md5Pass;
            msg.u_name = data.u_name;
            msg.u_sex = data.u_sex;
            msg.u_position = data.u_position;
            msg.role = data.role;
            msg.solt = solt;
            await userDao.createUser(msg)

            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '添加成功'
                }
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '该账号已经存在,请勿重复添加!'
                }
            }

        }
    },

    //管理员获取所有普通用户
    getallcommoninfo:async(ctx) => {
        const alluserscommoninfo = await userDao.getAllUserCommon();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: alluserscommoninfo
        }
    },

    //管理员获取所有景点管理员
    getalladmininfo:async(ctx) => {
        const allusersadmininfo = await userDao.getAllUserAdmin();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allusersadmininfo
        }
    },

    //管理员获取所有高级管理员
    getallhighadmininfo:async(ctx) => {
        const allusershighadmininfo = await userDao.getAllUserHighAdmin();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allusershighadmininfo
        }
    },

    //管理员删除用户
    deleteuser:async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);
        const deleteuser = await userDao.delectUser(msg);
        console.log(deleteuser);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '删除成功'
            }
        }
    },

    //管理员获取需要编辑的用户的信息
    getoneuserinfo:async(ctx) => {
        const msg = ctx.params.id;
        console.log(msg);
        let oneuserinfo=await userDao.getUserInfo(msg);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '获取成功',
                oneuserinfo: oneuserinfo
            }
        }
    },

    //管理员编辑用户信息
    putoneuserinfo:async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);
        const info=ctx.request.body;
        let userInfo = {
            u_userId: info.u_userId, 
            u_password: info.u_password, 
            u_name: info.u_name, 
            u_sex: info.u_sex, 
            u_position: info.u_position, 
            role: info.role,
            solt: info.solt
        }
        var solt = uuid.v4();
        userInfo.solt = solt;
        var md5Pass = await md5.MD5(userInfo.u_password, userInfo.solt);
        userInfo.u_password = md5Pass;
        console.log(userInfo);
        let data=await userDao.updateOneUser(userInfo,msg);
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