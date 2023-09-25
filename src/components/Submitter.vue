<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Submit Name</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="submitName">
            <input v-model="bandname" placeholder="Band Name">
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>


<script>
export default {
  name: 'Submitter',
  props: {
    show: Boolean,
  },
  data() {
    return {
      bandname: '',
      error: '',
    }
  },
    methods: {
        close() {
            this.$emit('escape');
        },
        
        async submitName() {
            console.log("name before dispatch " + this.bandname);
            try {
                this.error = await this.$store.dispatch("submitName", {
                    bandname: this.bandname
                });
                if (!this.error) {
                    this.bandname = '';
                    this.$emit('submitFinished');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}


</script>

<style scoped>
input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px
}

.pure-button-secondary {
  float: right;
}
</style>