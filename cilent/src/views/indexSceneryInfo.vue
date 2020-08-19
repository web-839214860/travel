<template>
    <div>

        <van-nav-bar title="景点信息" left-text="返回" left-arrow @click-left="onClickLeft"/>
        
        <div><img :src="sceneryForm.s_image" width="100%" height="100%"/></div>

        <div class="content">

            <div class="name">{{sceneryForm.s_name}}</div>

            <van-row>
                <van-col span="4" style="color:#A9A9A9">介绍：</van-col>
                <van-col span="20">{{sceneryForm.s_synopsis}}</van-col>
            </van-row>

            <van-row>
                <van-col span="4" style="color:#A9A9A9">电话：</van-col>
                <van-col span="9">{{sceneryForm.s_phone}}</van-col>
                <van-col span="5" style="color:#A9A9A9">地址：</van-col>
                <van-col span="6">{{sceneryForm.s_place}}</van-col>
            </van-row>

            <van-row>
                <van-col span="7" style="color:#A9A9A9">容纳人数：</van-col>
                <van-col span="6">{{sceneryForm.s_num}}</van-col>
                <van-col span="6" style="color:#A9A9A9">剩余数量：</van-col>
                <van-col span="5">{{sceneryForm.s_numquota}}</van-col>
            </van-row>

            <div class="sceneryForm_button">
                <van-button type="info" size="large" @click="onClick(sceneryForm.s_name)">前往预约</van-button>
            </div>

        </div>
           
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sceneryForm:{}
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
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            onClick(val){
                this.$router.push({path:'/indexOrder/'+val})
            },
        }
    }
</script>

<style>
.content{
    font-size: 0.8rem;
    margin: 0.3rem;
}
.name{
    font-size: 1rem;
    margin-top: 0.45rem;
    font-weight: bold;
    color: #0f0f0f;
}
.van-col{
    margin-top: 0.7rem;
}
.sceneryForm_button{
    margin-top: 0.8rem
}
</style>