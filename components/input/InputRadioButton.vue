<template>
	<div>
		<input
			class="custom-radio"
			name="radio"
			type="radio"
			:value="selectOptions.value"
			:id="selectOptions.inputId"
			v-model="selectValue"
			@change="handleChange"
		/>
		<label :for="selectOptions.inputId">{{ selectOptions.label }}</label>
	</div>
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

/* для элемента input c type="radio" */
.custom-radio {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
/* для элемента label связанного с .custom-radio */
.custom-radio+label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
/* создание в label псевдоэлемента  before со следующими стилями */
.custom-radio+label::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 50%;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  transition: all 0.2s ease-in-out; /* Добавляем переход для анимации */
}
/* стили при наведении курсора на радио */
.custom-radio:not(:disabled):not(:checked)+label:hover::before {
  border-color: #b3d7ff;
}
/* стили для активной радиокнопки (при нажатии на неё) */
.custom-radio:not(:disabled):active+label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}
/* стили для радиокнопки, находящейся в фокусе */
.custom-radio:focus+label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* стили для радиокнопки, находящейся в фокусе и не находящейся в состоянии checked */
.custom-radio:focus:not(:checked)+label::before {
  border-color: #80bdff;
}

/* стили для радиокнопки, находящейся в состоянии checked */
.custom-radio:checked+label::before {
  border-color: rgb(74, 222, 128);
  background-color: rgb(74, 222, 128);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
</style>
