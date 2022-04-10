<template>
  <button class="button">
    <span class="buttonBox buttonBox">
      <span class="iconBox iconBox_sorry">
        <img
          class="icon"
          :src="require(`@/assets/images/sorry.png`)"
          alt="icon"
        />
      </span>
      <span>NFT не найдены</span>
    </span>
  </button>
</template>

<script>
export default {
  name: 'SorryButton',
  props: {
    haveNft: {
      type: Number,
    },
  },
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
  background-color: $dangerPurple;
  box-shadow: 0px 10px 20px 10px rgba(80, 45, 136, 0.2);

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

  &_sorry {
    box-shadow: 0px 2px 5px rgba(240, 72, 0, 0.5);
  }
}

.icon {
  display: block;
  width: 20px;
  height: 20px;
}
</style>
