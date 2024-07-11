<template>
	<div class="home">
		<div>
			<UContainer class="quote">
				<UBadge color="white" variant="solid" class="quote-author"
					>@molsrg</UBadge
				>
				<div>
					Компилятор - лучший друг программиста: он никогда не скажет, что ты
					гений, но всегда покажет, где ты ошибся.
				</div>
			</UContainer>
		</div>
		<div id="threejs-container"></div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'default',
	title: 'Some Page',
})

import * as THREE from 'three'
import { onMounted } from 'vue'
onMounted(() => {
	const scene = new THREE.Scene()
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	)

	const renderer = new THREE.WebGLRenderer()

	const container = document.getElementById('threejs-container')
	renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7)

	renderer.setAnimationLoop(animate)
	container.appendChild(renderer.domElement)

	const geometry = new THREE.BoxGeometry(1, 1, 1)
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
	const cube = new THREE.Mesh(geometry, material)
	scene.add(cube)

	camera.position.z = 5

	function animate() {
		cube.rotation.x += 0.01
		cube.rotation.y += 0.01

		renderer.render(scene, camera)
	}
})
</script>

<style scoped>
.home {
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	padding: 10px;
	background: #000;
	align-items: center;
	justify-content: center;
}

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
