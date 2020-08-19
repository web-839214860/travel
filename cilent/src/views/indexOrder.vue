<template>
    <div>

        <van-nav-bar title="景点预约" left-text="返回" left-arrow @click-left="onClickLeft"/>

        <el-form :model="orderForm" :rules="rules" ref="orderForm"  label-width="91px" class="form">

			<el-form-item label="真 实 姓 名" prop="o_name">
				<el-input clearable type="text" placeholder="请填写真实姓名" v-model="orderForm.o_name" ></el-input>
			</el-form-item>

            <el-form-item label="联 系 方 式" prop="o_phone">
                <el-input clearable type="text" placeholder="请填写联系方式" v-model="orderForm.o_phone" ></el-input>
            </el-form-item>

        </el-form>

        <div class="button">
            <van-button type="info" size="large" @click="order('orderForm')">立即预约</van-button>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                u_userId: '',
                sceneryForm:{},
                orderForm:{
                    o_name: '',
                    o_phone: '',
                    s_name: '',
                    u_userId: this.$store.state.user.u_userId,
                },
                rules: {
                    o_name: [
                        { required: true, message: '请填写真实姓名', trigger: 'blur' }
                    ],
                    o_phone: [
                        { required: true, message: '请填写联系方式', trigger: 'blur' }
                    ],
				}
            }
        },
        created() {
            this.getonesceneryinfo(this.$route.params.id)
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            getonesceneryinfo(s_name){
                this.$api.scenery.getonesceneryinfo(s_name).then(res =>{
                    //console.log(res)
                    if(res.code==1){
                        this.sceneryForm=res.data.onesceneryinfo
                        this.orderForm.s_name=this.sceneryForm.s_name //预约表里面的景点名称
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            order(orderForm){
                this.$refs[orderForm].validate((valid) => {
                    if (valid) {
                        let orderinfo = this.orderForm;
                        this.$api.order.postorder(orderinfo).then(res => {
                            //console.log(res)
                            if(res.code ==1){
                                //this.$toast.success(res.data.message)
                                this.$router.push({ path: '/indexOrderSuccess' })
                            }else if(res.code ==0){                              
                                this.$toast.fail(res.data.message)                               
                            }else if(res.code ==-1){                              
                                this.$toast.fail(res.data.message)                               
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

<style lang="scss" scoped>

</style>