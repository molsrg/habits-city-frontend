<template>
  <div class="home">
    <div>
      <UContainer class="quote">
        <UBadge class="quote-author" color="white" variant="solid">@molsrg</UBadge>
        <div>
          {{ $t('page--index.badge') }}
        </div>
      </UContainer>
    </div>
    <UAccordion :items="items" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  title: 'Some Page',
});

const items = [
  {
    label: 'Как зарегистрироваться на нашей социальной сети?',
    icon: 'i-heroicons-user-plus',
    defaultOpen: true,
    content:
      'Чтобы зарегистрироваться, нажмите кнопку "Зарегистрироваться" на главной странице и заполните форму регистрации.',
  },
  {
    label: 'Как добавить друга?',
    icon: 'i-heroicons-user-add',
    content: 'Чтобы добавить друга, перейдите на его профиль и нажмите кнопку "Добавить в друзья".',
  },
  {
    label: 'Как удалить свой аккаунт?',
    icon: 'i-heroicons-trash',
    content:
      'Чтобы удалить свой аккаунт, перейдите в настройки профиля и выберите пункт "Удалить аккаунт".',
  },
  {
    label: 'Как создать группу?',
    icon: 'i-heroicons-users',
    content:
      'Чтобы создать группу, нажмите кнопку "Создать группу" на главной странице и заполните форму создания группы.',
  },
  {
    label: 'Как изменить свою фотографию профиля?',
    icon: 'i-heroicons-camera',
    content:
      'Чтобы изменить фотографию профиля, перейдите в настройки профиля и нажмите на вашу текущую фотографию профиля, затем выберите новое изображение.',
  },
  {
    label: 'Как связаться с поддержкой?',
    icon: 'i-heroicons-headphones',
    content:
      'Чтобы связаться с поддержкой, напишите нам на электронную почту support@mysocialnetwork.com или воспользуйтесь формой обратной связи на нашем сайте.',
  },
];
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
