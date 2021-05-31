<template>
  <div class="hello">
  <span class="highlight">{{total}}</span> objkts in <a v-bind:href="'https://www.hicetnunc.xyz/tz/' + address">{{ address }}</a>
    <div id="array-rendering">
      <div class="assets">
        <ObjktCard v-for="item in items" 
            :key="item.token_id" 
            v-bind:name="item.name" 
            v-bind:description="item.description" 
            v-bind:balance="item.balance" 
            v-bind:token_id="item.token_id"
            v-bind:thumbnail_uri="item.display_uri"
            v-bind:creators="item.creators"
            v-bind:boughtInfos="boughtInfos[item.token_id]"/>
      </div>
    </div>
    <button v-if="items.length<total" v-on:click="loadNext"><h1>VVV</h1></button>
  </div>
</template>

<script>
// @ is an alias to /src
import ObjktCard from '@/components/ObjktCard.vue'
import {getObjktBoughtPrice} from '@/utils/data.js'

export default {
  name: 'Collection',
  components: {
    ObjktCard
  },
  props: {
    address: String
  },
  data: function(){
    return{
      items: [],
      total: null,
      offset: 0,
      transactions: [],
      boughtInfos: {}
    }
  },
  methods: {
    fetchCollection: function(){
      fetch('https://api.better-call.dev/v1/account/mainnet/'+this.address+'/token_balances?offset=' + this.offset)
        .then(resp=>resp.json())
        .then(json=>{
          this.items.push(...json.balances)
          this.total = json.total
        })
        .catch(err=>{console.log(err)})
    },
    fetchUserTransactions: function(){
      getObjktBoughtPrice(this.address)
        .then(boughtInfosTmp=>{
          this.boughtInfos = boughtInfosTmp
        })
        .catch(err=>{console.log(err)})
        .finally(
          this.fetchCollection()
        )
    },
    loadNext: function(){
      this.offset += 10
      this.fetchCollection()
    }
  },
  mounted(){
    this.fetchUserTransactions()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.assets{
  display: flex;
  flex-wrap: wrap;
}
</style>
