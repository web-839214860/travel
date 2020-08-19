<template>
    <div id="sceneryinfo">

        <div>
            <el-input v-model="searchTableInfo" placeholder="请输入搜索内容" style="width:30%"></el-input>
            
            <el-button style="position: absolute; left: 44%;" type="primary" @click="onClickAdd()">
                <i class="el-icon-plus"></i> 添加景点
            </el-button>
        </div>

        <el-table border style="width: 100%; margin-top: 18px;" :data="sceneryList.slice((currentPage-1)*pagesize,currentPage*pagesize)" > <!-- 从0开始，每页显示的数据 参考：http://www.manongjc.com/article/22017.html -->
        
            <el-table-column label="编号" type="index" width="50" align="center"></el-table-column>

            <el-table-column label="景点名称" prop="s_name" width="100" align="center"></el-table-column>

            <el-table-column label="景点简介" prop="s_synopsis" width="220" align="left" header-align="center"></el-table-column>

            <el-table-column label="景点位置" prop="s_place" width="90" align="center"></el-table-column>

            <el-table-column label="联系电话" prop="s_phone" width="130" align="center"></el-table-column>

            <el-table-column label="容纳人数" prop="s_num" width="80" align="center"></el-table-column>

            <el-table-column label="可参观人数" prop="s_numquota" width="91" align="center"></el-table-column>

            <el-table-column label="景点图片" prop="s_image" width="150" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.s_image" width="120" height="90" align="center"/>
                </template>
            </el-table-column>

            <el-table-column label="操作" prop="doit" width="210" align="center">
                <template slot-scope="scope"> 
                    <el-button size="small" type="primary" @click="editscenery(scope.row.s_name)" ><i class="el-icon-edit"></i> 编辑</el-button>
                    <el-button size="small" type="danger" @click="open(scope.row.s_name)" ><i class="el-icon-delete"></i> 删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 3, 5, 7]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="sceneryList.length">
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
                pagesize:2,//每页的数据
                searchTableInfo:"",
                getSearchInfo:[]
            }
        },
        created(){
            this.handleSceneryList();
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
                this.$router.push({path:'/sceneryadd'})
            },
            handleSceneryList(){
                this.$api.scenery.getsceneryinfo().then(res =>{
                    if(res.code==1){
                        //console.log(res.data)
                        this.getSearchInfo=res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            deletescenery(val){
                this.$api.scenery.deletescenery(val).then(res =>{
                    if(res.code==1){
                        this.showMessage('success',res.data.message)
                        this.reload()
                    }else{
                        this.$message.error("未知错误")
                    } 
                })
            },
            open(val) {
                MessageBox.confirm('此操作将删除该景点, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deletescenery.bind(this)(val);
                }).catch(() => {});
            },
            editscenery(val){
                this.$router.push('/sceneryedit/'+val)
            }
        },
        computed: {
            // 根据计算属性模糊搜索
            sceneryList () {
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
#sceneryinfo{
    margin-top: -560px;
    margin-left: 240px;
}
</style>