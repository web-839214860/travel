<template>
    <div>

        <el-form :model="sceneryeditForm" :rules="rules" ref="sceneryeditForm"  label-width="93px" class="sceneryeditForm">

			<el-form-item label="景点名称" prop="s_name">
				<el-input clearable type="text" v-model="sceneryeditForm.s_name" :disabled="true" ></el-input>
			</el-form-item>

            <el-form-item label="景点简介" prop="s_synopsis">
				<el-input clearable type="textarea" autosize v-model="sceneryeditForm.s_synopsis" ></el-input>
			</el-form-item>

            <el-form-item label="景点位置" prop="s_place">
				<el-input clearable type="text" v-model="sceneryeditForm.s_place" ></el-input>
			</el-form-item>

            <el-form-item label="联系电话" prop="s_phone">
				<el-input clearable type="text" v-model="sceneryeditForm.s_phone" ></el-input>
			</el-form-item>

            <el-form-item label="容纳人数" prop="s_num">
				<el-input clearable type="number" min="0" v-model="sceneryeditForm.s_num" ></el-input>
			</el-form-item>

            <el-form-item label="可参观人数" prop="s_numquota">
				<el-input clearable type="number" min="0" :max="sceneryeditForm.s_num" v-model="sceneryeditForm.s_numquota" ></el-input>
			</el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="sceneryedit('sceneryeditForm')" >修改</el-button>
                <el-button type="danger" class="login_button" @click="$refs['sceneryeditForm'].resetFields()">重置</el-button>
            </div>

        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            const validateAcquaintance = (rule, value, callback) => {
                if (value < 0) {
                    callback(new Error('必须大于或等于0'))
                } else {
                    callback()
                }
            }
            const validateAcquaintances = (rule, value, callback) => {
                if (value < 0) {
                    callback(new Error('必须大于或等于0'))
                } else if (value > this.sceneryeditForm.s_num) {
                    callback(new Error('必须小于或等于容纳人数'))
                } else {
                    callback()
                }
            }
            return {
                sceneryeditForm:{},
                rules: {
                    s_place: [
                        { required: true, message: '请填写景点位置', trigger: 'blur' },
                    ],
                    s_num: [
                        { required: true, message: '请填写景点容纳人数', trigger: 'blur' },
                        { validator: validateAcquaintance, trigger: 'blur' }
                    ],
                    s_numquota:[
                        { required: true, message: '请填写景点可参观人数', trigger: 'blur' },
                        { validator: validateAcquaintances, trigger: 'blur' }
                    ],
				}
            }
        },
        created() {
            this.getonesceneryinfo(this.$route.params.id)
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            getonesceneryinfo(s_name){
                this.$api.scenery.getonesceneryinfo(s_name).then(res =>{
                    //console.log(res)
                    if(res.code==1){
                        this.sceneryeditForm=res.data.onesceneryinfo
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            sceneryedit(sceneryeditForm){
                this.$refs[sceneryeditForm].validate((valid) => {
                    if (valid) {
                        let sceneryinfo = this.sceneryeditForm;
                        this.$api.scenery.putonesceneryinfo(sceneryinfo,this.$route.params.id).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                this.showMessage('success',res.data.message)
                                this.$router.push({ path: '/sceneryinfo' })
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
.sceneryeditForm{
	position: absolute;
	top: 55%;
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