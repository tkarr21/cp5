<template>
<div>
  <div class="nameItem" v-for="name in nameList" v-bind:key="name._id">
        <br>
        <h1>{{name.name}}</h1>
        <p>votes: {{name.count}}</p>
        <p class="photoDate">{{formatDate(name.created)}}</p>
        <div v-if="name.user.name">
            <span >{{name.user.name}} &emsp;</span>
            <button @click="upvote(name)">+ 1</button>
            <button @click="downvote(name)">- 1</button>
        </div>
        <div v-else>
            <button @click="remove(name)">Delete</button>
        </div>
    </div>
</div>
</template>


<script>
import moment from 'moment';

export default {
  name: 'NameList',
  props: {
    nameList: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async upvote(name) {
        try {
            await this.$store.dispatch("upvote", {
                id: name._id
            });
            this.$emit('voteFinished');
        } catch (error) {
            console.log();
        }
    },
    async downvote(name) {
        try {
            await this.$store.dispatch("downvote", {
                id: name._id
            });
            this.$emit('voteFinished');
        } catch (error) {
            console.log(error);
        }
    },
    async remove(name) {
        try {
            await this.$store.dispatch("remove", {
                id: name._id
            });
            this.$emit('removeFinished');
        } catch (error) {
            console.log(error);
        }
    }
  }
}
</script>

<style scoped>

.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.nameItem h1 {
    font-family: 'Orbitron', sans-serif;
}
</style>
