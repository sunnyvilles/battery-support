<template>
  <header class="header">
    <div class="header-items">
      <img src="@/assets/battery-icon.svg" alt="Logo" />

      <span>
        <router-link to="/" v-if="$route.name == 'detail'"><button>Back</button></router-link>
      </span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 0px 20px;
  margin: 0px;
  height: 8vh;
  max-height: 100vh;
  background: var(--color_secondary);
  text-align: right;

  .header-items {
    padding-top: 4px;

    img {
      height: 6vh;
      float: left;
    }

    button {
      padding: var(--mp_default);
    }
  }
}
</style>
