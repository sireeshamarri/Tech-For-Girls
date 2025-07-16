// Get references to DOM elements
const shareBtn = document.getElementById('shareBtn');
const counter = document.getElementById('counter');
const form = document.getElementById('registrationForm');
const messageBox = document.getElementById('messageBox');
const submitBtn = document.getElementById('submitBtn');

// Retrieve share count and submission flag from localStorage
let shareCount = parseInt(localStorage.getItem('shareCount')) || 0;
const maxShares = 5;
const submitted = localStorage.getItem('submitted') === 'true';

// Initialize UI state
updateCounter();

if(submitted){
  disableForm();
  messageBox.innerText = "🎉 You have already submitted. Thank you!";
}

// WhatsApp Share button click handler
shareBtn.addEventListener('click', () => {
  if (shareCount >= maxShares) return;

  const whatsappMessage = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  window.open(whatsappUrl, '_blank');

  shareCount++;
  localStorage.setItem('shareCount', shareCount);
  updateCounter();

  if (shareCount === maxShares) {
    messageBox.innerText = "Sharing complete. Please continue.";
  }
});

// Update the counter display
function updateCounter() {
  counter.innerText = `Click count: ${shareCount}/${maxShares}`;
  counter.style.color = shareCount === maxShares ? 'green' : '#333';
}

// Disable all inputs and buttons on the form
function disableForm() {
  form.querySelectorAll('input, button').forEach(el => el.disabled = true);
  submitBtn.classList.add('disabled');
}

// Form submission handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareCount < maxShares) {
    alert(`Please share on WhatsApp ${maxShares} times before submitting.`);
    return;
  }

  // Prepare form data for submission
  const formData = new FormData(form);

  // Replace with your Google Apps Script Web App URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbx3B_5T2b3NfuRsQ_G1rZJroD2Nz0wqrsWYu8EagBuUQ2sbw36W6QIgKR5FJasRyHAq/exec';

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      messageBox.innerText = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
      disableForm();
      localStorage.setItem('submitted', 'true');
    } else {
      alert('Submission failed. Please try again later.');
    }
  } catch (error) {
    alert('Error submitting form: ' + error.message);
  }
});
