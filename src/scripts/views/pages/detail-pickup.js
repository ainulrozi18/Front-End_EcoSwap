/* eslint-disable no-alert */
import $ from 'jquery';
import { createDetailPickupTemplate } from '../templates/template-creator';
import API_ENDPOINT from '../../globals/api-endpoint';

const DetailPickup = {
  async render() {
    return `
      <div class="container-detail-pickup container-xxl px-3 d-flex justify-content-center align-items-center mt-5 mb-3" style="min-height: 100vh;"></div>
    `;
  },

  async afterRender() {
    const url = window.location.hash.split('/');
    const pickupId = url[url.length - 1];
    const detailContainer = $('.container-detail-pickup');

    try {
      const response = await fetch(`${API_ENDPOINT.PICKUP_REQUEST}/${pickupId}`);
      const result = await response.json();

      if (response.status === 200 && result.status === 'success') {
        detailContainer.append(createDetailPickupTemplate(result.data));

        const submitButton = $('.btn-detail-pickup');
        const statusButton = $('.btn-status-detail-pickup');
        statusButton.css('display', 'none');

        if (result.data.status === "approved") {
          submitButton.prop('disabled', true);
          $('#typeTrash').prop('disabled', true);
          $('#weightOfTrash').prop('disabled', true);
          $('#point').prop('disabled', true);
          submitButton.text('Penjemputan sudah dikonfirmasi');
        }
  
        $('#approve-pickup-form').on('submit', async (event) => {
          event.preventDefault();

          submitButton.css('display', 'none');
          statusButton.css('display', 'block');

          const wasteType = $('#typeTrash').val().toString();
          const weight = parseFloat($('#weightOfTrash').val());
          const points = parseInt($('#point').val(), 10);

          const payload = {
            wasteType,
            weight,
            points,
          };

          try {
            const token = localStorage.getItem('token');
            const approveResponse = await fetch(`${API_ENDPOINT.PICKUP_REQUEST}/${pickupId}/approve`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(payload),
            });

            const approveResult = await approveResponse.json();

            if (approveResponse.status === 200 && approveResult.status === 'success') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Permintaan penjemputan berhasil disetujui!',
                text: `Berhasil menyetujui penjemputan atas nama ${result.data.name}`,
                showConfirmButton: false,
              });
              submitButton.css('display', 'block');
              statusButton.css('display', 'none');

              setTimeout(() => {
                window.location.href = '#/list-pickup';
              }, 1500);
            } else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Gagal menyetujui permintaan penjemputan!`,
                text: 'Terjadi kesalahan saat menyetujui penjemputan. Silakan coba lagi nanti.',
              });
              submitButton.css('display', 'block');
              statusButton.css('display', 'none');
            }
          } catch (error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: `Gagal menyetujui permintaan penjemputan!`,
              text: 'Terjadi kesalahan saat menyetujui penjemputan. Silakan coba lagi nanti.',
            });
            submitButton.css('display', 'block');
            statusButton.css('display', 'none');
          }
        });
      } else {
        detailContainer.append('<p>Gagal memuat data</p>');
      }
    } catch (error) {
      detailContainer.append('<p>Gagal mengambil data</p>');
    }
  },
};

export default DetailPickup;
