const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;

  const data = {
    username,
    email,
    phone,
    password,
  };

  // Replace 'http://your-api-url/api/endpoint' with your actual Express API endpoint
  fetch('http://34.105.1.56:3001/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      // Handle successful response from the API (e.g., display success message)
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors during request or API response (e.g., display error message)
    });
});
