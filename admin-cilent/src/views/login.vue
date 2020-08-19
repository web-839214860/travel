<template>
    <div class="login">

		<div class="form">

			<div class="title">
				<h3>景点预约平台后台管理系统</h3>
			</div>

                <el-form :model="loginForm" :rules="rules" ref="loginForm">

					<el-form-item prop="u_userId">
						<el-input clearable type="text" prefix-icon="el-icon-user" placeholder="用户名" v-model="loginForm.u_userId"></el-input>
					</el-form-item>

					<el-form-item prop="u_password"> 
						<el-input show-password type="password" prefix-icon="el-icon-lock" placeholder="密码" v-model="loginForm.u_password" ></el-input>
					</el-form-item>

					<el-form-item>
                        <el-button type="primary" class="login_button" @click="login('loginForm')" >登录</el-button>
                    </el-form-item>

				</el-form>
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
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
					u_password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				}
            }
		},
		methods: {
			showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            login(loginForm){
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        let logininfo = this.loginForm;
                        this.$api.user.postlogin(logininfo).then(res => {
                            //console.log(res)
                            if(res.code ==2){
                                setLocalStorage("Token",res.data.token)
                                this.showMessage('success',res.data.message)
                                this.$router.push({ path: '/' })
                            }else if(res.code ==-1){                            
                                this.showMessage('info',res.data.message)                               
                            }else if(res.code ==0){
                                this.showMessage('info',res.data.message)
                            }else if(res.code ==1){
                                this.showMessage('warning',"当前账号没有权限，请更换账号登录")
                            }else if(res.code ==3){
                                this.showMessage('warning',"当前账号没有权限，请更换账号登录")
                            }else{
                                this.$message.error("未知错误")
                            }
                        })
                    }
                });
            }
        }        
    }
</script>

<style>

.login{
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #2d3a4b;
}
.form{
	position: absolute;
	top: 50%;
    left: 50%;
	transform: translate(-50%,-50%);
	background: #fff;
	width:370px;
	border-radius: 5px;
	padding: 25px;
	text-align: center;
}
.title{
	color: #2d3a4b;
	margin-bottom: 30px;
}
.login_button{
	width:100%;
	margin-top: 5px;
}

</style>