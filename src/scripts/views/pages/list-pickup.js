import $ from 'jquery';
import { createListPickupTemplate } from '../templates/template-creator';

const ListPickup = {
  async render() {
    return `
      <div class="container-list-pickup container-xxl px-3"></div>
    `;
  },

  async afterRender() {
    const homeContainer = $('.container-list-pickup');

    try {
      const response = await fetch('https://back-end-eco-swap-api.vercel.app/pickups');
      const result = await response.json();

      if (response.status === 200 && result.status === 'success') {
        homeContainer.append(createListPickupTemplate(result.data));
      } else {
        homeContainer.append('<p>Failed to load data</p>');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      homeContainer.append('<p>Error fetching data</p>');
    }
  },
};

export default ListPickup;
