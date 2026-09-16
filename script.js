// Handle form submission with FormSubmit
async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('.submit-btn');
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const eventType = form.querySelector('select[name="eventType"]').value;
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (!name || !email || !phone || !eventType || message.length < 10) {
        status.textContent = 'Please complete all fields with valid details before sending.';
        status.className = 'form-status error';
        return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending...';
    status.textContent = 'Sending your inquiry...';
    status.className = 'form-status sending';

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        });
        let result = null;
        let responseText = '';
        const contentType = response.headers.get('content-type') || '';
        try {
            if (contentType.includes('application/json')) {
                result = await response.json();
            } else {
                responseText = await response.text();
            }
        } catch (parseError) {
            result = null;
        }

        if (response.ok) {
            form.reset();
            const successMessage = result && result.message
                ? `✅ ${result.message}`
                : '✅ Inquiry sent successfully. We will contact you soon.';
            status.textContent = successMessage;
            status.className = 'form-status success';
            showNotification('✅ Inquiry sent successfully. Thank you!', 'success');
            return;
        }

        const serverMessage = (result && result.message) || responseText || 'Form submission failed';
        throw new Error(serverMessage);
    } catch (error) {
        console.error('Error sending inquiry:', error);
        status.textContent = `❌ ${error.message || 'Could not send inquiry. Please try again or call us directly.'}`;
        status.className = 'form-status error';
        showNotification('❌ Could not send inquiry. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;
    }
}

// Show notification message
function showNotification(message, type) {
    const rootStyles = getComputedStyle(document.documentElement);
    const successBg = rootStyles.getPropertyValue('--accent-gold').trim() || '#D9B98A';
    const successText = rootStyles.getPropertyValue('--dark-red').trim() || '#611517';
    const errorBg = rootStyles.getPropertyValue('--primary-red').trim() || '#9E3031';
    const lightText = rootStyles.getPropertyValue('--white').trim() || '#FFFDF9';

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        background-color: ${type === 'success' ? successBg : errorBg};
        color: ${type === 'success' ? successText : lightText};
        font-size: 15px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('style[data-notification-anim]')) {
        style.setAttribute('data-notification-anim', 'true');
        document.head.appendChild(style);
    }
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') {
            return;
        }
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll-to-contact buttons
document.querySelectorAll('.scroll-to-contact').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for elements
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }

        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.event-card, .service-item, .package-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Gallery image fallback handling
function setupGalleryFallbacks() {
    const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%239E3031'/%3E%3Cstop offset='1' stop-color='%23611517'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='800' fill='url(%23g)'/%3E%3Ctext x='50%25' y='48%25' text-anchor='middle' fill='%23FFFDF9' font-family='Georgia,serif' font-size='54'%3EYotode Events%3C/text%3E%3Ctext x='50%25' y='58%25' text-anchor='middle' fill='%23F8E4C3' font-family='Georgia,serif' font-size='30'%3EEthiopian Celebration Gallery%3C/text%3E%3C/svg%3E";
    document.querySelectorAll('.gallery-image').forEach((img) => {
        img.addEventListener('error', () => {
            img.src = fallbackImage;
        }, { once: true });
    });
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        observeElements();
        setupGalleryFallbacks();
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleSubmit);
        }
    });
} else {
    observeElements();
    setupGalleryFallbacks();
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
}
