<template>
    <div>

        <el-form :model="usereditForm" ref="usereditForm"  label-width="55px" class="usereditForm">

			<el-form-item label="账 号">
				<el-input v-model="usereditForm.u_userId" :disabled="true" ></el-input>
			</el-form-item>

            <el-form-item label="昵 称" prop="u_name">
				<el-input clearable type="text" v-model="usereditForm.u_name" ></el-input>
			</el-form-item>

            <el-form-item label="性 别" prop="u_sex">
                <el-select v-model="usereditForm.u_sex" style="width:295px">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="城 市" prop="u_position">
				<el-input clearable type="text" v-model="usereditForm.u_position" ></el-input>
			</el-form-item>

            <el-form-item label="身 份" prop="role">
                <el-select v-model="usereditForm.role" style="width:295px">
                    <el-option label="高级管理员" value="1"></el-option>
                    <el-option label="景点管理员" value="2"></el-option>
                    <el-option label="普通用户" value="3"></el-option>
                </el-select>
            </el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="useredit('usereditForm')" >修改</el-button>
                <el-button type="danger" class="login_button" @click="$refs['usereditForm'].resetFields()">重置</el-button>
            </div>

        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                usereditForm:{}
            }
        },
        created() {
            this.getoneuserinfo(this.$route.params.id)
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            getoneuserinfo(u_userId){
                this.$api.user.getoneuserinfo(u_userId).then(res =>{
                    //console.log(res)
                    if(res.code==1){
                        this.usereditForm=res.data.oneuserinfo
                        
                        if(this.usereditForm.role == 1){
                            this.usereditForm.role = "高级管理员"
                        } else if (this.usereditForm.role == 2){
                            this.usereditForm.role = "景点管理员"
                        }else if (this.usereditForm.role == 3){
                            this.usereditForm.role = "普通用户"
                        }

                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            useredit(usereditForm){
                this.$refs[usereditForm].validate((valid) => {
                    if (valid) {
                        let userinfo = this.usereditForm;
                        this.$api.user.putoneuserinfo(userinfo,this.$route.params.id).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                 this.showMessage('success',res.data.message)
                            }else{
                                this.$message.error("未知错误")
                            }
                        })
                    }
                });
            } 
        },
    }
</script>

<style>
.usereditForm{
	position: absolute;
	top: 50%;
    left: 55%;
	transform: translate(-50%,-50%);
	width:350px;
}
.flex{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>