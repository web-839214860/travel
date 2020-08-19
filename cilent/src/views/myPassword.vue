<template>
    <div>

        <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="onClickLeft"/>
        
        <el-form :model="passwordForm" :rules="rules" ref="passwordForm"  label-width="91px" class="form">

			<el-form-item label="原 始 密 码" prop="oldpassword">
				<el-input show-password type="password" placeholder="请输入原始密码" v-model="passwordForm.oldpassword" ></el-input>
			</el-form-item>

            <el-form-item label="新 密 码" prop="newpassword">
                <el-input show-password type="password" placeholder="请设置新密码" v-model="passwordForm.newpassword" ></el-input>
            </el-form-item>

            <el-form-item label="确 认 密 码" prop="newpassword2">
				<el-input show-password type="password" placeholder="请确认新密码" v-model="passwordForm.newpassword2" ></el-input>
			</el-form-item>

        </el-form>

        <div class="button">
            <van-button type="info" size="large" @click="submitForm('passwordForm')">确认修改</van-button>
        </div>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')

    export default {
        data(){
            //表单发送之前验证
            let validateNewPassword = (rule, value, callback) => {
                if (value === this.passwordForm.oldpassword) {
                    callback(new Error('新密码不能与原始密码相同!'))
                    } else {
                        callback()
                    }
                }
            let validateNewPassword2 = (rule, value, callback) => {
                if (value !== this.passwordForm.newpassword) {
                    callback(new Error('与设置的新密码不一致!'))
                    } else{
                        callback()
                    }
                }
            return {
                u_userId:'',
                passwordForm: {
                    u_userId:this.$store.state.user.u_userId,
                    oldpassword: '',
                    newpassword: '',
                    newpassword2:''
                },
                rules: {
                    oldpassword: [
                        { required: true, message: '请输入原始密码', trigger: 'blur' }
                    ],
                    newpassword: [
                        { required: true, message: '请设置新密码', trigger: 'blur' },
                        { validator: validateNewPassword, trigger: 'blur' }
                    ],
                    newpassword2: [
                        { required: true, message: '请确认新密码', trigger: 'blur' },
                        { validator: validateNewPassword2, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            submitForm(passwordForm) {
                this.$refs[passwordForm].validate((valid) => {
                    if (valid) {
                        let passwordinfo = this.passwordForm;
                        this.$api.user.putpassword(passwordinfo).then(res =>{
                            if(res.code == -1){
                                this.$toast.fail(res.data.message)
                            }else if(res.code == 1){
                                this.$toast.success(res.data.message)
                                this.$options.methods.LogOut.bind(this)()
                            }else{
                                this.$toast.fail("未知错误")
                            }
                        })
                    }
                });
            },
            ...mapActions(
                ['LogOut']  // 语法糖,相当于this.$store.dispatch('modifyName'),提交这个方法
            )
        }
    }
</script>

<style lang="scss" scoped>

</style>