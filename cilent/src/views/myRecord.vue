<template>
    <div>

        <van-nav-bar title="预约记录" left-text="返回" left-arrow @click-left="onClickLeft"/>

        <el-table border style="width: 100%;" :data="getOrderInfo" :header-cell-style="{background:'#F5F7FA'}" >
        
            <el-table-column label="预约日期" prop="o_time" min-width="90%" align="center"></el-table-column>

            <el-table-column label="联系方式" prop="o_phone" min-width="71%" align="center"></el-table-column>

            <el-table-column label="预约景点" prop="s_name" min-width="84%" align="center"></el-table-column>

            <el-table-column label="预约结果" prop="o_result" min-width="70%" align="center"></el-table-column>

        </el-table>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                getOrderInfo:[],
            }
        },
        created(){
            this.orderList();
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            orderList(){
                this.$api.order.showorderinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getOrderInfo=res.data;
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            }   
        }
        
    }
</script>

<style lang="scss" scoped>

</style>