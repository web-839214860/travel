<template>
    <div>

        <van-nav-bar title="个人中心"/>
        <van-cell title="个人资料" is-link url="#/myinfo" />
        <van-cell title="修改密码" is-link url="#/myPassword" />
        <van-cell title="预约记录" is-link url="#/myRecord"><div class="cell">共 {{num}} 条</div></van-cell>

        <div class="button">
            <van-button type="info" size="large" @click="LogOut()" >退出登录</van-button>
        </div>
        
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')

    export default {
        data(){
            return{
                num:'',
            }
        },
        created(){
            this.handleOrderList();
        },
        methods:{
            handleOrderList(){
                this.$api.order.showorderinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data.length)
                        this.num=res.data.length;
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            ...mapActions(
                ['LogOut']  // 语法糖,相当于this.$store.dispatch('modifyName'),提交这个方法
            )
        }
    }
</script>

<style lang="scss" scoped>

</style>