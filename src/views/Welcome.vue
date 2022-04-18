<template>
  <!--suppress HtmlUnknownBooleanAttribute -->
  <div id="welcome" class="container fluid">
    <h1>Welcome</h1>
    <editable-div identity="welcome-1"></editable-div>
  </div>
</template>

<style lang="scss">
@import "src/assets/livery";

#welcome {
  text-align: center !important;
}
</style>

<script>

import EditableDiv from "@/components/EditableDiv";
export default {
  name: 'Welcome',
  components: {EditableDiv}
}
</script>
