// FAQ Toggle Functionality
        document.querySelectorAll('.faq-button').forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('.faq-icon');
                
                // Close all other FAQs
                document.querySelectorAll('.faq-content').forEach(item => {
                    if (item !== content) {
                        item.classList.add('hidden');
                        item.classList.remove('animate-fadeIn');
                    }
                });
                document.querySelectorAll('.faq-icon').forEach(item => {
                    if (item !== icon) {
                        item.classList.remove('rotate-180');
                    }
                });
                
                // Toggle current FAQ
                content.classList.toggle('hidden');
                content.classList.toggle('animate-fadeIn');
                icon.classList.toggle('rotate-180');
            });
        });

        // Form Submission
        document.getElementById('contactForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = e.target.querySelector('button[type="submit"]');
            const submitText = document.getElementById('submitText');
            const formMessage = document.getElementById('formMessage');
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitText.textContent = 'Submitting...';
            formMessage.classList.add('hidden');
            
            // Get form data
            const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                message: e.target.message.value,
                timestamp: new Date().toISOString()
            };
            
            try {
                // Replace with your Cloudflare Worker URL
                const response = await fetch('YOUR_CLOUDFLARE_WORKER_URL', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    // Success
                    formMessage.textContent = '✓ Form submitted successfully! We will contact you soon.';
                    formMessage.className = 'text-center text-sm font-medium text-green-600';
                    formMessage.classList.remove('hidden');
                    e.target.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                // Error
                formMessage.textContent = '✗ Submission failed. Please try again or contact us directly.';
                formMessage.className = 'text-center text-sm font-medium text-red-600';
                formMessage.classList.remove('hidden');
                console.error('Form submission error:', error);
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitText.textContent = 'Submit';
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });


  const header = document.getElementById("site-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.remove("bg-transparent");
      header.classList.add("bg-white", "shadow-md");
    } else {
      header.classList.remove("bg-white", "shadow-md");
      header.classList.add("bg-transparent");
    }
  });        