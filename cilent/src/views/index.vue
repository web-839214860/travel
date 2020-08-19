<template>
    <div>

        <van-nav-bar title="首页">
            <!-- <template #right>
                <van-icon name="search" color="black" size="19" />
            </template> -->
        </van-nav-bar>

        <van-search v-model="searchSceneryInfo" placeholder="请输入搜索关键词" />

        <div id="scenery_list">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">

                <div v-for="(scenery,index) in sceneryList" :key="index" class="item_scenery"  @click="sceneryinfo(scenery.s_name)">
                    <!-- 图片 -->
                    <div class="scenery_img_wrap">
                        <img :src="scenery.s_image"/>
                    </div>

                    <!-- 信息 -->
                    <div class="scenery_info">

                        <div class="scenery_title">{{scenery.s_name}}</div>

                        <div class="scenery_detail">
                            <div class="num">容纳人数：{{scenery.s_num}}</div>
                            <div class="place">景点位置：{{scenery.s_place}}</div>
                        </div>

                    </div>
                    
                </div>

            </van-pull-refresh>
        </div>
        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                getSearchInfo:[],
                searchSceneryInfo:"",
                isRefresh:false, 
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('scenery_list').style.height=winHeight-46-50-54 +'px'
        },
        created(){
            this.handleSceneryList();
            this.putOrder();
        },
        methods: {
            handleSceneryList(){
                this.$api.scenery.getsceneryinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data;
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
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    //this.getSearchInfo=[];
                    this.handleSceneryList();
                    this.putOrder();
                }, 500);
            },
            sceneryinfo(val){
                this.$router.push('/indexSceneryInfo/'+val)
            }
        },
        computed: {
            // 根据计算属性模糊搜索
            sceneryList () {
                const searchSceneryInfo = this.searchSceneryInfo
                if (searchSceneryInfo) {
                // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                // 注意： filter() 不会对空数组进行检测。filter() 不会改变原始数组。
                    return this.getSearchInfo.filter(data => {
                        //console.log("success"+data)
            // some() 方法（用于检测数组中的元素是否满足指定条件） 会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。some() 不会改变原始数组。
                        return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                            return String(data[key]).toLowerCase().indexOf(searchSceneryInfo) > -1
                        })
                    })
                }
                return this.getSearchInfo
            }
        }
        
    }
</script>

<style>
#scenery_list {
    margin-top:0.3rem;
    overflow: scroll;
}
.item_scenery {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}
.scenery_img_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46%;
}
.scenery_img_wrap img {
    width: 90%;
    border-radius: 5px;
} 
.scenery_info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 56%;
} 
.scenery_title {
    font-weight: bold;
    font-size: 0.8rem;
    color: #0f0f0f;
}
.scenery_detail {
    font-size: 0.8rem;
    color: #666;
}
.num{
    margin-bottom: 0.4rem;
}

</style>