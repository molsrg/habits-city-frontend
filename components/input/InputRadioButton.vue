<template>
	<label class="radio">
		<input
			name="radio"
			type="radio"
			:value="selectOptions.value"
			v-model="selectValue"
			@change="handleChange"
		/>
		<span>{{ selectOptions.label }}</span>
	</label>
</template>

<script setup lang="ts">
const props = defineProps({
	selectOptions: {
		type: Object,
		required: true,
	},
	selectValue: {
    type: String,
    required: false,
  },
})

const selectValue = ref(props.selectValue)

const emit = defineEmits(['update:selectValue'])

const handleChange = (event: Event) => {
	const target = event.target as HTMLInputElement
	emit('update:selectValue', target.value)
}

</script>

<style scoped>
.radio {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	text-align: left;
}

.radio input {
	display: none;
}

.radio input + span {
	display: inline-block;
	position: relative;
	padding-left: 25px;
	line-height: 20px;
}

.radio input + span::before {
	content: '';
	display: block;
	position: absolute;
	top: 0px;
	left: 0px;
	border-radius: 50%;
	width: 18px;
	height: 18px;
	border: 1px solid rgb(74, 222, 128);
	background: rgb(18, 18, 18);
}

.radio input + span::after {
	content: '';
	display: block;
	width: 10px;
	height: 10px;
	background: rgb(74, 222, 128);
	position: absolute;
	border-radius: 50%;
	top: 4px;
	left: 4.4px;
	opacity: 0;
	transform: scale(0, 0);
	transition: all 0.2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
}

.radio input:checked + span::after {
	opacity: 1;
	transform: scale(1, 1);
}
</style>
