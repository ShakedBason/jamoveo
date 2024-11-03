
import Swal from 'sweetalert2';

export const validateRegistration = (username, password, instrument) => {
  if (!username.trim() || !password.trim() || !instrument.trim()) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please fill in all fields - without spaces',
    });
    return false; 
  }

  if (password.trim().length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Password should contain at least 6 characters without spaces',
    });
    return false; 
  }

  return true; 
};
