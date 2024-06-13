/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import API_ENDPOINT from '../globals/api-endpoint';

class EcoSwapSource {
  static async registerUser() {
    document.getElementById('registrationForm').addEventListener('submit', async (event) => {
      event.preventDefault();

      const firstName = document.getElementById('firstName').value.toString();
      const lastName = document.getElementById('lastName').value.toString();
      const email = document.getElementById('email').value.toString();
      const password = document.getElementById('password').value.toString();
      const passwordConfirmation = document.getElementById('passwordConfirmation').value.toString();

      if (password !== passwordConfirmation) {
        alert('Password dan Konfirmasi Password tidak cocok.');
        return;
      }

      const data = {
        username: `${firstName} ${lastName}`,
        email,
        password,
      };

      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        const response = await fetch(API_ENDPOINT.REGISTER, options);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error dari server:', errorData);
          throw new Error('Gagal registrasi, silakan coba lagi.');
        }

        const responseData = await response.json();
        alert('Registrasi berhasil! Silakan login.');
        window.location.href = './login.html';
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat registrasi. Silakan coba lagi nanti.');
      }
    });
  }

  static async loginUser() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value.toString();
      const password = document.getElementById('password').value.toString();

      const data = {
        email,
        password,
      };

      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        const response = await fetch(API_ENDPOINT.LOGIN_USER, options);

        if (!response.ok) {
          const errorData = await response.json();
          // throw new Error(errorData.message || 'Gagal melakukan login. Silakan coba lagi.');
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${errorData.message}`,
            text: 'Please try again later.',
            timer: 1500,
          });
        }

        const responseData = await response.json();
        const { token } = responseData.data;
        const { userId } = responseData.data;
        // Simpan token di local storage atau sebagai cookie
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Berhasil login!',
          text: 'Selamat datang kembali di EcoSwap',
          showConfirmationButton: false,
        });

        // Redirect ke halaman selanjutnya (misalnya dashboard)
        setTimeout(() => {
          window.location.href = './index.html';
        }, 1500);
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    });
  }

  static async loginAdmin() {
    const loginForm = document.getElementById('loginFormAdmin');

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value.toString();
      const password = document.getElementById('password').value.toString();

      const data = {
        email,
        password,
      };

      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        const response = await fetch(API_ENDPOINT.LOGIN_ADMIN, options);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || 'Gagal login');
        }

        // Simpan token ke local storage
        localStorage.setItem('token', responseData.data.token);

        // Redirect ke halaman admin setelah login berhasil
        window.location.href = '/#/home-admin';
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    });
  }

  static async logout() {
    console.log('jalan');
    const loginLink = document.querySelector('.login-link');
    const logoutLink = document.querySelector('.logout-link');

    // Cek apakah token tersimpan
    const token = localStorage.getItem('token');
    if (token) {
      // Jika ada token, tampilkan link logout dan sembunyikan link login
      loginLink.style.display = 'none';
      logoutLink.style.display = 'block';
    } else {
      loginLink.style.display = 'block';
      logoutLink.style.display = 'none';
    }

    // Event listener untuk logout
    logoutLink.addEventListener('click', async () => {
      try {
        // Lakukan request logout
        const options = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(API_ENDPOINT.LOGOUT, options);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gagal logout');
        }

        // Hapus token dari local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        // Redirect ke halaman login atau halaman lain
        window.location.href = './login.html'; // Misalnya halaman login
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    });
  }

  static async pickUpRequest(data) {
    try {
      const token = localStorage.getItem('token'); // Asumsikan token disimpan di local storage
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(API_ENDPOINT.PICKUP_REQUEST, options);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error dari server:', errorData);
        throw new Error('Gagal mengajukan permintaan penjemputan. Silakan coba lagi.');
      }

      const responseData = await response.json();
      alert('Permintaan penjemputan berhasil diajukan!');

      // Opsional, alihkan halaman atau kosongkan form
      // window.location.href = './somepage.html';
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengajukan permintaan penjemputan. Silakan coba lagi nanti.');
    }
  }

  static async getPickupsByUserId(userId) {
    try {
      const token = localStorage.getItem('token'); // Asumsikan token disimpan di local storage
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`${API_ENDPOINT.HISTORY_TRANSACTION}/${userId}`, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengambil data penjemputan.');
      }

      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export default EcoSwapSource;
