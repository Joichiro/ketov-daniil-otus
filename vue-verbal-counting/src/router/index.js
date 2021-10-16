import Vue from 'vue'
import Router from 'vue-router';
import MainPage from '../views/MainPage';
import GamePage from '../views/GamePage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/game',
      name: 'game',
      component: GamePage
    }
  ]
});
