<template>
  <div>
    <!-- <Chart type="line" :data="chartData" /> -->
    <div class="graph">
      <ul class="months">
        <li>Jan</li>
        <li>Feb</li>
        <li>Mar</li>
        <li>Apr</li>
        <li>May</li>
        <li>Jun</li>
        <li>Jul</li>
        <li>Aug</li>
        <li>Sep</li>
        <li>Oct</li>
        <li>Nov</li>
        <li>Dec</li>
      </ul>
      <ul class="days">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul class="squares">
        <!-- added via javascript -->
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart'

const helloArray = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0], // начало 
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
	

  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],

]
onMounted(() => {
  chartData.value = setChartData()

  const squares = document.querySelector('.squares')
  // for (let i = 1; i < 365; i++) {
  // 	const level = Math.floor(Math.random() * 5)
  // 	squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`)
  // }

  helloArray.forEach(row => {
    row.forEach(cell => {
      const level = cell === 1 ? 3 : 0 // Уровень 3 для заполненных квадратов, 0 для пустых
      squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`)
    })
  })
})

const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
  return {
    labels: [
      '1 May',
      '2 May',
      '3 May',
      '4 May',
      '5 May',
      '6 May',
      '7 May',
      '8 May',
      '9 May',
      '10 May',
      '11 May',
      '12 May',
      '13 May',
      '14 May',
      '15 May',
      '16 May',
      '17 May',
      '18 May',
      '19 May',
      '20 May',
      '21 May',
      '22 May',
      '23 May',
      '24 May',
      '25 May',
      '26 May',
      '27 May',
      '28 May',
      '29 May',
      '30 May',
      '31 May',
    ],
    datasets: [
      {
        label: 'Visitors',
        data: [
          63, 29, 82, 18, 73, 9, 64, 87, 28, 58, 12, 100, 5, 39, 79, 84, 41, 53,
          24, 97, 8, 4, 68, 91, 27, 50, 34, 15, 36, 45,
        ],
        borderWidth: 1,
      },
      {
        label: 'Subscribers',
        data: [
          22, 87, 56, 11, 93, 48, 75, 63, 32, 89, 17, 4, 69, 25, 96, 52, 37, 81,
          7, 59, 91, 28, 66, 41, 84, 16, 71, 54, 39, 98, 20,
        ],
        borderWidth: 1,
      },
    ],
  }
}
</script>

<style>
.p-chart {
	width: 80vw;
	height: 40vw;
}

:root {
	--square-size: 1vw;
	--square-gap: 0.3vw;
	--week-width: calc(var(--square-size) + var(--square-gap));
}

.months {
	grid-area: months;
	font-size: 1vw;
}
.days {
	grid-area: days;
	font-size: 1vw;
}
.squares {
	grid-area: squares;
}

.graph {
	display: inline-grid;
	grid-template-areas:
		'empty months'
		'days squares';
	grid-template-columns: auto 1fr;
	grid-gap: 10px;
	background-color: rgb(13, 17, 23);
}

.months {
	display: grid;
	grid-template-columns:
		calc(var(--week-width) * 4) /* Jan */
		calc(var(--week-width) * 4) /* Feb */
		calc(var(--week-width) * 4) /* Mar */
		calc(var(--week-width) * 5) /* Apr */
		calc(var(--week-width) * 4) /* May */
		calc(var(--week-width) * 4) /* Jun */
		calc(var(--week-width) * 5) /* Jul */
		calc(var(--week-width) * 4) /* Aug */
		calc(var(--week-width) * 4) /* Sep */
		calc(var(--week-width) * 5) /* Oct */
		calc(var(--week-width) * 4) /* Nov */
		calc(var(--week-width) * 1) /* Dec */;
}

.days,
.squares {
	display: grid;
	grid-gap: var(--square-gap);
	grid-template-rows: repeat(7, var(--square-size));
}

.squares {
	grid-auto-flow: column;
	grid-auto-columns: var(--square-size);
}

/* Other styling */

.graph {
	padding: 20px;
	border: 1px rgb(48, 54, 61) solid;
	border-radius: 10px;
}

.days li:nth-child(odd) {
	visibility: hidden;
}

.squares li {
	background-color: rgb(22, 27, 34);
	border-radius: 3px;
}

.squares li[data-level='1'] {
	background-color: rgb(14, 68, 41);
}

.squares li[data-level='2'] {
	background-color: rgb(34, 152, 54);
}

.squares li[data-level='3'] {
	background-color: rgb(57, 211, 83);
}
</style>
