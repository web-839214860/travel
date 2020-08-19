<template>
	<div id="app">
		<router-view v-if="isRouterAlive" />
	</div>
</template>

<style>
#app{
  height: 100%;
}
</style>

<script>  //页面自动刷新 参考https://blog.csdn.net/weixin_43885417/article/details/91310674
export default {
	name: 'App',
	provide(){  //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
		return {
			reload:this.reload
		}
	},
	data (){
		return {
			isRouterAlive: true //控制视图是否显示的变量
		}
	},
	methods:{
		reload(){
			this.isRouterAlive=false      //先关闭
			this.$nextTick(function(){
				this.isRouterAlive=true   //再打开
			})
		}
	}
}
</script>

