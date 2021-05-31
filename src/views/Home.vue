<template>
  <div class="home">
    <h1>H=XPLOR</h1>
    <Collection />
  </div>
</template>

<script>
// @ is an alias to /src
import Collection from '@/components/Collection.vue'

export default {
  name: 'Home',
  components: {
    Collection
  }
}
</script>
