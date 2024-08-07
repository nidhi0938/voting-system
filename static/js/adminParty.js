window.addEventListener('error', function (event) {
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


document.querySelector("#btnAddNewParty").addEventListener("click", function () {
    resetForm(); // Reset form fields before showing the popup
    document.querySelector(".popup").classList.add("active");
});
function resetForm() {
    const form = document.querySelector('.popup form');
    if (form) {
        form.reset(); // Use the built-in reset method of the form element
    }
}
document.querySelector(".popup .close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active")
    window.location.reload(); // Reloads the current page

});

function deleteParty(id) {
    // Confirm deletion (optional)
    console.log(id);
    const confirmation = confirm("Are you sure you want to delete this party?");
    if (confirmation) {
        // Make a DELETE request to the API endpoint to delete the election
        fetch(`/party/delete/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // Remove the corresponding row from the table
                    const rowToRemove = document.getElementById(`partyRow_${id}`);
                    if (rowToRemove) {
                        rowToRemove.remove();

                    }
                } else {
                    // Handle unsuccessful deletion (optional)
                    console.error('Failed to delete the Party');
                    throw new error('Failed to delete the Party');

                }

            })
            .catch(error => {
                console.error('Error:', error);
                throw new error(error);
            });
    }
}

    function editElection(id, name, sign) {

        // Set the form fields with the provided data
        document.getElementById('validationCustom01').value = name || '';
        document.getElementById('validationCustom02').value = sign || '';

        // Set the popup to edit mode
        const popup = document.querySelector(".popup");
        popup.setAttribute("data-mode", "edit");
        popup.classList.add("active");

        // Handle form submission
        const form = document.querySelector('.popup form');
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get form data
            const formData = new FormData(form);
            const data = {};
            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }
            console.log('data', data)
            // Make a PUT request to the edit API endpoint
            fetch(`/party/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        // Handle successful update (if needed)
                        console.log('Party updated successfully');
                    } else {
                        // Handle unsuccessful update (if needed)
                        console.error('Failed to update the election');
                        throw new error('Failed to update the election');

                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    throw new error(error);
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
