<template>
  <div class="title">
    <div class="titleText titleText_yellow">
      <slot name="yellow" />
    </div>
    <div class="titleText">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheTitle',
};
</script>

<style lang="stylus" scoped>
.title {
  max-width: 480px;
}

.titleText {
  getFontH1();
  color: $colorPurple;
  text-transform: uppercase;

  &_yellow {
    color: $colorAccent;
  }
}
</style>
