<template>
	<div class="search-container">
		<el-form ref="searchRef" :model="query" :inline="true">
			<el-form-item :prop="item.prop" v-for="item in options">
				<!-- 文本框、下拉框、日期框 -->
				<el-input v-if="item.type === 'input'" v-model="query[item.prop]" :disabled="item.disabled"
					:placeholder="item.placeholder" clearable></el-input>
				<el-select v-else-if="item.type === 'select'" v-model="query[item.prop]" :disabled="item.disabled"
					:placeholder="item.placeholder" clearable>
					<el-option v-for="opt in item.opts" :label="opt.label" :value="opt.value"></el-option>
				</el-select>
				<el-date-picker v-else-if="item.type === 'date'" type="date" v-model="query[item.prop]"
					:value-format="item.format" :placeholder="item.placeholder"></el-date-picker>
				<el-date-picker v-else-if="item.type === 'datetimerange'" type="datetimerange" v-model="query[item.prop]"
					:value-format="item.format" :start-placeholder="item.startPlaceholder" :end-placeholder="item.endPlaceholder"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :icon="Search" @click="search">查询</el-button>
				<el-button :icon="Refresh" @click="resetForm(searchRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { FormInstance } from 'element-plus';
import { Search, Refresh } from '@element-plus/icons-vue';
import { PropType, ref } from 'vue';
import { FormOptionList } from '@/types/form-option';

const props = defineProps({
	query: {
		type: Object,
		required: true
	},
	options: {
		type: Array as PropType<Array<FormOptionList>>,
		required: true
	},
	search: {
		type: Function,
		default: () => { }
	}
});

const searchRef = ref<FormInstance>();
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
	props.search();
}
</script>

<style lang="less">
.search-container {
	padding: 10px 0;
	border-radius: 5px;
	.el-date-editor--datetimerange {
		--el-date-editor-width: 350px;
        --el-input-border-radius: 20px;
	}
	.el-form-item {
		margin-right: 20px;
	}
	.el-select {
		--el-select-width: 200px;
        --el-border-radius-base: 20px;
	}
    .el-input {
        --el-input-border-radius: 20px;
    }
	.el-form-item {
		margin-bottom: 0;
	}
}
</style>
