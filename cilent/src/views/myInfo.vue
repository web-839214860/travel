<template>
    <div>

        <van-nav-bar title="个人资料" left-text="返回" left-arrow @click-left="onClickLeft"/>
        
        <van-cell-group>
            <van-cell title="账号" ><div class="cell">{{u_userId}}</div></van-cell>
            <van-cell title="昵称" ><div class="cell">{{u_name}}</div></van-cell>
            <van-cell title="性别" ><div class="cell">{{u_sex}}</div></van-cell>
            <van-cell title="城市" ><div class="cell">{{u_position}}</div></van-cell>
        </van-cell-group>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')
    export default {
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
        },
        computed:{
            ...mapState({
                u_userId:state=>state.u_userId,
                u_name:state=>state.u_name,
                u_sex:state=>state.u_sex,
                u_position:state=>state.u_position,
            })
        }
    }
</script>

<style>
.cell{
    font-size: 0.75rem;
    color: rgb(158, 158, 158)
}

</style>