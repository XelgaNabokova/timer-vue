<template>
    <div class="TimerList">
        <router-link 
          class="TimerList__item"
          v-for="item in list" :key="item.id"
          :to="{ name: 'timer', params: { timerCategory: item.path }}"
        >
          <h1>{{ item.title }}</h1>
        </router-link>
    </div>
</template>

<script>
  export default {
    name: 'TimerList',
    data() {
      return {
        list: [
          { id: 1, title: 'Timer to date', path: '/date' },
          { id: 2, title: 'Timer to time', path: '/time' }
        ]
      }
    }
  }
  //:to="'/timer' + item.path"
</script>

<style lang="scss">
  .TimerList {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    &__item {
      flex: 1 0 calc(50% - 4rem);
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 300px;
      height: 300px;
      margin: 2rem;
      padding: 2rem;
      border: 1rem solid brown;
      color: brown;
      text-decoration: none;
      &:hover {
        transition: .2s;
        color: beige;
        background: brown;
        cursor: pointer;
      }
    }
  }
</style>
