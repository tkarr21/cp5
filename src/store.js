import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    bandnames: [],
    nouns: [],
    adjectives: [],
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setNames(state, bandnames) {
      state.bandnames = bandnames;
    },
    appendNoun(state, noun) {
      state.nouns.push(noun);
    },
    appendAdj(state, adjective) {
      state.adjectives.push(adjective);
    },
    
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },

    async submitName(context, data) {

      console.log("what is sent as a name " + data.bandname);
      try {
        await axios.post('/api/bandnames', {
          name: data.bandname,
          count: 0,
        });
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async getMyNames(context) {
      try {
        let response = await axios.get("/api/bandnames");
        context.commit('setNames', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },

    async getAllNames(context) {
      try {
        let response = await axios.get("/api/bandnames/all");
        context.commit('setNames', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },

    async upvote(context, data) {
      try {
        await axios.put('/api/bandnames/' + data.id, {
          vote: 'plus'
        });
        await this.getAllNames();
      } catch (error) {
        console.log(error);
      }
    },

    async downvote(context, data) {
      try {
        await axios.put('/api/bandnames/' + data.id, {
          vote: 'minus'
        });
        await this.getAllNames();
      } catch (error) {
        console.log(error);
      }
    },

    async remove(context, data) {
      try {
        await axios.delete('/api/bandnames/' + data.id);
        await this.getAllNames();
        
      } catch (error) {
        console.log(error);
      }
    },

    addNoun(context, data) {
      context.commit('appendNoun', data.noun);
    },
    addAdj(context, data) {
      context.commit('appendAdj', data.adjective);
    },

    
  }
})
