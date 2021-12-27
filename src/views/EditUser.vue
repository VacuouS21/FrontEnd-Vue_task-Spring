<template>
  <div class="panel panel-primary" style="margin-top: 10px">
    <div class="panel-heading">Редактирование пользователя  </div>
    <div class="panel-body">
      <form @submit="handleSubmit">
        <div class="form-group">
          <p><label for="inputTitle">Логин пользователя</label></p>
          <p><input type="text" class="form-control"  id="inputTitle"  v-model="user_login" ></p>
        </div>
        <div class="form-group">
          <label for="inputFio">ФИО</label>
          <p><input type="text" class="form-control" id="inputFio"  v-model="fio"></p>
        </div>
        <div class="form-group">
          <label for="inputFio">Пароль</label>
          <p><input type="text" class="form-control" id="inputPssword"  v-model="user_password"></p>
        </div>
        <button type="submit" class="btn btn-primary pull-right">Сохранить</button>
      </form>
    </div>

  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "EditUser",
  data() {
    return {
      user: this.$route.params.user,
      id: parseInt(this.$route.params.id),
      user_login: "",
      fio: "",
      user_password: "",
      tickets:parseInt(this.$route.params.tickets)
    };
  },
  methods: {
    viewLogin(){
      if(this.user!=null){
        this.user_login=this.user.user_login;
        this.fio=this.user.fio;
        this.user_password=this.user.user_password;
      }
    },
    handleClickBack() {
      console.log('click')
      this.$router.push({name: "edit",params:{id: tickets}});
    },
    async handleSubmit(e) {
      e.preventDefault();
      const item = {
        user_login: this.user_login,
        fio: this.fio,
        user_password: this. user_password,
        tickets: this.tickets
      };
      if (this.id !== 0) {
        item.id = this.id;
        await this.editUser(item);
      } else {
        await this.addUser(item);
      }
      await this.$router.push({name: "edit",params:{id: this.tickets}});
    },
    ...mapActions([
      'addUser',
      'editUser'
    ])
  },
  computed: {
    users() {
      return this.id !== 0 ?
          this.$store.state.users.find(item => item.id === this.id):
          null;
    }
  },
  mounted() {
    this.viewLogin()
  }
}
</script>

<style >
input[type="text"] {
  border: 1px solid black;
  border-radius: 15px;
  width: 300px;
  height: 30px;
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
</style>