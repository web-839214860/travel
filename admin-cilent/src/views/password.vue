<template>
    <div>

		<el-form :model="passwordForm" :rules="rules" ref="passwordForm"  label-width="91px" class="passwordForm">

			<el-form-item label="原 始 密 码" prop="oldpassword">
				<el-input show-password type="password" placeholder="请输入原始密码" v-model="passwordForm.oldpassword" ></el-input>
			</el-form-item>

            <el-form-item label="新 密 码" prop="newpassword">
                <el-input show-password type="password" placeholder="请设置新密码" v-model="passwordForm.newpassword" ></el-input>
            </el-form-item>

            <el-form-item label="确 认 密 码" prop="newpassword2">
				<el-input show-password type="password" placeholder="请确认新密码" v-model="passwordForm.newpassword2" ></el-input>
			</el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="submitForm('passwordForm')" >修改</el-button>
                <el-button type="danger" class="login_button" @click="$refs['passwordForm'].resetFields()">重置</el-button>
            </div>

        </el-form>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')

    export default {
        data() {
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
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            submitForm(passwordForm) {
                this.$refs[passwordForm].validate((valid) => {
                    if (valid) {
                        let passwordinfo = this.passwordForm;
                        this.$api.user.putpassword(passwordinfo).then(res =>{
                            if(res.code == -1){
                                this.$message.error(res.data.message) 
                            }else if(res.code == 1){
                                this.showMessage('success',res.data.message)
                                this.$options.methods.LogOut.bind(this)()
                            }else{
                                this.$message.error("未知错误")
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

<style>
.passwordForm{
	position: absolute;
	top: 50%;
    left: 53%;
	transform: translate(-50%,-50%);
	width:350px;
}
.flex{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>