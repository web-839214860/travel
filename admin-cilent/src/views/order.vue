<template>
    <div id="order">
        
        <div>
            <el-input v-model="searchOrderInfo" placeholder="请输入搜索内容" style="width:30%"></el-input>
        </div>

        <el-table border style="width: 100%; margin-top: 10px;" :data="orderList.slice((currentPage-1)*pagesize,currentPage*pagesize)" > <!-- 从0开始，每页显示的数据 参考：http://www.manongjc.com/article/22017.html -->
        
            <el-table-column label="编号" type="index" width="50" align="center"></el-table-column>

            <el-table-column label="姓名" prop="o_name" width="90" align="center"></el-table-column>

            <el-table-column label="联系方式" prop="o_phone" width="140" align="center"></el-table-column>

            <el-table-column label="预约时间" prop="o_time" width="110" align="center"></el-table-column>

            <el-table-column label="登录账号" prop="u_userId" width="120" align="center"></el-table-column>

            <el-table-column label="景点名称" prop="s_name" width="130" align="center"></el-table-column>

            <el-table-column label="剩余名额" prop="scenery.s_numquota" width="80" align="center"></el-table-column>

            <el-table-column label="结果" prop="o_result" width="80" align="center"></el-table-column>

             <el-table-column label="操作" prop="doit" width="320" align="center">
                <template slot-scope="scope"> 
                    <el-button size="small" type="primary" :disabled="scope.row.o_result == '预约成功' || scope.row.o_result == '已失效' || scope.row.o_result == '已过期' || scope.row.scenery.s_numquota == 0"  @click="postorders(scope.row.o_id)"><i class="el-icon-check"></i> 分配</el-button>
                    <el-button size="small" type="danger"  :disabled="scope.row.o_result == '待分配' || scope.row.o_result == '已失效' || scope.row.o_result == '已过期' || scope.row.scenery.s_numquota == 0 " @click="opens(scope.row.o_id)"><i class="el-icon-close"></i> 取消分配</el-button>
                    <el-button size="small" type="danger" @click="open(scope.row.o_id)"><i class="el-icon-delete"></i> 删除</el-button>
                </template>
             </el-table-column>

        </el-table>

        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[4, 5, 10, 15]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="orderList.length">
        </el-pagination>

    </div>
</template>

<script>
import { MessageBox } from 'element-ui'

    export default {

        inject:['reload'],//页面刷新
        data(){
            return{
                currentPage:1,//初始页
                pagesize:4,//每页的数据
                searchOrderInfo:"",
                getOrderInfo:[]
            }
        },
        created(){
            this.handleorderList()
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            handleSizeChange:function (size) {
                this.pagesize=size; //每页下拉显示数据
            },
            handleCurrentChange:function(currentPage){
                this.currentPage=currentPage; //点击第几页
            },
            handleorderList(){
                this.$api.order.allorderinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getOrderInfo=res.data
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            postorders(val){
                this.$api.order.postorderinfo(val).then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.showMessage('success',res.data.message)
                        this.reload()
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            putorders(val){
                this.$api.order.putorderinfo(val).then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.showMessage('success',res.data.message)
                        this.reload()
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            deleteorder(val){
                this.$api.order.deleteorder(val).then(res =>{
                    if(res.code==1){
                        this.showMessage('success',res.data.message)
                        this.reload()
                    }else{
                        this.$message.error("未知错误")
                    }
                    
                })
            },
            open(val) {
                MessageBox.confirm('此操作将删除该预约单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deleteorder.bind(this)(val);
                }).catch(() => {});
            },
            opens(val) {
                MessageBox.confirm('此操作将取消分配该预约单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.putorders.bind(this)(val);
                }).catch(() => {});
            },
        },
        computed: {
            // 根据计算属性模糊搜索
            orderList () {
                const searchOrderInfo = this.searchOrderInfo
                if (searchOrderInfo) {
                // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                // 注意： filter() 不会对空数组进行检测。filter() 不会改变原始数组。
                    return this.getOrderInfo.filter(data => {
                        //console.log("success"+data)
            // some() 方法（用于检测数组中的元素是否满足指定条件） 会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。some() 不会改变原始数组。
                        return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                            return String(data[key]).toLowerCase().indexOf(searchOrderInfo) > -1
                        })
                    })
                }
                return this.getOrderInfo
            }
        },
        
    }
</script>

<style>
#order{
    margin-top: -560px;
    margin-left: 240px;
}
</style>