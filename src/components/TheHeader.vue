<template>
  <header class="header">
    <logo-component />
  </header>
</template>

<script>
import LogoComponent from '@/components/LogoComponent.vue';

export default {
  name: 'TheHeader',
  components: {
    LogoComponent,
  },
};
</script>

<style lang="stylus" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 20px 0 5px;
}
</style>
