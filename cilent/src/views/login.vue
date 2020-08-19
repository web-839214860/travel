<template>
    <div>

        <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
            <van-swipe-item><img src="../../public/images/1.jpg"></van-swipe-item>
            <van-swipe-item><img src="../../public/images/2.jpg"></van-swipe-item>
            <van-swipe-item><img src="../../public/images/3.jpg"></van-swipe-item>
            <van-swipe-item><img src="../../public/images/4.jpg"></van-swipe-item>
        </van-swipe>

        <div class="title">
            景 点 预 约 平 台
        </div>

        <el-form :model="loginForm" :rules="rules" ref="loginForm"  label-width="55px" class="form">

			<el-form-item label="账 号" prop="u_userId">
				<el-input clearable type="text" placeholder="请输入账号" v-model="loginForm.u_userId" ></el-input>
			</el-form-item>

            <el-form-item label="密 码" prop="u_password">
                <el-input show-password type="password" placeholder="请输入密码" v-model="loginForm.u_password" ></el-input>
            </el-form-item>

        </el-form>

        <div class="tip"><router-link to="/register">新用户请点击前往注册</router-link></div>

        <div class="button">
            <van-button type="info" size="large" @click="login('loginForm')">登录</van-button>
        </div>

        <div class="bottom">合作平台：</div>

        <div class="image">
            <img style="width:2.5rem;height:2.5rem" src="../../public/images/1.png">
            <img style="width:2.5rem;height:2.5rem" src="../../public/images/2.png">
            <img style="width:2.5rem;height:2.5rem" src="../../public/images/3.png">
            <img style="width:2.5rem;height:2.5rem" src="../../public/images/4.png">
        </div>

    </div>
</template>

<script>
import {setLocalStorage} from '@/utils/localStorage'

    export default {
        data() {
            return {
                loginForm:{
                    u_userId: '',
                    u_password: '',
                },
                rules: {
					u_userId: [
                        { required: true, message: '请输入注册过的账号', trigger: 'blur' },
                    ],
					u_password: [
						{ required: true, message: '请输入正确密码', trigger: 'blur' }
					],
				}
            }
        },
        methods: {
            login(loginForm){
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        let logininfo = this.loginForm;
                        this.$api.user.postlogin(logininfo).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                setLocalStorage("Token",res.data.token)
                                this.$toast.success(res.data.message)
                                this.$router.push({ path: '/index' })
                            }else if(res.code ==-1){                              
                                this.$toast.fail(res.data.message)                               
                            }else if(res.code ==0){
                                this.$toast.fail(res.data.message)
                            }else if(res.code ==2){
                                this.$toast.fail("当前账号没有权限，请更换账号登录")
                            }else if(res.code ==3){
                                this.$toast.fail("当前账号没有权限，请更换账号登录")
                            }else{
                                this.$toast.fail("未知错误")
                            }
                        })
                    }
                });
            }
        }
    }
</script>

<style>
.title{
    color: rgb(69, 172, 219);
    text-align: center;
    font-size: 1.1rem;
    margin-top: 1.1rem;
}
.form{
    margin-top: 1.2rem;
    margin-left:0.8rem;
    margin-right:0.8rem;
}
.el-input__inner{
    border: none;   
}
.el-form-item{
    border-bottom: 1px solid #DCDFE6;
}
.tip{
    font-size: 0.7rem;
    margin-top: 1.5rem;
    margin-left:0.8rem;
    color: rgb(129, 127, 127);
}
a{
    color: rgb(129, 127, 127);
}
.button{
    margin: 0.8rem;
    margin-top: 1.4rem;
}
.bottom{
    font-size: 0.7rem;
    margin:0.8rem;
    margin-top: 4rem;
    color: rgb(129, 127, 127);
}
.image{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content:space-around;
    margin-top: 1.3rem;
}
</style>