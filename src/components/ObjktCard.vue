<template>
  <div class="objktCard">
        <section class="objktCard__infos">
          <div>
            <h2>{{ name }}</h2>
            <p>{{ description }}</p>
            <div>{{ balance }} <a v-bind:href="'https://www.hicetnunc.xyz/objkt/' + token_id">/OBJKT/{{ token_id }}</a></div>
          </div>
          <UserCardFetch v-for="creator,index in creators" :key=index v-bind:address="creator"/>
        </section>
        <section class="objktCard__thumb" v-on:click="getSwaps">
            <img v-if="thumbnail_uri" v-bind:src="convertIPFSToHttp(thumbnail_uri)" />
            <div v-else class="objktCard__placeholder">No thumb yet. H=N is working on this</div>
            <div class="label" v-if="balance==0">listed</div>
        </section>
        <section class="objktCard__swaps">
            <div v-for="swap,index in swaps" :key=index>{{swap}}</div>
        </section>
        <section class="objktCard__boughtInfos">
            <div v-for="item,index in boughtInfos" :key=index>
              <span v-if="item.amount">{{item.amount.tezos/1000000}}</span> <small v-if="item.amount">{{item.timestamp.substring(2, 10)}}</small>
            </div>
        </section>
  </div>
</template>

<script>
import UserCardFetch from '@/components/UserCardFetch.vue'

export default {
  name: 'ObjktCard',
  components: {
    UserCardFetch
  },
  props: {
    name: String,
    description: String,
    balance: String,
    token_id: Number,
    thumbnail_uri: String,
    creators: Array,
    boughtInfos: Array
  },
  data: function(){
    return{
      swaps: [],
    }
  },
  methods: {
      convertIPFSToHttp: function(ipfsUrl){
          let ipfsHash = ipfsUrl && ipfsUrl.replace('ipfs://','')
          return 'https://cloudflare-ipfs.com/ipfs/' + ipfsHash
      },
      getSwaps: function(){
        fetch('https://51rknuvw76.execute-api.us-east-1.amazonaws.com/dev/objkt?id='+this.token_id)
          .then(resp=>resp.json())
          .then(json=>{
            this.swaps = json.result.swaps.map((item)=>{return item.xtz_per_objkt/1000000}).sort((a,b)=>a-b)
          })
          .catch(err=>{console.log(err)})
      },
  },
  mounted(){
    this.getSwaps()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.objktCard{
  display: flex;
  flex-wrap: wrap;
    width: 755px;
    &__infos{
      width: 300px;
      word-break: break-word;
      display: flex;
      flex-direction: column; 
      justify-content: space-between;
    }
    &__thumb{
      position: relative;
      width: 300px;
      img{
        width: 100%;
        height: auto;
      }
    }
    &__placeholder{
      width: 300px;
      height: 300px;
      border: 1px solid #fff2;
    }
    &__swaps{
      padding-left: 5px;
      width: 45px;
    }
    &__boughtInfos{
      padding-left: 5px;
      width: 100px;

      span{
        background-color: #c6538c;
        padding: 3px;
        color: #171717;
      }
    }

    .label{
      position: absolute;
      z-index: 2;
      background-color: #c6538c;
      padding: 10px 15px;
      bottom: 18px;
      right: -5px;
    }
}
</style>
