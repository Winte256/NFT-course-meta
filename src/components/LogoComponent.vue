<template>
  <router-link to="/" class="logo">
    <base-icon-svg :width="96" :height="41" viewBox="0 0 96 41">
      <logo-icon />
    </base-icon-svg>
  </router-link>
</template>

<script>
import BaseIconSvg from '@/components/BaseIconSvg.vue';
import LogoIcon from '@/components/SvgIcons/LogoIcon.vue';

export default {
  name: 'LogoComponent',
  components: {
    BaseIconSvg,
    LogoIcon,
  },
};
</script>

<style lang="stylus" scoped>
.logo {
  position: relative;
  top: -2px;
}
</style>
