<script setup>
import '@mobiscroll/vue/dist/css/mobiscroll.min.css';
import { MbscEventcalendar, MbscPage, MbscToast, setOptions } from '@mobiscroll/vue';
import { ref } from 'vue';

definePageMeta({
  middleware: ['auth'],
});

useHead({
  title: 'HS | Calendar',
});
setOptions({
  theme: 'ios',
  themeVariant: 'dark',
});

const myView = {
  calendar: { type: 'month' },
};

const firstEvents = ref([
  {
    start: '2024-08-18T00:00',
    end: '2024-08-20T00:00',
    title: 'Event 1',
    color: '#e20000',
  },
  {
    start: '2024-08-22T00:00',
    end: '2024-08-24T00:00',
    title: 'Event 2',
    color: '#166f6f',
  },
  {
    start: '2024-08-27T00:00',
    end: '2024-08-28T00:00',
    title: 'Event 3',
    color: '#166f6f',
  },
  {
    start: '2024-09-01T00:00',
    end: '2024-09-03T00:00',
    title: 'Event 4',
    color: '#a32f00',
  },
  {
    start: '2024-09-05T00:00',
    end: '2024-09-07T00:00',
    title: 'Event 5',
    color: '#8b8b00',
  },
  {
    start: '2024-09-11T00:00',
    end: '2024-09-12T12:00',
    title: 'Event 6',
    color: '#1dab2f',
  },
  {
    start: '2024-09-15T00:00',
    end: '2024-09-16T00:00',
    title: 'Event 7',
    color: '#4981d6',
  },
  {
    start: '2024-09-20T00:00',
    end: '2024-09-21T00:00',
    title: 'Event 8',
    color: '#4418d2',
  },
  {
    start: '2024-09-26T00:00',
    end: '2024-09-26T00:00',
    title: 'Event 9',
    color: '#6e7f29',
  },
  {
    start: '2024-10-03T00:00',
    end: '2024-10-04T00:00',
    title: 'Event 10',
    color: '#8b0000',
  },
  {
    start: '2024-10-09T00:00',
    end: '2024-10-10T00:00',
    title: 'Event 11',
    color: '#a32f00',
  },
  {
    start: '2024-10-14T00:00',
    end: '2024-10-16T00:00',
    title: 'Event 12',
    color: '#152d2b',
  },
]);

const toastMessage = ref('');
const toastContext = ref();
const isToastOpen = ref(false);

function handleFirstCalEventCreated(args) {
  if (args.action === 'externalDrop') {
    toastMessage.value = 'Event dropped to Calendar 1';
    toastContext.value = '.md-drag-drop-first-calendar';
    isToastOpen.value = true;
  }
}

function handleSecondCalEventCreated(args) {
  if (args.action === 'externalDrop') {
    toastMessage.value = 'Event dropped to Calendar 2';
    toastContext.value = '.md-drag-drop-second-calendar';
    isToastOpen.value = true;
  }
}

function handleToastClose() {
  isToastOpen.value = false;
}
</script>

<template>
  <MbscPage>
    <div class="mbsc-grid mbsc-no-padding md-drag-drop-calendar">
      <div class="mbsc-row">
        <div class="mbsc-col-sm-12">
          <MbscEventcalendar
            :data="firstEvents"
            :drag-to-move="true"
            :event-delete="true"
            :external-drag="true"
            :external-drop="true"
            :height="700"
            :view="myView"
            class-name="md-drag-drop-first-calendar"
            @event-created="handleFirstCalEventCreated"
          />
        </div>
      </div>
    </div>
    <MbscToast
      :context="toastContext"
      :is-open="isToastOpen"
      :message="toastMessage"
      @close="handleToastClose"
    />
  </MbscPage>
</template>

<style>
.md-drag-drop-calendar-border {
  border-right: 3px dashed #e4e4e4;
}

.md-drag-drop-calendar .mbsc-form-group-title {
  font-size: 1em;
}

.md-drag-drop-calendar .mbsc-row,
.md-drag-drop-calendar .mbsc-col-sm-6 {
  height: 100%;
}
</style>
