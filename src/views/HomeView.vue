<template>
  <div class="home">
    <div class="promo">
      <div class="titleWrap">
        <the-title class="home__title">
          Вы были на нашем вебинаре и мы дарим Вам
          <template v-slot:yellow> Поздравляем! </template>
        </the-title>
      </div>
      <img
        class="promoImg"
        :src="require(`@/assets/images/image.png`)"
        alt="3 nft"
      />
      <p class="home__text text">
        Они станут ключом к материалам курса о Метавселенных для вас и двух
        ваших друзей. А после прохождения курса, ваш NFT-ключ станет ДИПЛОМОМ об
        окончании обучения.
      </p>
    </div>

    <check-button v-if="amountState==='init'" @click="getAmount" />
    <checking-button v-if="amountState === 'loading'" />
    <have-nft-button :haveNft="amount" v-if="amountState === 'have'" @click="getAmount" />
    <sorry-button v-if="amountState === 'error'" @click="getAmount" />

    <p class="text haveKey">
      Если вы уже получили NFT для доступа к курсу, вы можете проверить наличие
      ключа в своём кошельке.
    </p>

    <label for="input">
      <input
        type="text"
        :class="['input', { input_notIPhone: platform !== 'iPhone' }]"
        id="input"
        v-model="address"
        placeholder="ВВЕДИТЕ адрес получателя в сети Binance Smart Chain (BEP20)"
      />
    </label>

    <gift-button v-if="sendState === 'init'" @click="sendNft"/>
    <gift-load-button v-if="sendState === 'loading'" />
    <sent-nft-button :leftNft="amount" v-if="sendState === 'success'" @click="sendNft"/>

    <p class="text sendNft">Отправьте NFT для доступа к курсу своим друзьям.</p>

    <div class="policy">
      Нажимая на кнопку, вы даете согласие на обработку персональных данных и
      соглашаетесь c
      <a
        class="policyLink"
        href="https://oton.org/media/PRIVACY_NOTICE.pdf?b6f7ac2c"
        >политикой конфиденциальности.</a
      >
    </div>

    <div class="metamaskWrap">
      <div class="metamaskIconBox">
        <img
          class="metamaskIcon"
          :src="require(`@/assets/images/metamask.png`)"
          alt="metamaskIcon"
        />
      </div>
      <div class="metamaskText">
        Для получения NFT вам необходимо иметь кошелёк MetaMask с привязкой для
        смартфона в приложении. Приложение MetaMask можно найти и установить как
        для iOS, так и Android.
        <br /><br />
        Регистрация нового кошелька доступна на
        <a class="metamaskLink" href="https://metamask.io/download/"
          >https://metamask.io/download/</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import TheTitle from '@/components/TheTitle.vue';
import CheckButton from '@/components/CheckButton.vue';
import CheckingButton from '@/components/CheckingButton.vue';
import HaveNftButton from '@/components/HaveNftButton.vue';
import SorryButton from '@/components/SorryButton.vue';
import GiftButton from '@/components/GiftButton.vue';
import SentNftButton from '@/components/SentNftButton.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import GiftLoadButton from '@/components/GiftLoadButton.vue';
// import { useRouter } from 'vue-router';
import {

  checkGift, sendGift,
} from '../utils/metamask';

export default {
  name: 'HomeView',
  components: {
    TheTitle,
    CheckButton,
    CheckingButton,
    HaveNftButton,
    SorryButton,
    GiftButton,
    GiftLoadButton,
    SentNftButton,
  },

  setup() {
    // 'init' | 'loading' | 'have' | 'error'
    const amountState = ref('init');
    // 'init' | 'loading' | 'success' | 'error'
    const sendState = ref('init');
    const amount = ref(0);
    const address = ref('');
    const toast = useToast();
    // const router = useRouter();
    const { locale } = useI18n({ useScope: 'global' });

    const { platform } = window.navigator;

    const getAmount = async () => {
      amountState.value = 'loading';
      try {
        const result = await checkGift();

        if (+result) {
          amount.value = +result;
          amountState.value = 'have';
        } else {
          amountState.value = 'error';
        }
      } catch (e) {
        console.error(e);
      }
    };

    const sendNft = async () => {
      sendState.value = 'loading';
      try {
        const currentAmount = await checkGift();
        amount.value = +currentAmount;

        if (amount.value === 0) {
          sendState.value = 'success';
          return;
        }

        const result = await sendGift(address.value);
        if (result) {
          amount.value -= 1;

          sendState.value = 'success';
        } else {
          sendState.value = 'init';
        }
      } catch (e) {
        console.error(e);
        sendState.value = 'init';
        toast.error('Произошла ошибка. Попробуйте позже.');
      }

      address.value = '';
    };

    return {
      locale,
      platform,
      address,

      amount,
      amountState,
      sendState,

      getAmount,
      sendNft,
    };
  },
};
</script>

<style lang="stylus">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    margin-bottom: 16px;
  }

  &__text {
    position: absolute;
    bottom: 13px;

    &:nth-of-type(2) {
      margin-bottom: 32px;
    }
  }
}

.promo {
  position: relative;
  height: 351px;
}

.promoImg {
  position: absolute;
  top: -21px;
  left: -19px;
  display: block;
  width: auto;
  height: 100%;

  +mediaPhoneS() {
    left: 0;
  }
}

.text {
  max-width: $width.phoneXs.buttonText;
  getFontText();

  +mediaPhoneS() {
    min-width: $width.phoneS.buttonText;
  }
}

.policies {
  margin-bottom: 56px;
  text-align: center;
  max-width: 300px;
  getFontPolicies();
}

.policiesLink {
  color: $colorAccent;

  &:hover {
    color: $colorAccent;
    opacity: 0.6;
  }
}

.haveKey {
  margin: 5px 0 17px;
}

.input {
  display: block;
  margin-bottom: 10px;
  padding: 7px 20px;
  width: 280px;
  min-height: 40px;
  getFontText();
  font-weight: 700;
  color: $colorAccent;
  border: 1px solid #FFD600;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: transparent;

  +mediaPhoneS() {
    width: 320px;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    getFontText();
    font-weight: 400;
    color: $colorAccent;
    text-transform: uppercase;
    text-align: center;
    white-space: break-spaces;
  }

  &::-moz-placeholder {
    getFontText();
    font-weight: 400;
    color: $colorAccent;
    text-transform: uppercase;
    text-align: center;
    white-space: break-spaces;
  }

  &:-moz-placeholder {
    getFontText();
    font-weight: 400;
    color: $colorAccent;
    text-transform: uppercase;
    text-align: center;
    white-space: break-spaces;
  }

  &:-ms-input-placeholder {
    getFontText();
    font-weight: 400;
    color: $colorAccent;
    text-transform: uppercase;
    text-align: center;
    white-space: break-spaces;
  }

  &::placeholder {
    getFontText();
    font-weight: 400;
    color: $colorAccent;
    text-transform: uppercase;
    text-align: center;
    white-space: break-spaces;
  }

  &_notIPhone {
    &::-webkit-input-placeholder {
      top: -6px;
      position: relative;
    }

    &::-moz-placeholder {
      top: -6px;
      position: relative;
    }

    &:-moz-placeholder {
      top: -6px;
      position: relative;
    }

    &:-ms-input-placeholder {
      top: -6px;
      position: relative;
    }

    &::placeholder {
      top: -6px;
      position: relative;
    }
  }
}

.sendNft {
  margin: 8px 0 9px;
}

.policy {
  margin-bottom: 16px;
  max-width: 480px;
  getFontPolicies();
  font-style: italic;
  font-weight: 300;
}

.policyLink {
  color: $colorFiller;
  opacity: 0.6;
}

.metamaskText {
  getFontText();
  color: $colorFiller;
}

.metamaskLink {
  getFontText();
  color: $colorFiller;
  font-style: italic;
  font-weight: 300;
  opacity: 0.6;
}

.metamaskWrap {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 13px;
  margin-bottom: 39px;
  width: fit-content;
}

.metamaskIconBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.1);
}

.metamaskIcon {
  display: block;
  width: 22px;
  height: 22px;
}
</style>
