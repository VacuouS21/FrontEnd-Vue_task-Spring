
<template>
  <div>
    <h3>Авиабилеты</h3>
  <table class="ticketsTable">
    <thead>
    <tr>
      <th style="width: 10%">№</th>
      <th style="width: 15%">Откуда</th>
      <th style="width: 15%">Куда</th>
      <th style="width: 20%">Дата</th>
      <th style="width: 10%">Стоимость</th>
      <th style="width: 15%">Самолёт</th>
    </tr>
    </thead>
    <tbody>
    <tr  class="tickets" v-for="(item, index) in tickets " :key="index"  ><!--v-for="tickets in rssItems"-->
      <td>{{item.id}}</td>
      <td>{{item.airportFrom.city}}</td>
      <td>{{item.airportWhere.city}}</td>
      <td>{{formatDate(new Date(item.data_flight))}}</td>
      <td>{{item.price}}</td>
      <td>{{item.airplane.name_airplane}}</td>
      <button class="btn"  @click="handleClick($event,item.id)" > Посмотреть пассажиров </button>
    </tr>
    </tbody>
  </table>
  </div>
</template>


<script>

import {mapActions, mapState} from 'vuex';
import {formatDate, wait} from "../utils";
export default {

  name: "List",
  computed: {

    ...mapState({
      tickets: state => state.tickets
    })
  },
  methods:{
    formatDate,
    handleClick (e,id) {
      console.log('click')
      this.$router.push({name:"edit",params:{id: id}})
    },
    ...mapActions([
      'initialize'
    ])
  },

  mounted() {
    this.$nextTick(async () => {
      await this.initialize();
      await wait(500);
      //await this.$router.push({name: "edit",});
    });
  }

  /*computed: mapGetters(["allTickets"]),
  async mounted(){
   this.$store.dispatch('initialize')
  },
  methods:{*/
/*
    editTickets(){
      this.tickets[0].id=12
    },
*/

/*    async getTickets(){
      try {
        const response =await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.tickets=response.data;

        //console.log(response)
      }
      catch (e){
        alert('Ошибка')
      }
    }*/
  //},

/*  computed: {
    /!*rssItems(){
      return this.$store.dispatch('initialize');
    }*!/
    ...mapState({
      rssItems: state => state.rssItems
    })
  }*/
}
</script>

<style scoped>
.tickets{
  padding: 15px;
  border: 2px solid teal;
  matgin-top: 15px;

}
.tickets:hover {background: #0078BF; color: #fff;}
th {
  text-align: center;
  color: #fff;
  background-color: #706d97;
}
td {
 /* min-width: 250px;*/
  color: #696969;
  border-bottom: 1px solid #eee;
}
th, td {
 /* padding: 10px;*/
  height: 20px;
}
td:first-child {
  width: 150px;
  min-width: 0;
}
th:last-child {
  text-align: center;
}
td:last-child {
  width: 80px;
  min-width: 0;
  text-align: center;
}
tr:nth-child(odd) {
  background-color: #eee;
}
</style>