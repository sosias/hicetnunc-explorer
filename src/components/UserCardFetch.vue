<template>
  <div class="userCard">
        <UserCard v-bind:alias="alias"
                  v-bind:description="description"
                  v-bind:thumbnail_uri="thumbnail_uri"
                  v-bind:website_uri="website_uri"
                  v-bind:twitter_name="twitter_name"
                  v-bind:instagram_name="instagram_name"
                  v-bind:address="address"/>
  </div>
</template>

<script>
import UserCard from '@/components/UserCard.vue'

export default {
  name: 'UserCardFetch',
  components: {
    UserCard
  },
  props: {
    address: String,
  },
  data: function(){
    return {
      alias: "",
      description: "",
      thumbnail_uri: "",
      website_uri: "",
      twitter_name: "",
      instagram_name: ""
    }
  },
  methods: {
    getMeta: function(){
      fetch('https://api.tzkt.io/v1/accounts/'+this.address+'/metadata')
        .then(resp=>resp.json())
        .then(json=>{
          this.alias = json.alias
          this.description = json.description
          this.thumbnail_uri= json.thumbnail_uri
          this.website_uri= json.site
          this.twitter_name= json.twitter
          this.instagram_name= json.instagram
        })
        .catch(err=>{console.log(err)})
    },
  },
  mounted(){
    this.getMeta()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
