import Vue from 'vue'
import Vuex from 'vuex'
import RssApi from './api';
``
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tickets: [],
    users:[]
  },
  getters:{

  },
  mutations: {
    //Разобраться
    'SET_RSS_ITEMS'(state, tickets) {
      state.tickets = tickets;
    },
    'ADD_RSS_ITEM'(state, tickets) {
      state.tickets.push(tickets);
    },
    'EDIT_RSS_ITEM'(state, tickets) {
      const item = state.tickets.find(item => item.id === tickets.id);
      Object.assign(item, tickets);
    },
    'REMOVE_RSS_ITEM'(state, tickets) {
      const index = state.tickets.findIndex(item => item.id === tickets.id);
      state.tickets.splice(index, 1);
    },

    'SET_RSS_USER'(state, users) {
      state.users = users;
    },
    'ADD_RSS_USER'(state, users) {
      state.users.push(users);
    },
    'EDIT_RSS_USER'(state, users) {
      const item = state.users.find(item => item.id === users.id);
      Object.assign(item, users);
    },
    'REMOVE_RSS_USER'(state, users) {
      const index = state.users.findIndex(item => item.id ===users.id);
      state.users.splice(index, 1);
    }
  },
  actions: {
    //Тоже разобраться
    async initialize(context) {
      try {
        const response = await RssApi.tickets.getAll();
        context.commit('SET_RSS_ITEMS', response.data );
      } catch (error) {
      //  context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async addItem(context, item) {
      try {
        const response = await RssApi.tickets.add(item);
        context.commit('ADD_RSS_ITEM', response.data );
      } catch (error) {
        //context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async editItem(context, item) {
      try {
        const response = await RssApi.rssItem.edit(item.id, item);
        context.commit('EDIT_RSS_ITEM', response.data );
      } catch (error) {
       // context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async removeItem(context, id) {
      try {
        const response = await RssApi.rssItem.delete(id);
        context.commit('REMOVE_RSS_ITEM', response.data );
      } catch (error) {
        //context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },


    async initializeUser(context) {
      try {
        const response = await RssApi.users.getAll();
        context.commit('SET_RSS_USER', response.data );
      } catch (error) {
        //  context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async addUser(context, item) {
      try {
        const response = await RssApi.users.add(item);
        context.commit('ADD_RSS_USER', response.data );
      } catch (error) {
        //context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async editUser(context, item) {
      try {
        const response = await RssApi.users.edit(item.id, item);
        context.commit('EDIT_RSS_USER', response.data );
      } catch (error) {
        // context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    },
    async removeUser(context, id) {
      try {
        const response = await RssApi.users.delete(id);
        context.commit('REMOVE_RSS_USER', response.data );
      } catch (error) {
        //context.commit('SET_ALERT_TEXT', "Произошла ошибка" );
      }
    }
  },
  modules: {
  }
})
