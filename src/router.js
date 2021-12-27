import Vue from 'vue'
import Router from 'vue-router'
import EditList from "./views/EditList";
import List from "./views/List";
import Loader from "./views/Loader";
import App from './App';
import EditUser from "./views/EditUser";

Vue.use(Router)


export default new Router({
  mode:'history',
  routes:[
    { path: "/", name: "loader", component: Loader },
    { path: "/app", component: App, children: [
        { path: "/", name: "loader", component: Loader },
        { path: "/", name: "List", component: List },
        { path: "/:id", name: "edit", component: EditList },
            {path:"user/:id", name:"editUser", component: EditUser}
      ]}
  /*  {
      path:'/user',
      component:EditList
    },
    {
      path:'/',
      component:List
    }*/
  ]
})
