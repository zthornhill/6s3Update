<template>
  <v-app>
    <v-app-bar app color="black">
      <img :src="require('@/assets/images/SubAlert.png')" height="90">
      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
      <v-btn flat dark text rounded
      @click="home()">Home
      </v-btn>  
        <v-btn
          v-for="item in menu"
          v-if="authenticated"
          :key="item.title"
          :to="item.url"
          flat
          text 
          rounded
          dark
        >{{ item.title }}</v-btn>
        <v-btn flat dark text rounded v-if="!authenticated"
                @click="login">Log in
        </v-btn>
        <v-btn flat dark text rounded v-if="!authenticated"
        @click="register">Register
        </v-btn>
        <v-btn flat dark text rounded v-if="authenticated"
                @click="logout">Log Out
        </v-btn>
      </div>
      <div class="hidden-sm-and-up">
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item  v-for="item in menu"
            :key="item.title"
            :to="item.url"
          >{{ item.title }}</v-list-item>
          <v-list-item v-if="!authenticated"
          @click="login">Log in</v-list-item>
          <v-list-item v-if="authenticated"
          @click="logout">Log out</v-list-item>
        </v-list>
      </v-menu>
      </div>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>

</template>

<script>
  import router from './router';
  import {APIService} from './http/APIService';
  const apiService = new APIService();

  export default {
    name: 'App',
    data: () => ({
      authenticated: false,
      dialog: false,
      uName: "Guest",
      menu: []
    }),
    mounted() {
      this.fillMenu();
      apiService.getSubscriptionList().then(response => {
        this.authenticated = true;
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem('isAuthenticates');
          localStorage.removeItem('log_user');
          localStorage.removeItem('token');
          this.authenticated = false;
        }
      });
      console.log('this.authenticated--'+this.authenticated);
    },

    methods: {
      fillMenu(){
        if (localStorage.getItem("isAuthenticates") && JSON.parse(localStorage.getItem("isAuthenticates")) === true) 
        {
          
          console.log("IS AUTH")
          this.uName = JSON.parse(localStorage.getItem("log_user"));

        } 
        
        else 
        {
          console.log("IS NOT AUTH")
        }
        
        this.menu = [
            { title: 'Subscriptions', url:"/subscription-list" },
            { title: 'Payment', url:"/Payment" },
            { title: 'Account Management', url:"/Account" }
            ]
    },

      getUser() {
        if (localStorage.getItem("isAuthenticates") && JSON.parse(localStorage.getItem("isAuthenticates")) === true) 
        {
          console.log("IS AUTH")
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        } 
        
        else {
          console.log("IS NOT AUTH")
        }
      },
    
      logout() {
        localStorage.removeItem('isAuthenticates');
        localStorage.removeItem('log_user');
        localStorage.removeItem('token');
        this.authenticated = false;
        // router.push('/');
        window.location = "/"
      },
      login() {
        router.push("/auth");
      },
      home() {
        window.location = "/"
      },
      register() {        
        router.push('/register');
      },
      payment() {
        router.push('/payment');
      },
      account() {
        router.push('/account');
      }
    }
  };

</script>
