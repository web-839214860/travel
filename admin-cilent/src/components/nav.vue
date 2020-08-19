<template>
    <div class="nav">

        <el-row>
            <el-col :span="4">
                <el-menu :default-active="$route.path" :router="true" class="menu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <h3 class="name">后 台 管 理 系 统</h3> 

                    <el-menu-item index="/">
                        <i class="el-icon-tickets"></i>
                        <span slot="title">预约管理</span>
                    </el-menu-item>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group title="普通用户">
                            <el-menu-item index="/usercommon">用户</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="管理员">
                            <el-menu-item index="/useradmin">景点管理员</el-menu-item>
                            <el-menu-item index="/userhighadmin">高级管理员</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-map-location"></i>
                            <span>景点管理</span>
                        </template>
                        <el-menu-item index="/sceneryinfo">景点信息</el-menu-item>
                        <el-menu-item index="/sceneryadd">添加景点</el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-col>

            <el-col :span="20">
                <div class="info">
                    <el-dropdown class="dropdown">
                        <span class="el-dropdown-link">
                            {{u_name}} 欢迎您！<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="onClickPassword()" >修改密码</el-dropdown-item>
                            <el-dropdown-item divided @click.native="LogOut()" >退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>

        </el-row>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('user')

    export default {
        methods: {
            onClickPassword(){
                this.$router.push({path:'/password'})
            },
            ...mapActions(
                ['LogOut']  // 语法糖,相当于this.$store.dispatch('modifyName'),提交这个方法
            )
        },
        computed:{
            ...mapState({
                u_name:state=>state.u_name
            })
        }        
    }
</script>

<style>
.name{
    text-align: center;
    color: #fff;
}
.info{
    height: 55px;
    border-bottom: 1px solid #ccc;
}
.menu{
    height: 100%;
    background-color: #545c64;
}
.nav, .el-row, .el-col.el-col-4{
    height: 100%;
}
.el-dropdown-link{
    cursor: pointer;
    color: rgb(75, 75, 75);
}
.el-icon-arrow-down{
    font-size: 12px;
}
.dropdown{
    margin-top: 17px;
    position: fixed;
    right: 10px;
} 
</style>