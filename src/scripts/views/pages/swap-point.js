/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import API_ENDPOINT from '../../globals/api-endpoint';
import { createSwapPointTemplate } from '../templates/template-creator';
// import { renderRestaurantCards } from '../../components/card-list';

const SwapPoint = {
  async render() {
    return `
      <div class='container-swap-point container-xxl px-3 d-flex justify-content-center align-items-center' style="height: 100vh">
      </div>
      `;
  },

  async afterRender() {
    const pickUpContainer = $('.container-swap-point');
    pickUpContainer.append(createSwapPointTemplate());

    const submitButton = $('.btn-swap-point');
    const statusButton = $('.btn-status-swap-point');

    statusButton.css('display', 'none');
    const withdrawalRequestForm = document.getElementById('withdrawalRequestForm');
    withdrawalRequestForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      submitButton.css('display', 'none');
      statusButton.css('display', 'block');

      const name = document.getElementById('name').value.toString();
      const email = document.getElementById('email').value.toString();
      const phone = document.getElementById('phone').value.toString();
      const ewallet = document.getElementById('ewallet').value.toString();
      const amount = parseInt(document.getElementById('amount').value, 10);

      const data = {
        name,
        email,
        phone,
        ewallet,
        amount,
      };

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_ENDPOINT.WITHDRAWALS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Gagal melakukan penarikan!',
            text: 'Point kamu belum cukup. Nominal penarikan minimal adalah 25.000 point',
          });
          submitButton.css('display', 'block');
          statusButton.css('display', 'none');
          return;
        }

        const responseData = await response.json();
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Permintaan penarikan berhasil diajukan!',
          text: 'Harap menunggu hingga admin menyetujui penarikanmu!',
        });
        submitButton.css('display', 'block');
        statusButton.css('display', 'none');

        withdrawalRequestForm.reset();
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${error.message}`,
          text: 'Terjadi kesalahan saat mengajukan permintaan penarikan. Silakan coba lagi nanti.',
        });
        submitButton.css('display', 'block');
        statusButton.css('display', 'none');
      }
    });
  },
};

export default SwapPoint;
