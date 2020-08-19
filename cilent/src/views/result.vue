<template>
    <div>

        <van-nav-bar title="结果查询"/>

        <van-pull-refresh v-if="showorderinfo" style="height:30rem" v-model="isRefresh" @refresh="onRefresh">

            <van-cell-group>
                <van-cell title="姓名" ><div class="cell">{{getOrderInfo.o_name}}</div></van-cell>            
                <van-cell title="联系方式" ><div class="cell">{{getOrderInfo.o_phone}}</div></van-cell>
                <van-cell title="预约日期" ><div class="cell">{{getOrderInfo.o_time}}</div></van-cell>
                <van-cell title="预约景点" ><div class="cell">{{getOrderInfo.s_name}}</div></van-cell>
                <van-cell title="预约结果" ><div class="cell">{{getOrderInfo.o_result}}</div></van-cell>
            </van-cell-group>

            <div class="button">
                <van-button type="info" size="large" @click="open()" :disabled="getOrderInfo.o_result == '待分配' || getOrderInfo.o_result == '已失效' || getOrderInfo.o_result == '已过期'">到达</van-button>
            </div>
            
        </van-pull-refresh>


        <div v-if="noorderinfo" class="noorderinfo">您还未提交过预约单</div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                getInfolength:'',  //接收res.data的长度
                getOrderInfo:[],
                isRefresh:false,
                showorderinfo:false,
                noorderinfo:false
            }
        },
        created(){
            this.putOrder();
            this.orderList()
        },
        methods: {
            orderList(){
                this.$api.order.showorderinfo().then(res =>{
                    if(res.code==1){
                        this.getInfolength = res.data.length

                        if(this.getInfolength <= 0){
                            this.noorderinfo = true; 
                        } else {
                            this.showorderinfo = true;
                        }

                        //console.log(res.data[res.data.length-1])
                        this.getOrderInfo=res.data[res.data.length-1];
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            putOrder(){
                this.$api.order.putorder().then(res =>{
                    if(res.code==1){
                        //console.log(res.data.message)
                    }else if(res.code==-1){
                        //console.log(res.data.message)
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            putbuttonorder(){
                this.$api.order.putbuttonorder().then(res =>{
                    if(res.code==1){
                        //console.log(res.data.message)
                         this.$router.push({ path: '/resultArrive' })
                    }else if(res.code==-1){
                        //console.log(res.data.message)
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            open(){
                this.$dialog.alert({
                    title: "是否确认到达？", //标题
                    message: "确认到达后该预约单将失效", //弹出框的内容
                    showCancelButton: true //展示取消按钮
                })
                .then(() => { //点击确认按钮后的调用
                    this.$options.methods.putbuttonorder.bind(this)();
                })
                .catch(() => {}) //点击取消按钮后的调用
            },
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    //this.getOrderInfo = [];
                    this.putOrder();
                    this.orderList();
                }, 500);
            },
        }
        
    }
</script>

<style>
.noorderinfo{
    font-size: 0.8rem;
    color: rgb(126, 124, 124);
    letter-spacing:1px;
    position: absolute;
	top: 40%;
    left: 50%;
	transform: translate(-50%,-50%);
} 
</style>