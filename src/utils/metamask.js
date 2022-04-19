import detectEthereumProvider from '@metamask/detect-provider';
import { useToast } from 'vue-toastification';
// import Cookies from 'js-cookie';

import i18n from '@/langs/i18n';
import { contractAddress, smartData } from './constants';

export const getContract = () => {
  const toast = useToast();
  let initedWeb3;
  let contract;
  console.log({ contractAddress });
  try {
    initedWeb3 = new window.Web3(
      // new window.Web3.providers.HttpProvider(
      //   'https://data-seed-prebsc-2-s2.binance.org:8545/',
      // ),
      window.ethereum,
    );
    contract = new initedWeb3.eth.Contract(smartData, contractAddress);
  } catch (error) {
    toast.error(
      'Что то пошло не так при инициализации контракта. Попробуйте обновить страницу',
    );
  }

  // console.log('contract.methods:', contract.methods);

  return contract;
};

export const getAcc = async () => {
  const toast = useToast();
  const provider = await detectEthereumProvider();

  if (!provider || !provider.isMetaMask) {
    toast.error(
      i18n.global.t('Установите расширение MetaMask и попробуйте снова!'),
    );
    return undefined;
  }

  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });

    return accounts[0];
  } catch (error) {
    return null;
  }
};

export const sendGift = async (address) => {
  const toast = useToast();
  const contract = getContract();
  const account = await getAcc();

  if (!account) {
    toast.error(
      i18n.global.t('Что то пошло не так при попытке получить адрес'),
    );
    return null;
  }

  const params = {
    from: account,
    to: address,
    id: 0,
    amount: 1,
    data: '0x0',
  };

  console.info('sendGift params: ', params);

  const result = await contract.methods
    .safeTransferFrom(
      params.from,
      params.to,
      params.id,
      params.amount,
      params.data,
    )
    .send({
      from: params.from,
    });

  console.info('buy result: ', result);

  return result;

  // return window.ethereum.request({
  //   method: 'eth_sendTransaction',
  //   params: [
  //     {
  //       from: params.from,
  //       to: contractAddress,
  //       data,
  //     },
  //   ],
  // });
};

export const checkGift = async () => {
  const toast = useToast();
  const contract = getContract();

  const account = await getAcc();
  if (!account) {
    toast.error(
      i18n.global.t('Что то пошло не так при попытке получить адрес'),
    );
    return null;
  }

  // const provider = await detectEthereumProvider();
  console.info('checkGift for:', account);
  const result = await contract.methods.balanceOf(account, 0).call();
  console.info({ result });
  return result;
};
