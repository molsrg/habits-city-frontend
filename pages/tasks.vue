<script setup>
import draggable from 'vuedraggable';

const tasks = reactive({
  dailyTask: {
    title: 'Daily task',
    tasks: [
      {
        id: 1,
        name: 'Prepare breakfast: Oatmeal with fruits',
        date: '2024-11-09',
        completed: false,
        user: 'molsrg',
      },
      { id: 2, name: 'Grocery shopping for pizza ingredients', date: '2024-11-09', completed: false, user: 'molsrg' },
      { id: 3, name: 'Cook spaghetti with marinara sauce', date: '2024-11-09', completed: false, user: 'molsrg' },
      { id: 4, name: 'Make tacos with beef and salsa', date: '2024-11-09', completed: false, user: 'molsrg' },
      { id: 5, name: 'Prepare teriyaki chicken with rice', date: '2024-11-09', completed: false, user: 'molsrg' },
    ],
  },
  weeklyTask: {
    title: 'Weekly task',
    tasks: [
      { id: 6, name: 'Prepare bat wing soup for special dinner', date: '2024-11-09', completed: false, user: 'molsrg' },
      { id: 7, name: 'Cook spicy octopus with garlic and chili', date: '2024-11-09', completed: false, user: 'molsrg' },
      { id: 8, name: 'Try new Taco Bell menu item for review', date: '2024-11-09', completed: false, user: 'molsrg' },
    ],
  },
  backlogTask: {
    title: 'Backlog task',
    tasks: [
      { id: 9, name: 'Write detailed recipe for bat wing soup', date: '2024-11-09', completed: false, user: 'molsrg' },
      {
        id: 10,
        name: 'Develop cooking tips for spicy octopus dish',
        date: '2024-11-09',
        completed: false,
        user: 'molsrg',
      },
      {
        id: 11,
        name: 'Test new Taco Bell recipe in the kitchen',
        date: '2024-11-09',
        completed: false,
        user: 'molsrg',
      },
    ],
  },
});


const completeTask = (id, list) => {
  const task = tasks[list].tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
  }
};
</script>

<template>
  <div class="food-container">
    <div v-for="(column, key) in tasks" :key="key" class="column">
      <h1>{{ column.title }}</h1>
      <draggable
        v-model="column.tasks"
        :animation="300"
        group="tasks"
        item-key="id"
        tag="ul"
      >
        <template #item="{ element: meal }">
          <div class="task-card-container">
            <TaskCard :content="meal" @update:status="completeTask(meal.id, key)" />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.task-card-container {
  margin-bottom: 12px;
}

.food-container {
  display: flex;
  align-items: start;
  gap: 20px;
}

.column {
  width: 30%;
  padding: 10px;
  border-radius: 8px;
  border: #1f2937 1px solid;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 15px;
}

</style>
