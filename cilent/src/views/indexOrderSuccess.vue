<template>
    <div>

        <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft"/>

        <div class="success">

            <img style="width:3.5rem; height:3.5rem;" src="../../public/images/success.png">
            
            <div class="hands">发起预约成功</div>
            <div class="tip_div">请耐心等待工作人员为您分配名额，您可以在</div>
            <div class="tip_div" style="margin-top: 0.4rem;">结果查询 菜单进行查看</div>

            <div class="time">{{count}} 秒后将跳转到首页</div>

        </div>
        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                count:'',
            }
        },
        created() {
            this.onRouter()
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            onRouter(){   //参考：https://blog.csdn.net/qq_38881495/article/details/89416104?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2
                const time = 5;
                if(!this.timer){  //定时器为空 即没有运行定时器
                    this.count = time ;
                    this.timer = setInterval(()=>{
                        if(this.count > 1 && this.count <= time ){
                            this.count--;
                        }else{
                            clearInterval(this.timer); //关闭 this.timer 定时器
                            this.timer = null;
                            this.$router.push({path: '/index'});
                        }
                    },1000)
                }
            },
        }
        
    }
</script>

<style>
.success{
    text-align: center;
    margin-top: 0.9rem;
}
.hands{
    font-weight:bold;
    font-size: 0.9rem;
    margin-top: 0.7rem;  
    color: rgb(80, 80, 80)
}
.tip_div{
    margin-top: 1.1rem;
    font-size: 0.8rem;
    color: rgb(126, 124, 124)
}
.time{
    font-size: 0.8rem;
    color: rgb(126, 124, 124);
    margin-top: 6rem
}
</style>