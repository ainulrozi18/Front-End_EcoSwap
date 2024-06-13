/* eslint-disable no-undef */
import $ from 'jquery';
import { createHomeAdminTemplate } from '../templates/template-creator';

const HomeAdmin = {
  async render() {
    return `
      <div class="container-home-admin container-xxl px-3"></div>
    `;
  },

  async afterRender() {
    const homeAdminContainer = $('.container-home-admin');
    homeAdminContainer.append(createHomeAdminTemplate());
  },
};

export default HomeAdmin;
