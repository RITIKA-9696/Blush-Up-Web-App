document.getElementById('userForm').addEventListener('submit', async function(event) {
  event.preventDefault();  // Prevent the default form submission

  const user = {
      name: document.getElementById('name').value,
      mobileNumber: document.getElementById('mobile-number').value,
      email: document.getElementById('email').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
  };

  try {
      const response = await saveUser(user);
      console.log('User saved successfully:', response);
      // Display a success message
      alert('User saved successfully');
  } catch (error) {
      console.error('Failed to save user:', error);
      // Display an error message
      alert('Failed to save user. Please try again.');
  }
});

async function saveUser(user) {
  const url = 'http://localhost:8080/saveUser';

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error saving user information:', error);
      throw error;  // Rethrow the error after logging it
  }
}
