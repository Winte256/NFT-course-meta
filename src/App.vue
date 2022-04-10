<template>
  <div class="base-wrapper">
    <div class="base-container">
      <the-header />
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
  },
};
</script>

<style lang="stylus">
@import '@/assets/styles/normalize.css';
@import '@/assets/styles/main.css';

#app {
  color: $colorFiller;
}

.base-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: radial-gradient(163.75% 54.16% at 65.47% 40.08%, #A886DE 44.25%, #564D8D 100%);
}

.base-container {
  padding: 0 20px;
  margin: auto;
  width: 100%;
  max-width: 280px;
  min-height: 100vh;
  box-sizing: content-box;

  +mediaPhoneS() {
    max-width: 320px;
  }
}
</style>
