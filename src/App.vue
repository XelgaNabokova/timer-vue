<template>
  <router-view />
</template>

<script>
  import { createRouter, createWebHistory } from 'vue-router'

  export default {
    name: 'App'
  }

  export const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path:'/', component: () => import('./pages/MainPage.vue') },
      {
        path:'/timer/:timerCategory',
        name: 'timer',
        component: () => import('./pages/TimerPage.vue'),
        props: true
      }
    ], 
  })

</script> 

<style>
  *, ::before, ::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
