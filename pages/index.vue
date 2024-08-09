<template>
	<div class="home">
		<!-- <div class="home-title">
			<div class="h-animate">
				<span class="text sec-text" :data-color-scheme="colorTheme"
					>Новая социальная сеть, созданная на Nuxt.js</span
				>
			</div>
		</div>

		<div class="info">
			<UTabs :items="items" />
		</div> -->

		<div>
			<UContainer class="quote">
				<UBadge color="white" variant="solid" class="quote-author"
					>@molsrg</UBadge
				>
				<div>
					{{ $t('page--index.badge') }}
				</div>
			</UContainer>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'default',
	title: 'Some Page',
})
const items = [
	{
		label: 'Простота',
		content:
			'Новая социальная сеть на Nuxt.js предоставляет интуитивно понятный и дружелюбный интерфейс, который позволяет пользователям без усилий общаться, делиться и взаимодействовать друг с другом.',
	},
	{
		label: 'Безопасность',
		content:
			'Мы понимаем, что безопасность ваших данных является критически важной. Наша социальная сеть построена с использованием самых последних стандартов безопасности, гарантируя, что ваша личная информация и контент останутся защищенными. Вы можете пользоваться нашей платформой с полным миром и уверенностью в своей безопасности.',
	},
	{
		label: 'Удобство',
		content:
			'С нашей социальной сетью на Nuxt.js вы получаете выдающееся пользовательское опытие, оптимизированное для всех устройств. Благодаря серверному рендерингу и быстрой загрузке страниц, вы сможете без проблем общаться, делиться контентом и оставаться на связи со своими друзьями и семьей. Наслаждайтесь всеми преимуществами современной социальной сети, созданной с использованием передовых технологий.',
	},
]
</script>

<style scoped>
.h-animate {
	overflow: hidden;
}

.h-animate .text {
	position: relative;
	color: var(--text-color);
	font-size: 33px;
	font-weight: 700;
}
.text.sec-text:before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: var(--bg-color, #121212);
	border-left: 4px solid var(--border-color, black);
	animation: animate 10s steps(200) infinite;
}

@keyframes animate {
	40%,
	60% {
		left: calc(100% + 4px);
	}
	100% {
		left: 0%;
	}
}

.home {
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	padding: 10px;
	/* background: #000; */
}

.quote {
	/* max-width:80%; */
	padding: 10px;
	border-radius: 10px;
	border: #18181b solid 2px;
}

.quote-author {
	margin-left: 1vw;
	margin-bottom: 10px;
}

.info {
	margin-top: 10px;
	max-width: 90%;
}

[data-color-scheme='dark'] {
	--bg-color: #121212;
	--border-color: black;
	--text-color: #22ca60;
}

[data-color-scheme='light'] {
	--bg-color: white;
	--border-color: rgb(0, 0, 0);
	--text-color: black;
}
</style>
