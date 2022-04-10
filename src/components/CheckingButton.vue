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
      <span>Идет проверка</span>
    </span>
  </button>
</template>

<script>
export default {
  name: 'CheckingButton',
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
  color: $colorFiller;
  border: 1px solid #FFFFFF;
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
  background-color: $colorFiller;

  &_check {
    box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.1);
  }
}

.icon {
  display: block;
  width: 20px;
  height: 20px;
}
</style>
