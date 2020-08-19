<template>
    <div>

        <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft"/>

        <div class="success">

            <img style="width:3.5rem; height:3.5rem;" src="../../public/images/success.png">
            
            <div class="hands">到达景点成功</div>
            <div class="tip_div">该预约单已经失效，请您再次预约</div>

        </div>
        
    </div>
</template>

<script>
    export default {
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
        }
        
    }
</script>

<style>
</style>