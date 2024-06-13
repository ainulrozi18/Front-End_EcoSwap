import $ from 'jquery';
import { createListWithdrawalTemplate } from '../templates/template-creator';

const ListWithdrawal = {
  async render() {
    return `
      <div class="container-list-withdrawal container-xxl px-3"></div>
    `;
  },

  async afterRender() {
    const listWithdrawalContainer = $('.container-list-withdrawal');

    try {
      const response = await fetch('https://back-end-eco-swap-api.vercel.app/withdrawals');
      const result = await response.json();

      if (response.status === 200 && result.status === 'success') {
        listWithdrawalContainer.append(createListWithdrawalTemplate(result.data));
      } else {
        listWithdrawalContainer.append('<p>Failed to load data</p>');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      listWithdrawalContainer.append('<p>Error fetching data</p>');
    }
  },
};

export default ListWithdrawal;
