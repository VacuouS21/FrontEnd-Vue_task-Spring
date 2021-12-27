<template>
  <div>
  <h3>Пассажиры рейса N{{id}}</h3>
<div>
  <ul class="list5b" v-for="(item, index) in users " :key="index" v-if="item.tickets==id">
    <li>Рейс: {{item.tickets}}  ФИО: {{item.fio}}  Логин: {{item.user_login}} <a href="#openModal"><button class="btn" @click="user=item,ticketsId=id" > Редактировать </button></a>   <a href="#openModal"><button class="btn" @click="user=item,ticketsId=id,deleteUser=true" >  Удалить </button></a>
    </li>
  </ul>
</div>
    <p class="warn">{{text}}</p>
    <button class="btn" @click="handleClickEdit($event,0,id,null)" > Добавить  </button>
    <button class="btn" @click="handleClickBack"> Назад </button>

<!--    <a href="#openModal">Открыть модальное окно</a>-->

    <div id="openModal" class="modalDialog">
      <div>
        <a href="#close" title="Закрыть" class="close">X</a>
        <h2>Запрос на изменение</h2>
        <p><label for="inputTitle">Введите пароль</label></p>

        <p><input type="text" class="form-control"  id="inputTitle"  v-model="user_password" ></p>
       <a href="#close"> <button class="btn" @click="handleClickEdit($event,user.id,id,user,user_password,deleteUser),user_password=null"  > Применить </button></a>

      </div>
    </div>
  </div>
</template>

<script>
import {formatDate, wait} from "../utils";
import {mapActions,mapState} from "vuex";

export default {
  name: "EditList",
  data(){
    return{id: parseInt(this.$route.params.id),
      user_password:"",
      user:"",
      ticketsId:"",
      deleteUser:false,
      text:""
    };
  },
  computed: {

    ...mapState({
      users: state => state.users
    })
  },
  methods: {
    handleClickEdit (e,id,tickets,user,pass,deleteUser) {
      console.log('click')

        if (user != null) {
          if (user.user_password == pass) {
            this.text = ""
            if (deleteUser) this.handleRemoveClick(e, user.id)
            if (!deleteUser) this.$router.push({name: "editUser", params: {id: id, tickets: tickets, user: user}})
          }
          if (user.user_password != pass) this.text = "Неверный пароль, пожалуйста попробуйте ещё раз"
        }
        if (user == null) this.$router.push({name: "editUser", params: {id: id, tickets: tickets, user: user}});


// href="#openModal"
    },
    handleClickBack() {
      console.log('click')
      this.$router.push({name: "List"});
    },
    async handleRemoveClick(e, id) {
      await this.removeUser(id);
    },
    ...mapActions([
      'removeUser',
      'initializeUser',
    ])
  },
  mounted() {
    this.$nextTick(async () => {
      await this.initializeUser();
      await wait(500);
      //await this.$router.push({name: "edit",});
    });
  }

}
</script>

<style scoped>
.list5b {
  padding:0;
  list-style: none;
}
.list5b li {
  position: relative;
  padding: 10px 30px;
  background: linear-gradient(to left, #EFEFEF 0%, #FFF, #EFEFEF);
  border: 2px solid #C0C0C0;
  color: #506a6b;
  box-shadow: 0 5px 5px 0 rgba(0,0,0, .2);
  margin-bottom: 5px;
  text-align:center;
  background-size: 100% 100%;
  z-index: 1;
}
.list5b li:hover {
  border: 2px solid #ADCEE9;
}
.list5b li:before {
  content: "";
  position:absolute;
  width: 0;
  height: 100%;
  top: 50%;
  left: 50%;
  background: linear-gradient(to left, #E2F0FA 0%, #FFF, #E2F0FA);
  opacity: 0;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  z-index: -1;
}
.list5b li:hover:before {
  width: 100%;
  opacity: 1;
}

.btn {
  font-weight: 700;
  color: white;
  text-decoration: none;
  padding: .8em 1em calc(.8em + 3px);
  border-radius: 3px;
  background: rgb(64,199,129);
  box-shadow: 0 -3px rgb(53,167,110) inset;
  transition: 0.2s;
}
.btn:hover { background: rgb(53, 167, 110); }
.btn:active {
  background: rgb(33,147,90);
  box-shadow: 0 3px rgb(33,147,90) inset;
}
.modalDialog {
  position: fixed;
  font-family: Arial, Helvetica, sans-serif;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0.8);
  z-index: 99999;
  -webkit-transition: opacity 400ms ease-in;
  -moz-transition: opacity 400ms ease-in;
  transition: opacity 400ms ease-in;
  display: none;
  pointer-events: none;
}
.modalDialog:target {
  display: block;
  pointer-events: auto;
}

.modalDialog > div {
  width: 400px;
  position: relative;
  margin: 10% auto;
  padding: 5px 20px 13px 20px;
  border-radius: 10px;
  background: #fff;
  background: -moz-linear-gradient(#fff, #999);
  background: -webkit-linear-gradient(#fff, #999);
  background: -o-linear-gradient(#fff, #999);
}
.close {
  background: #606061;
  color: #FFFFFF;
  line-height: 25px;
  position: absolute;
  right: -12px;
  text-align: center;
  top: -10px;
  width: 24px;
  text-decoration: none;
  font-weight: bold;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px;
  -moz-box-shadow: 1px 1px 3px #000;
  -webkit-box-shadow: 1px 1px 3px #000;
  box-shadow: 1px 1px 3px #000;
}

.close:hover { background: #00d9ff; }
.warn{
  color: red;
}
</style>