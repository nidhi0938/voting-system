function verifyUser(userId) {
    fetch(`/userDetails/verify/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('User verified successfully');
            // Optionally, you can update the UI to reflect the verification status
            location.reload();
        } else {
            console.error('Failed to verify user');
            throw new Error('Failed to verify user');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error scenario if needed
    });
}
