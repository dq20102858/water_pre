<template>
	<div id="el-menu" class="app-menu menu-wrapper">
		<template v-for="item in routes" v-if="!item.hidden&&item.children">
			<router-link v-if="item.redirect=='dashboard'" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
				<el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
					<em><img src="/static/m-shezhi.png" /></em>
					<span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
				</el-menu-item>
			</router-link>
			<el-submenu v-else :index="item.name||item.path" :key="item.name">
				<template slot="title">
					<i class="iconfont" :class="item.meta.icon"></i>
					<span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
				</template>
				<template v-for="child in item.children" v-if="!child.hidden">
					<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
					<router-link v-else :to="item.path+'/'+child.path" :key="child.name">
						<el-menu-item :index="item.path+'/'+child.path">
							<span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
						</el-menu-item>
					</router-link>
				</template>
			</el-submenu>
		</template>
	</div>
</template>

<script>
export default {
	name: "SidebarItem",
	props: {
		routes: {
			type: Array
		},
		isNest: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		hasOneShowingChildren(children) {
			const showingChildren = children.filter(item => {
				return !item.hidden;
			});
			if (showingChildren.length === 1) {
				return true;
			}
			return false;
		}
	}
};
</script>
<style>
.app-menu {margin: 10px 0;}
.app-menu  .el-menu-item em img{width: 24px;vertical-align: middle}
.app-menu  .el-menu-item span{color: #fff;font-weight: 700; padding-left: 10px;font-size:15px}
.app-menu  .el-menu-item.is-active{ background-image: linear-gradient(to right, #7391e3 ,#5478dd);border-left:4px #fff solid;padding-left: 16px!important;}
.app-menu  .el-menu-item.is-active:hover{ background-image: linear-gradient(to right, #7391e3 ,#5478dd)!important;border-left:4px #fff solid;padding-left: 16px!important;}
.app-menu  .el-menu-item:hover{background: none}
</style>
