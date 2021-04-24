<template>
  <form @submit.prevent="handleSubmit">
      <h3> Forgot Password</h3>

      <div class ="form-group">

        <label>Email></label>
        <input type="email" class="form-control" v-model="email" placeholder="Email"/>

      </div>

      <button class="btn btn-primary btn-block">Submit</button>

  </form>
</template>
<script>
import axios from 'axios'

export default {

    name: 'ForgotPassword',

    data()  {

        return {

            email: ''
        }

    },
    methods: {
        async handleSubmit() {

            const reponse = await axios.post('ForgotPassword', {
                
                email: this.email

            });

            console.log(reponse);
    } 
}
}

</script>

<style>

</style>