<template>
  <div class="userCard">
        <section class="userCard__infos">
            <div class="userCard__alias">{{ alias }}</div>
            <div class="userCard__socials"> 
              <a v-if="website_uri" v-bind:href="website_uri">🌐</a>
              <a v-if="twitter_name" v-bind:href="'https://twitter.com/' + twitter_name">🐦</a>
              <a v-if="instagram_name" v-bind:href="'https://instagram.com/' + instagram_name">📸</a>
            </div>
        </section>
        <section class="userCard__thumb" v-on:click="getSwaps">
          <a v-bind:href="'https://www.hicetnunc.xyz/tz/' + address">
            <img v-if="address" v-bind:src="getThumbUri(address)" />
            <div v-else class="userCard__placeholder">No thumb</div>
          </a>
            <div class="label" v-if="balance==0">listed</div>
        </section>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    address: String,
    alias: String,
    description: String,
    thumbnail_uri: String,
    website_uri: String,
    twitter_name: String,
    instagram_name: String
  },
  data: function(){
    return{
      swaps: [],
    }
  },
  methods: {
      getThumbUri: function(address){
          return 'https://services.tzkt.io/v1/avatars2/' + address
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.userCard{
  display: flex;
  flex-wrap: wrap;
    width: 300px;
    &__infos{
      width: 250px;
      word-break: break-word;
      text-align: end;
    }
    &__thumb{
      position: relative;
      width: 50px;
      img{
        width: 100%;
        height: auto;
      }
    }
    &__placeholder{
      width: 50px;
      height: 50px;
      border: 1px solid #fff2;
    }

    &__alias{
      padding-right: 1px;
    }
    &__socials{
      padding-right: 1px;
      a{
        padding-left: 10px;
        text-decoration: none;
        font-size: 25x;
        font-size: 22px;
        &:hover{
          color: #fff;
        }
      }
    }
}
</style>
