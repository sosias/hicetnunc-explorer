<template>
  <div class="infos">
    <h2>
      to start explore a collection, type the address you want in the url. Use this format
    <a href="#/tz1SREjxzP3Eycw4XSDzgdMMZrys9pUidJzr">/#/tz1SREjxzP3Eycw4XSDzgdMMZrys9pUidJzr</a>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'Infos'
}
</script>

<style lang="scss" scoped>
.infos{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;

  h2{
    max-width: 535px;
    word-break: break-word;
  }
}
</style>
