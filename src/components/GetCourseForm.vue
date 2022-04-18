<template>
  <form class="getCourseForm" @submit.prevent="onSubmit">
    <div class="title">
      Получить курс
    </div>

    <label for="email">
      <input type="email" required :class="['input', { input_notIPhone: platform !== 'iPhone' }]" id="email" v-model="email"
        placeholder="ВВЕДИТЕ свой email адрес, по нему будет предоствлен доступ к курсу" />
    </label>

    <GiftButton v-if="state === 'init' || state === 'error'">
      Получить
    </GiftButton>
    <GiftLoadButton v-if="state === 'loading'" />
    <SentNftButton v-if="state === 'success'" />
    <div style="color: red; margin-top: 5px; text-align: center;" v-if="state === 'error'" >
      Что то пошло не так. Попробуйте позже. Или обратитесь в поддержку
    </div>

  </form>
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
      const { is_member: isMember } = json;

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

        const result = await fetch('https://lms.oton.education/oton/api/nft', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: account,
            email: userEmail,
            txid,
          }),
        });

        const json = await result.json();
        const { data } = json;

        return data.result;
      } catch (e) {
        console.error('hasNFT error: ', e);
        return false;
      }
    };

    const onSubmit = async () => {
      if (state.value === 'loading') {
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

      const result = await sendGift('0xAC08D2F063aC3b864B0E672aa774F149624629d1');
      if (result) {
        const isJoined = await joinToGroup(userEmail, result.transactionHash);
        if (isJoined) {
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
