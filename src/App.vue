<template>
  <div class="main">
    <h1 class="main_title">H=XPLOR</h1>
    <small>still a work in progress!!! RAW and buggy! be careful</small>
    
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>

    <footer>
      <a href="https://github.com/sosias/hicetnunc-explorer">github</a> / <a href="https://tzkt.io/">Powered by TzKT API</a>
    </footer>
  </div>  
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;

  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #fff;
    }
  }
}

.main_title{
  margin-top: 0px;
}

.main{
  position: relative;
  min-height: 100%;
}

h1{
  display: inline;
}

footer{
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
