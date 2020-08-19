<template>
    <div>

        <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="onClickLeft"/>

         <el-form :model="registerForm" :rules="rules" ref="registerForm"  label-width="55px" class="form">

			<el-form-item label="账 号" prop="u_userId">
				<el-input clearable type="text" placeholder="请设置账号" v-model="registerForm.u_userId" ></el-input>
			</el-form-item>

            <el-form-item label="昵 称" prop="u_name">
				<el-input clearable type="text" placeholder="请填写昵称" v-model="registerForm.u_name" ></el-input>
			</el-form-item>

            <el-form-item label="性 别" prop="u_sex">
                <el-select v-model="registerForm.u_sex" placeholder="请填写性别" style="width:295px">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="城 市" prop="u_position">
				<el-input clearable type="text" placeholder="请填写城市" v-model="registerForm.u_position" ></el-input>
			</el-form-item>

            <el-form-item label="密 码" prop="u_password">
                <el-input show-password type="password" placeholder="请设置密码" v-model="registerForm.u_password" ></el-input>
            </el-form-item>

        </el-form>

        <div class="buttons">
            <van-row gutter="20">
                <van-col span="12"><van-button type="info" size="large" @click="register('registerForm')" >马上注册</van-button></van-col>
                <van-col span="12"><van-button type="info" size="large" url="/" >返回登录</van-button></van-col>
            </van-row>        
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                registerForm:{
                    u_userId: '',
                    u_name: '',
                    u_sex: '',
                    u_position: '',
                    u_password: '',
                },
                rules: {
                    u_userId: [
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        { min: 4, max: 10, message: '长度在 4 到 10 位数字或字母', trigger: 'blur' }
                    ],
                    u_name: [
                        { required: true, message: '请填写昵称', trigger: 'blur' }
                    ],
                    u_sex: [
                        { required: true, message: '请填写性别', trigger: 'blur' }
                    ],
                    u_position: [
                        { required: true, message: '请填写城市', trigger: 'blur' }
                    ],
                    u_password: [
                        { required: true, message: '请填写密码', trigger: 'blur' }
                    ],
				}
                  
            }
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            register(registerForm){
                this.$refs[registerForm].validate((valid) => {
                    if (valid) {
                        let regisierinfo = this.registerForm;
                        this.$api.user.postuser(regisierinfo).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                this.$toast.success(res.data.message)
                            }else if(res.code ==-1){                              
                                this.$toast.fail(res.data.message)                               
                            }else{
                                this.$toast.fail("未知错误")
                            }
                        })
                    }
                });
            }
        },
    }
</script>

<style>
.buttons{
    margin: 0.8rem;
    margin-top: 1.6rem;
}
</style>