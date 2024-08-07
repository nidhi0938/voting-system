document.getElementById('userIcon').addEventListener('click', function() {
    document.getElementById('userOptions').classList.toggle('active');
});

// Close the user options when clicked outside of it
document.addEventListener('click', function(event) {
    console.log("Ali")
    const userOptions = document.getElementById('userOptions');
    if (event.target !== userOptions && !userOptions.contains(event.target)) {
        userOptions.classList.remove('active');
    }
});


document.getElementById('logoutLink').addEventListener('click', function() {
    // Remove the cookie named 'your_cookie_name'
    document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Optionally, redirect to another page after removing the cookie
    window.location.href = '/login'; // Redirect to the login page or any other page
});
