import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import Register from '@/components/Register'
import SubscriptionList from '@/components/SubscriptionList'
import SubscriptionCreate from '@/components/SubscriptionCreate'
import Payment from '@/components/Payment'
import ForgotPassword from '@/components/ForgotPassword.vue'
import SelectSubscription from '@/components/SelectSubscription.vue'
import Account from '@/components/Account.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account
    },
    {
      path: '/select-subscription',
      name: 'SelectSubscription',
      component: SelectSubscription
    },
    {
      path: '/subscription-list',
      name: 'SubscriptionList',
      component: SubscriptionList
    },
    {
      path: '/subscription-list/:msg',
      name: 'SubscriptionUpdatedList',
      component: SubscriptionList
    },
    {
      path: '/subscription-create',
      name: 'SubscriptionCreate',
      component: SubscriptionCreate
    },
    {
      path: '/subscription-create/:pk',
      name: 'SubscriptionUpdate',
      component: SubscriptionCreate
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/register',
      name: 'register',
      component: Register
      },      
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/ForgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
  ]
})
