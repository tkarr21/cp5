<template>
<div class="modal-body">
    <form @submit.prevent="addNoun">
        <input v-model="noun" placeholder="Noun">
        <button type="submit" class="pure-button-secondary">Add</button>
    </form>
    <br/>

    <form @submit.prevent="addAdj">
        <input v-model="adjective" placeholder="Adjective">
        <button type="submit" class="pure-button-secondary">Add</button>
    </form>
    <br/>
    <div v-if="nouns && adjectives">
        <button class="pure-button-primary" @click="generateName">Make a Name</button>
    </div>
    <h3 v-if="genName">{{genName}}</h3>
</div>
</template>


<script>
export default {
    name:'generator',
    props: {
        nouns: {
            type: Array,
            required: true
        },
        adjectives: {
            type: Array,
            required: true
        }  
    },
    data() {
        return {
            adjective: '',
            noun: '',
            genName: ''
        };
    },


    methods: {
        addNoun() {
            this.$store.dispatch("addNoun", {
                noun: this.noun
            });
        },
        addAdj() {
            this.$store.dispatch("addAdj", {
                adjective: this.adjective
            });
        },

        getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
        },

        generateName() {
            if (this.nouns.length == 0 || this.adjectives.length == 0) {
                this.genName = "";
            }
            else {
                let nIndex = this.getRandom(1, this.nouns.length);
                let aIndex = this.getRandom(1, this.adjectives.length);
                //console.log(nIndex + " " + aIndex);

                this.genName = this.adjectives[aIndex - 1] + " " + this.nouns[nIndex - 1];
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