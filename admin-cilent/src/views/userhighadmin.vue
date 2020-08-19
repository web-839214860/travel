<template>
    <div id="userhighadmin">

        <div>
            <el-input v-model="searchTableInfo" placeholder="请输入搜索内容" style="width:30%"></el-input>
            
            <el-button style="position: absolute; left: 44%;" type="primary" @click="onClickAdd()">
                <i class="el-icon-plus"></i> 添加用户
            </el-button>
        </div>

        <el-table style="width: 100%; margin-top: 10px;" :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)" > <!-- 从0开始，每页显示的数据 参考：http://www.manongjc.com/article/22017.html -->
        
            <el-table-column label="编号" type="index" width="50" align="center"></el-table-column>

            <el-table-column label="用户昵称" prop="u_name" width="120" align="center"></el-table-column>

            <el-table-column label="登录账号" prop="u_userId" width="150" align="center"></el-table-column>

            <el-table-column label="性别" prop="u_sex" width="120" align="center"></el-table-column>

            <el-table-column label="地区" prop="u_position" width="120" align="center"></el-table-column>

            <el-table-column label="身份" prop="role" width="200" align="center">
                <template slot-scope="scope">                    
                    <p v-if="scope.row.role=='1'">高级管理员</p>
                    <p v-if="scope.row.role=='2'">景点管理员</p>
                    <p v-if="scope.row.role=='3'">普通用户</p>                
                </template>
             </el-table-column>

             <el-table-column label="操作" prop="doit" width="340" align="center">
                <template slot-scope="scope"> 
                    <el-button size="small" type="primary" @click="edituser(scope.row.u_userId)" ><i class="el-icon-edit"></i> 编辑</el-button>
                    <el-button size="small" type="danger" @click="open(scope.row.u_userId)" ><i class="el-icon-delete"></i> 删除</el-button>
                </template>
             </el-table-column>

        </el-table>

        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[4, 5, 10, 15]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="userList.length">
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
                searchTableInfo:"",
                getSearchInfo:[]
            }
        },
        created(){
            this.handleUserList()
        },
        methods:{
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
            onClickAdd(){
                this.$router.push({path:'/useradd'})
            },
            handleUserList(){
                this.$api.user.getallhighadmininfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            deleteuser(val){
                this.$api.user.deleteuser(val).then(res =>{
                    if(res.code==1){
                        this.showMessage('success',res.data.message)
                        this.reload()
                    }else{
                        this.$message.error("未知错误")
                    }
                    
                })
            },
            open(val) {
                MessageBox.confirm('此操作将删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deleteuser.bind(this)(val);
                }).catch(() => {});
            },
            edituser(val){
                this.$router.push('/useredit/'+val)
            }
        },
        computed: {
            // 根据计算属性模糊搜索
            userList () {
                const searchTableInfo = this.searchTableInfo
                if (searchTableInfo) {
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
                            return String(data[key]).toLowerCase().indexOf(searchTableInfo) > -1
                        })
                    })
                }
                return this.getSearchInfo
            }
        },

    }
</script>

<style>
#userhighadmin{
    margin-top: -560px;
    margin-left: 240px;
}
.pagination{
    position: absolute;
    margin-top: 10px;
    left: 17.5%
}
</style>