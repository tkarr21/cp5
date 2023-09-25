<template>
  <div class="home">
    <h1>Band.Names</h1>
      <p>Trying to to think of a cool band name?? Enter in some nouns and adjectives and let Band.Names make a cool combination for a unique name!</p>
      <generator :nouns="nouns" :adjectives="adjectives"></generator>
      <nameList :nameList="bandnames" @upvote="voteFinished" @downvote="voteFinished"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Generator from "@/components/Generator.vue"
import NameList from '@/components/NameList.vue';

export default {
  
  name: "home",
  components: {
    Generator,
    NameList
  },
  computed: {
    nouns() {
      return this.$store.state.nouns;
    },
    adjectives() {
      return this.$store.state.adjectives;
    },
    bandnames() {
      return this.$store.state.bandnames
    }
  },
  async created() {
    await this.$store.dispatch("getAllNames");
  },

  methods: {
    async voteFinished() {
      try {
        await this.$store.dispatch("getAllNames");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
