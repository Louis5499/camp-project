import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCFrCY90QeV_F2vqI4ZNpCmtPu3TxttJ28",
  authDomain: "camp-project-ac382.firebaseapp.com",
  databaseURL: "https://camp-project-ac382.firebaseio.com",
  projectId: "camp-project-ac382",
  storageBucket: "camp-project-ac382.appspot.com",
  messagingSenderId: "470156386455"
};
firebase.initializeApp(config);

// Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// Element UI initialize
Vue.use(ElementUI);

var app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// Get database object
var database = firebase.database();

var vm = this;

// Listen for Value
database.ref(`teams`).on('value',(snapShot)=>{
  let datum = snapShot.val();
  console.log(datum);
  store.dispatch('updateData',datum);
})
