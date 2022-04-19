<template>
  <div class="getCourseForm">
    <div class="title">
      Получить курс
    </div>

    <label for="email">
      <input type="email" required :class="['input', { input_notIPhone: platform !== 'iPhone' }]" id="email" v-model="email"
        placeholder="ВВЕДИТЕ свой email адрес, по нему будет предоствлен доступ к курсу" />
    </label>

    <GiftButton v-if="state === 'init' || state === 'error'" @click.prevent="onSubmit">
      Получить
    </GiftButton>
    <GiftLoadButton v-if="state === 'loading'" @click.prevent.stop />
    <div v-if="state === 'success'">
      <a href="https://lms.oton.education/training/view/CHto-takoe-metavselennaya" target="_blank">
        <SentNftButton  isStable>
          <span>
            Перейти к курсу
          </span>
        </SentNftButton>
      </a>
    </div>
    <div style="color: red; margin-top: 5px; text-align: center;" v-if="state === 'error'">
      Что то пошло не так. Попробуйте позже. Или обратитесь в поддержку
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import { checkGift, getAcc, sendGift } from '../utils/metamask';

import GiftButton from './GiftButton.vue';
import GiftLoadButton from './GiftLoadButton.vue';
import SentNftButton from './SentNftButton.vue';

export default {
  name: 'GetCourseForm',
  components: { GiftButton, GiftLoadButton, SentNftButton },
  setup() {
    const email = ref('');
    const state = ref('init');

    const { platform } = window.navigator;

    const isGroupMember = async (userEmail) => {
      const result = await fetch(`https://lms.oton.education/oton/api/users/check?type=member&group_id=97&email=${userEmail}`);
      const json = await result.json();
      const isMember = json.data.is_member;

      console.info({ isMember });

      return isMember;
    };

    const hasNFT = async () => {
      try {
        const resultOfGifts = +(await checkGift());
        return resultOfGifts && resultOfGifts > 0;
      } catch (e) {
        console.error('hasNFT error: ', e);
        return false;
      }
    };

    const joinToGroup = async (userEmail, txid) => {
      try {
        const account = await getAcc();

        const result = await fetch(`https://lms.oton.education/oton/api/nft?address=${account}&email=${userEmail}&txid=${txid}`);

        const json = await result.json();
        const { data } = json;

        console.info({ joinData: data });

        return data.result;
      } catch (e) {
        console.error('hasNFT error: ', e);
        return false;
      }
    };

    const onSubmit = async () => {
      if (state.value === 'loading' || state.value === 'success') {
        return;
      }

      const userEmail = email.value;
      state.value = 'loading';

      let isMember;
      try {
        isMember = await isGroupMember(userEmail);
      } catch (e) {
        state.value = 'error';
        console.error('isGroupMember error: ', e);
        return;
      }

      if (isMember) {
        state.value = 'error';
        return;
      }

      const isNFT = await hasNFT();
      if (!isNFT) {
        state.value = 'error';
        return;
      }

      let result;

      try {
        result = await sendGift('0xAC08D2F063aC3b864B0E672aa774F149624629d1');
      } catch (e) {
        state.value = 'error';
        console.error('sendGift error: ', e);
      }
      if (result) {
        const isJoined = await joinToGroup(userEmail, result.transactionHash);
        if (isJoined) {
          email.value = '';
          state.value = 'success';
        } else {
          state.value = 'error';
        }
      } else {
        state.value = 'error';
      }
    };

    return {
      state,
      email,
      platform,
      onSubmit,
    };
  },
};
</script>

<style lang="stylus" scoped>
.title {
  text-transform uppercase;
  font-size 22px;
  margin-bottom: 10px;
  color: #ffd600;
}
.getCourseForm {
  display flex
  flex-wrap:wrap;
  justify-content center
  margin-bottom 30px
}

</style>
