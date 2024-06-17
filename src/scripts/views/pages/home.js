/* eslint-disable no-alert */
/* eslint-disable no-undef */
import $ from 'jquery';
import { createHomeTemplate, createLoadingTemplate, createProfilUserTemplate } from '../templates/template-creator';
import articles from '../../../public/data/article.json';
import EcoSwapSource from '../../data/ecoswap-source';

const Home = {
  async render() {
    return `
      <div class="container-home container-xxl px-3"></div>
    `;
  },

  async afterRender() {
    const homeContainer = $('.container-home');
    homeContainer.append(createHomeTemplate(articles));
    const jumbotron = $('.jumbotron');
    const jumbotronH1 = $('.jumbotron h1');
    const jumbotronH2 = $('.jumbotron h2');
    const profilUserContainer = $('.profil-user-container');
    const signUpLink = $('.signUpLink');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    // Mendapatkan elemen yang akan di-klik
    const swapPoint = document.getElementById('swap-point');
    const historyTransaction = document.getElementById('history-transaction');
    const pickupRequest = document.getElementById('pick-up-request');

    // Memeriksa apakah token ada
    if (!token) {
      // Mengubah href masing-masing elemen <a> ke '#'
      jumbotron.addClass('py-4');
      jumbotronH1.removeClass('fs-1');
      jumbotronH1.addClass('display-4');
      jumbotronH2.removeClass('fs-3');
      jumbotronH2.addClass('display-7');
      if (swapPoint) {
        swapPoint.addEventListener('click', () => {
          swapPoint.href = './login.html';
        });
      }
      if (historyTransaction) {
        historyTransaction.addEventListener('click', () => {
          historyTransaction.href = './login.html';
        });
      }
      if (pickupRequest) {
        pickupRequest.addEventListener('click', () => {
          pickupRequest.href = './login.html';
        });
      }
    }

    if (role === 'user') {
      const userId = localStorage.getItem('userId');
      const userInfo = await EcoSwapSource.getUserInfo(userId);
      const userPoints = await EcoSwapSource.getUserPoints(userId);

      signUpLink.css('visibility', 'hidden');
      profilUserContainer.append(createLoadingTemplate());
      setTimeout(() => {
        // containerSpinner.addClass('d-none');
        profilUserContainer.append(createProfilUserTemplate(userInfo.username, userPoints || 0));
      }, 1500);
    }
  },
};

export default Home;
