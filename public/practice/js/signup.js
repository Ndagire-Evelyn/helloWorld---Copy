document.getElementById('signupForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const role = document.getElementById('role').value;
      if (!role) {
        alert('Please select a role.');
        return;
      }
      // Show success animation
      const overlay = document.getElementById('successOverlay');
      overlay.classList.add('active');
      // Redirect after short delay
      setTimeout(() => {
        if (role === 'admin') {
          window.location.href = '/admin';
        } else if (role === 'manager') {
          window.location.href = '/manager';
        } else if (role === 'attendant') {
          window.location.href = '/attendant';
        }
      }, 1500); // 1.5s delay for animation
    });