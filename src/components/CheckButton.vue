<template>
  <button class="button">
    <span class="buttonBox">
      <span class="iconBox iconBox_check">
        <img
          class="icon"
          :src="require(`@/assets/images/lense.png`)"
          alt="icon"
        />
      </span>
      <slot>
        <span>Проверить</span>
      </slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'CheckButton',
};
</script>

<style lang="stylus" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  min-width: $width.phoneXs.buttonText;
  border-radius: 20px;
  getFontButton();
  color: $colorPurple;
  background-color: $colorFiller;
  box-shadow: inset 0px 10px 20px -5px rgba(64, 46, 158, 0.4), 0px 10px 20px 10px rgba(80, 45, 136, 0.2);
  text-transform: uppercase;

  +mediaPhoneS() {
    min-width: $width.phoneS.buttonText;
  }

  +mediaTablet() {
    min-width: 248px;
  }
}

.buttonBox {
  display: grid;
  width: fit-content;
  grid-auto-flow: column;
  grid-column-gap: 6px;
  align-items: center;
}

.iconBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  &_checking {
    background-color: transparent;
    outline: 1px solid $colorFiller;
    box-shadow: unset;
  }
}

.icon {
  display: block;
  width: 20px;
  height: 20px;
}
</style>
