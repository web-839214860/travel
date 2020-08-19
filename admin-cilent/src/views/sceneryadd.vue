<template>
    <div id="sceneryadd">

        <el-form :model="sceneryaddForm" :rules="rules" ref="sceneryaddForm"  label-width="93px" class="forms">

			<el-form-item label="景点名称" prop="s_name">
				<el-input clearable type="text" v-model="sceneryaddForm.s_name" ></el-input>
			</el-form-item>

            <el-form-item label="景点简介" prop="s_synopsis">
                <el-input clearable type="textarea" autosize v-model="sceneryaddForm.s_synopsis" ></el-input>
            </el-form-item>

            <el-form-item label="景点位置" prop="s_place">
				<el-input clearable type="text" v-model="sceneryaddForm.s_place" ></el-input>
			</el-form-item>

            <el-form-item label="联系电话" prop="s_phone">
				<el-input clearable type="text" v-model="sceneryaddForm.s_phone" ></el-input>
			</el-form-item>

            <el-form-item label="容纳人数" prop="s_num">
				<el-input clearable type="number" min="0"  v-model="sceneryaddForm.s_num" ></el-input>
			</el-form-item>

            <el-form-item label="可参观人数" prop="s_numquota">
				<el-input clearable type="number" min="0" :max="sceneryaddForm.s_num" v-model="sceneryaddForm.s_numquota" ></el-input>
			</el-form-item>

            <el-form-item label="景点图片">
                <el-upload ref="upload" action="" :auto-upload="false" list-type="text">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <div class="flex">
                <el-button type="primary" class="login_button" @click="sceneryadd('sceneryaddForm')" >添加</el-button>
                <el-button type="danger" class="login_button" @click="$refs['sceneryaddForm'].resetFields()">重置</el-button>
            </div>

        </el-form>

    </div>
</template>

<script>
    export default {
       
        data() {
            //表单验证
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
                } else if (value > this.sceneryaddForm.s_num) {
                    callback(new Error('必须小于或等于容纳人数'))
                }else {
                    callback()
                }
            }
            return {
                sceneryaddForm:{
                    s_name: '',
                    s_synopsis: '',
                    s_place: '',
                    s_phone: '',
                    s_num: '', 
                    s_numquota:'',
                },
                rules: {
                    s_name: [
                        { required: true, message: '请填写景点名称', trigger: 'blur' },
                    ],
                    s_synopsis: [
                        { required: true, message: '请填写景点简介', trigger: 'blur' }
                    ],
                    s_place: [
                        { required: true, message: '请填写景点位置', trigger: 'blur' }
                    ],
                    s_phone: [
                        { required: true, message: '请填写景点联系方式', trigger: 'blur' }
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
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            sceneryadd(sceneryaddForm){
                this.$refs[sceneryaddForm].validate((valid) => {
                    if (valid) {
                        const formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.uploadFiles[0]  //上传图片
                        if(file==null){
                            this.showMessage('info',"请添加图片")
                        }else{
                            formData.append('s_name', this.sceneryaddForm.s_name);
                            formData.append('s_synopsis', this.sceneryaddForm.s_synopsis);
                            formData.append('s_place', this.sceneryaddForm.s_place);
                            formData.append('s_phone', this.sceneryaddForm.s_phone);
                            formData.append('s_num', this.sceneryaddForm.s_num);
                            formData.append('s_numquota', this.sceneryaddForm.s_numquota);
                            formData.append('s_image', file.raw);
                            this.$api.scenery.postscenery(formData).then(res => {
                                //console.log(res)
                                if(res.code ==1){
                                    this.showMessage('success',res.data.message)
                                }else if(res.code ==-1){                              
                                    this.$message.error(res.data.message)                               
                                }else{
                                    this.$message.error("未知错误")
                                }
                            })
                        }
                    }
                });
            },
            
        },
        
    }
</script>

<style>
</style>