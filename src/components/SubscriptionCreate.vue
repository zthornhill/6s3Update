<template>
  <v-container grid-list-md>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert v-if="showMsg === 'error'"
                     dismissible
                     :value="true"
                     type="error"
            >
              Please verify Subscription information.
            </v-alert>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{pageTitle}}</span>
              </v-card-title>
              <v-spacer/>

              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>

                    <v-text-field
                      v-model="subscription.name"
                      label="Name"
                      required
                    />
                    <v-text-field
                      v-model="subscription.description"
                      label="Description"
                      required
                    />
                    <v-text-field
                      v-model="subscription.price"
                      label="Price"
                      required
                      type="number"
                    />
                    <v-text-field
                      v-model="subscription.start_date"
                      label="Start Date"
                      required
                      type="date"
                    />
                    <v-text-field
                      v-model="subscription.end_date"
                      label="End Date"
                      required
                      type="date"
                    />
                  </v-container>
                  <v-btn v-if="!isUpdate" class="blue white--text" @click="createSubscription">Save</v-btn>
                  <v-btn v-if="isUpdate" class="blue white--text" @click="updateSubscription">Update</v-btn>
                  <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>

                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>  
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: 'SubscriptionCreate',
    components: {},
    data() {
      return {
        showError: false,
        subscription: {},
        pageTitle: "Add New Subscription",
        isUpdate: false,
        showMsg: '',
      };
    },
    methods: {
      createSubscription() {
        apiService.addNewSubscription(this.subscription).then(response => {
          if (response.status === 201) {
            this.subscription = response.data;
            this.showMsg = "";
            router.push('/subscription-list/new');
          }else{
            this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      },
      cancelOperation(){
        router.push("/subscription-list");
      },
      updateSubscription() {
        apiService.updateSubscription(this.subscription).then(response => {
          if (response.status === 200) {
            this.subscription = response.data;
            router.push('/subscription-list/update');
          }else{
            this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      }
    },
    mounted() {
      if (this.$route.params.pk) {
        this.pageTitle = "Edit Subscription";
        this.isUpdate = true;
        apiService.getSubscription(this.$route.params.pk).then(response => {
          this.subscription = response.data;
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
      }
    },
  }
</script>
<style scoped>
  .aform {
    margin-left: auto;
    width: 60%;
  }
</style>

