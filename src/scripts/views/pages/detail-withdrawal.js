/* eslint-disable no-alert */
import $ from 'jquery';
import { createDetailWithdrawalTemplate } from '../templates/template-creator';
import API_ENDPOINT from '../../globals/api-endpoint';

const DetailWithdrawal = {
  async render() {
    return `
      <div class="container-detail-withdrawal container-xxl px-3 d-flex justify-content-center align-items-center mt-5 mb-3" style="min-height: 100vh;"></div>
    `;
  },

  async afterRender() {
    const url = window.location.hash.split('/');
    const withdrawalId = url[url.length - 1];
    const detailContainer = $('.container-detail-withdrawal');

    try {
      const response = await fetch(`${API_ENDPOINT.WITHDRAWALS}/${withdrawalId}`);
      const result = await response.json();

      if (response.status === 200 && result.status === 'success') {
        detailContainer.append(createDetailWithdrawalTemplate(result.data));

        const submitButton = $('.btn-withdrawal');
        const statusButton = $('.btn-status-withdrawal');
        statusButton.css('display', 'none');

        if (result.data.status === "approved") { 
          submitButton.prop('disabled', true);
          submitButton.text('Penarikan sudah dikonfirmasi');
        }

        $('#approve-withdrawal-form').on('submit', async (event) => {
          event.preventDefault();

          submitButton.css('display', 'none');
          statusButton.css('display', 'block');

          try {
            const token = localStorage.getItem('token');
            const approveResponse = await fetch(`${API_ENDPOINT.WITHDRAWALS}/${withdrawalId}/approve`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const approveResult = await approveResponse.json();

            if (approveResponse.status === 200 && approveResult.status === 'success') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Permintaan penarikan berhasil disetujui!',
                text: `Berhasil menyetujui penarikan atas nama ${result.data.name} sebesar ${result.data.amount} point`,
                showConfirmButton: false,
              });
              submitButton.css('display', 'block');
              statusButton.css('display', 'none');

              setTimeout(() => {
                window.location.href = '#/list-withdrawal';
              }, 1500);
            } else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Gagal menyetujui permintaan penarikan!`,
                text: 'Terjadi kesalahan saat menyetujui penarikan. Silakan coba lagi nanti.',
              });
              submitButton.css('display', 'block');
              statusButton.css('display', 'none');
            }
          } catch (error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: `Gagal menyetujui permintaan penarikan!`,
              text: 'Terjadi kesalahan saat menyetujui penarikan. Silakan coba lagi nanti.',
            });
            submitButton.css('display', 'block');
            statusButton.css('display', 'none');
          }
        });
      } else {
        detailContainer.append('<p>Gagal memuat data</p>');
      }
    } catch (error) {
      detailContainer.append('<p>Error fetching data</p>');
    }
  },
};

export default DetailWithdrawal;
