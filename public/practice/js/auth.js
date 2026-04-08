function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    // Admin credentials
    if (password === "admin123") {
      window.location.href = "/admin";
      return true;
    }

    // Attendant credentials
    else if (password === "park2026") {
      window.location.href = "/attendant";
      return true;
    }

        // Admin credentials
    if (password === "manager26") {
      window.location.href = "/manager";
      return true;
    }

    // Invalid login
    else {
      errorMsg.textContent = "Invalid username or password!";
      return false;
    }
  }