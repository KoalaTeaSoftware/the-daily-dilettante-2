<template>
  <nav class="navbar navbar-expand-lg" aria-label="The chapter nav bar">
    <div class="container-fluid">
      <div class="" id="secondry-nav">
        <div class="navbar-nav">
          <router-link to="/contact" class="nav-link active" aria-current="page">Contact</router-link>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
export default {
  name: "SecondryNav"
}
</script>

<style lang="scss">
@import "src/assets/livery";
#footer{
  .navbar{
    padding:0;
  }
}
#secondry-nav {
  margin-left: auto; // put it on the right of the page
  .a{
    margin: 0;
  }

  .nav-link {
    color: $colour-banner-primary-text;
  }
}

</style>