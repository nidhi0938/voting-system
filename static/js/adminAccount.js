window.addEventListener('error', function(event) {
  console.log('error');
  const errorData = {
      message: event.message,
      filename: event.filename,
      lineNumber: event.lineno,
      columnNumber: event.colno,
      error: event.error ? event.error.stack : null
  };
console.log(errorData)
  // Send the errorData to your server (via an API endpoint)
  fetch('/log/error', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },

      body: JSON.stringify(errorData)
  }).then(response => {
      // Handle response if needed
  }).catch(error => {
      console.error('Error sending error data:', error);
  });
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  function editAccount(id) {
    const firstName = document.getElementById('validationCustom01').value;
    const lastName = document.getElementById('validationCustom02').value;
    const dob = document.getElementById('validationCustom03').value;
    const username = document.getElementById('validationCustomUsername').value;
    const password = document.getElementById('validationCustom04').value;
    const email = document.getElementById('validationCustom05').value;
    const presentAddress = document.getElementById('validationCustom06').value;
    const cnic = document.getElementById('validationCustom07').value;
    const phoneNumber = document.getElementById('validationCustom08').value;

    // Check if all variables are blank
    if (
        !firstName &&
        !lastName &&
        !dob &&
        !username &&
        !password &&
        !email &&
        !presentAddress &&
        !cnic &&
        !phoneNumber
    ) {
        console.log('All fields are blank. Form submission cancelled.');
        return; // Don't proceed with form submission
    }

    // Handle form submission
    const form = document.querySelector('.formContainer form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        fetch(`/users/edit/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (response.ok) {
              console.log('User updated successful');
              // Handle successful update for second request if needed
          } else {
              console.error('Failed to update user cerdentails ');
              throw new Error('Failed to update user cerdentails');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          // Handle error for the second request if needed
      });
        // Make a PUT request to the edit API endpoint
        fetch(`/userDetails/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // Handle successful update (if needed)
                console.log('Candidate updated successfully');
            } else {
                // Handle unsuccessful update (if needed)
                console.error('Failed to update the election');
                throw new Error('Failed to update the election');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw new Error(error);
        });
    });
}



function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
