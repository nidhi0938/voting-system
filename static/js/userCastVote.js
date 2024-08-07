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

function castVote() {
    const election = document.getElementById('validationCustom01').value;
    const candidate = document.getElementById('validationCustom02').value;

    // Check if all variables are blank
    if (
        !election &&
        !candidate
    ) {
        console.log('All fields are blank. Form submission cancelled.');
        return; // Don't proceed with form submission
    }

    // Handle form submission
    const form = document.querySelector('.box-data form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        fetch(`/castVote/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (response.ok) {
              console.log('Election Candidate Added successful');
              location.reload();

              // Handle successful update for second request if needed
          } else {
              console.error('Failed to Election Candidate ');
              throw new Error('Failed to Election Candidate');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          // Handle error for the second request if needed
      });
        // Make a PUT request to the edit API endpoint
    });
}