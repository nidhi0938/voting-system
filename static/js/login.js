// The login function to handle form submission
function login() {
  const userName = document.querySelector('.login-form .username').value;
  const password = document.querySelector('.login-form .Password').value;
  console.log(userName, password);

  // Check if all variables are blank
  if (userName === '' || password === '') {
    alert('All fields are required.');
    return false;
  }

  // Handle form submission
  const formData = {
    UserName: userName,
    Password: password
  };

  fetch(`/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (response.ok) {
        console.log('Login Attempt successful');
        return response.json(); // Parse the response body as JSON
      } else {
        console.error('Failed to login');
        throw new Error('Failed to login');
      }
    })
    .then(data => {
      // Check userType from the response
      if (data.isAdmin) {
        window.location = '/admin/dashboard'; // Redirect for admin
      } else {
        window.location = '/user/dashboard'; // Redirect for regular user
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle login error
    });
}

// Attach an event listener to the form submission
document.querySelector('.login-form form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission
  login(); // Call the login function when the form is submitted
});
