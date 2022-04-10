<template>
  <button :class="['button', `button_${state}`]">
    <span class="buttonBox">
      <span class="iconBox">
        <img
          class="icon"
          :src="require(`@/assets/images/${icon}.png`)"
          alt="icon"
        />
      </span>
      <span v-if="state === 'check'">Проверить</span>
      <span v-if="state === 'checking'">Идет проверка</span>
      <span v-if="state === 'gift'">Подарить</span>
      <span v-if="state === 'haveNft'">У вас есть {{ haveNft }} NFT</span>
      <span v-if="state === 'sentNft'"
        >NFT Отправлено. Осталось {{ leftNft }} NFT</span
      >
    </span>
  </button>
</template>

<script>
export default {
  name: 'CheckButton',

  props: {
    state: {
      type: String,
      default: 'gift',
    },
    haveNft: Number,
    leftNft: Number,
  },

  computed: {
    icon() {
      const iconObject = {
        check: 'lense',
        checking: 'lense',
        gift: 'gift',
        sorry: 'sorry',
        haveNft: 'magic',
        sentNft: 'magic',
      };

      return iconObject[this.state];
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
  background-color: $colorFiller;
  box-shadow: inset 0px 10px 20px -5px rgba(64, 46, 158, 0.4), 0px 10px 20px 10px rgba(80, 45, 136, 0.2);

  +mediaPhoneS() {
    min-width: $width.phoneS.buttonText;
  }

  +mediaTablet() {
    min-width: 248px;
  }

  &_gift {
    background-color: $colorAccent;
    box-shadow: unset;
  }

  &_checking {
    background-color: transparent;
    outline: 1px solid $colorFiller;
    box-shadow: unset;
  }

  &_sorry {
    background: #FECBFF;
    box-shadow: 0px 10px 20px 10px rgba(80, 45, 136, 0.2);
  }

  &_haveNft {
    background: #D5BBFF;
    box-shadow: 0px 10px 20px 10px rgba(80, 45, 136, 0.2);
  }
}

.buttonBox {
  display: grid;
  width: fit-content;
  grid-auto-flow: column;
  grid-column-gap: 6px;
}

.iconBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  &_gift {
    box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.1);
  }

  &_check {
    box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.1);
  }

  &_haveNft, & {
    box-shadow: 0px 2px 5px rgba(240, 202, 0, 0.5);
  }

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
