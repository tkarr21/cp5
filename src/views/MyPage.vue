<template>
<div>
  <div v-if="user">
    <div class="header">
      <div>
        <h1>{{user.name}}</h1>
      </div>
      <div>
        <p>
          <a @click="toggleUpload"><i class="fa fa-plus" aria-hidden="true"></i></a>
          <a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a>
        </p>
      </div>
    </div>
    <escape-event @escape="escape"></escape-event>
    <submitter :show="show" @escape="escape" @submitName="submitFinished" />
    <nameList :nameList="bandnames"  @remove="removeFinished"/>
  </div>
  <div v-else>
    <p>If you would like to submit names, please register for an account or login.</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>

<script>
import EscapeEvent from '@/components/EscapeEvent.vue';
import Submitter from '@/components/Submitter.vue';
import NameList from '@/components/NameList.vue';

export default {
  name: 'mypage',
  components: {
      EscapeEvent,
      Submitter,
      NameList
  },
  data() {
    return {
      show: false
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    bandnames() {
        return this.$store.state.bandnames
    }
  },

  created() {
    this.$store.dispatch("getUser");
    this.$store.dispatch("getMyNames");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async submitFinished() {
      this.show = false;
      try {
        this.error = await this.$store.dispatch("getMyNames");
      } catch (error) {
        console.log(error);
      }
    },
    async removeFinished() {
        try {
            await this.$store.dispatch("getMyNames");
        } catch (error) {
            console.log(error);
        }
    }
  }
}
</script>



<style scoped>
.header {
  display: flex;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}
</style>
