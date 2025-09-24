<template>
	<div>
		<el-descriptions :title="title" :column="column" border label-width="200" >
			<el-descriptions-item v-for="item in list" :key="item.prop" :span="item.span">
				<template #label> {{ item.label }} </template>
				<slot :name="item.prop" :rows="row">
					{{ item.value || row[item.prop] }}
				</slot>
			</el-descriptions-item>
		</el-descriptions>
		<slot name="footer" :row="row"></slot>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	data: {
		type: Object,
		required: true,
	}
});
const { row, title, column = 1, list } = props.data;

</script>
