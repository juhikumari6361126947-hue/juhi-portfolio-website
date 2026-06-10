/* ========================================
   TYPING ANIMATION
   ======================================== */

class TypeWriter {
    constructor(element, words, speed = 100, delayBetweenWords = 1500) {
        this.element = element;
        this.words = words;
        this.speed = speed;
        this.delayBetweenWords = delayBetweenWords;
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.currentCharIndex === currentWord.length) {
            typeSpeed = this.delayBetweenWords;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        new TypeWriter(typingElement, ['Juhi Kumari', 'a Developer', 'a Learner'], 150, 2000);
    }
});

/* ========================================
   MOBILE MENU TOGGLE
   ======================================== */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* ========================================
   ACTIVE NAVBAR HIGHLIGHTING
   ======================================== */

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

/* ========================================
   SCROLL TO TOP BUTTON
   ======================================== */

const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to top on button click
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ========================================
   SCROLL REVEAL ANIMATION
   ======================================== */

const revealElements = () => {
    const reveals = document.querySelectorAll(
        '.about-card, .skill-card, .project-card, .cert-card, .about-text'
    );

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
};

// Initial check
revealElements();

// Check on scroll
window.addEventListener('scroll', revealElements);

/* ========================================
   FORM VALIDATION & SUBMISSION
   ======================================== */

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successPopup = document.getElementById('successPopup');

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a single form field
 * @param {HTMLElement} field - The input field to validate
 * @param {string} type - The type of validation ('name', 'email', 'message')
 * @returns {boolean} - True if valid, false otherwise
 */
function validateField(field, type) {
    const errorElement = document.getElementById(`${type}Error`);
    const formGroup = field.parentElement;

    let isValid = true;
    let errorMessage = '';

    if (type === 'name') {
        if (field.value.trim().length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
    } else if (type === 'email') {
        if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (type === 'message') {
        if (field.value.trim().length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
    }

    if (isValid) {
        formGroup.classList.remove('error');
        errorElement.textContent = '';
    } else {
        formGroup.classList.add('error');
        errorElement.textContent = errorMessage;
    }

    return isValid;
}

// Real-time validation
nameInput.addEventListener('blur', () => validateField(nameInput, 'name'));
emailInput.addEventListener('blur', () => validateField(emailInput, 'email'));
messageInput.addEventListener('blur', () => validateField(messageInput, 'message'));

// Clear error on input
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length >= 2) {
        nameInput.parentElement.classList.remove('error');
        document.getElementById('nameError').textContent = '';
    }
});

emailInput.addEventListener('input', () => {
    if (emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.remove('error');
        document.getElementById('emailError').textContent = '';
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length >= 10) {
        messageInput.parentElement.classList.remove('error');
        document.getElementById('messageError').textContent = '';
    }
});

/**
 * Shows success popup message
 */
function showSuccessPopup() {
    successPopup.classList.add('show');
    
    // Hide popup after 3 seconds
    setTimeout(() => {
        successPopup.classList.remove('show');
    }, 3000);
}

/**
 * Sends form data to Google Sheets (alternative: send to email service)
 * For this implementation, we'll show a success message without actual backend
 * In production, you would use a service like Formspree, EmailJS, or Google Forms
 */
function submitForm(event) {
    event.preventDefault();

    // Validate all fields
    const isNameValid = validateField(nameInput, 'name');
    const isEmailValid = validateField(emailInput, 'email');
    const isMessageValid = validateField(messageInput, 'message');

    if (isNameValid && isEmailValid && isMessageValid) {
        // Collect form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            timestamp: new Date().toLocaleString()
        };

        // Option 1: Save to localStorage (for demo purposes)
        const savedMessages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
        savedMessages.push(formData);
        localStorage.setItem('portfolioMessages', JSON.stringify(savedMessages));

        // Option 2: Send to a backend service (uncomment and configure as needed)
        // sendToBackend(formData);

        // Show success message
        // Try sending to Google Sheets (if configured)
        sendToGoogleSheets(formData).finally(() => {
            showSuccessPopup();
        });

        // Reset form
        contactForm.reset();

        // Clear error states
        nameInput.parentElement.classList.remove('error');
        emailInput.parentElement.classList.remove('error');
        messageInput.parentElement.classList.remove('error');
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('messageError').textContent = '';

        console.log('Form submitted successfully:', formData);
    }
}

/**
 * Example function to send data to a backend service
 * Uncomment and modify based on your backend setup
 */
function sendToBackend(formData) {
    // Example using fetch API to send to a backend endpoint
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
}

/* ========================================
   GOOGLE SHEETS (Apps Script) INTEGRATION
   ======================================== */
// To enable: deploy a Google Apps Script Web App that writes POSTed JSON to a Sheet,
// then paste the web app URL below into `GAS_WEB_APP_URL`.
// See README steps added by this script for setup instructions.
const GAS_WEB_APP_URL = ''; // e.g. 'https://script.google.com/macros/s/XXXX/exec'

/**
 * Send form data to Google Sheets via Apps Script Web App
 * @param {{name:string,email:string,message:string,timestamp:string}} formData
 * @returns {Promise<Response|void>}
 */
function sendToGoogleSheets(formData) {
    if (!GAS_WEB_APP_URL) {
        // No endpoint configured — skip sending
        return Promise.resolve();
    }

    return fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json().catch(() => ({}));
    })
    .catch(err => console.warn('Google Sheets submit failed:', err));
}

// Form submission
contactForm.addEventListener('submit', submitForm);

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Smooth scroll to element
 * @param {string} sectionId - The ID of the section to scroll to
 */
function smoothScrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Add animation delay to elements
 * @param {NodeList} elements - The elements to add delay to
 * @param {number} delayStep - The delay between each element
 */
function addAnimationDelay(elements, delayStep = 0.1) {
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * delayStep}s`;
    });
}

/* ========================================
   INITIALIZATION
   ======================================== */

// Initialize page on load
window.addEventListener('load', () => {
    // Add animation delays to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    addAnimationDelay(skillCards, 0.1);

    // Add animation delays to project cards
    const projectCards = document.querySelectorAll('.project-card');
    addAnimationDelay(projectCards, 0.15);

    // Add animation delays to certification cards
    const certCards = document.querySelectorAll('.cert-card');
    addAnimationDelay(certCards, 0.12);

    // Update active nav link on load
    updateActiveNavLink();
});

/* ========================================
   CONSOLE WELCOME MESSAGE
   ======================================== */

console.log(
    '%cWelcome to Juhi Kumari\'s Portfolio!',
    'color: #0066cc; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cBuilt with HTML, CSS, and JavaScript',
    'color: #00a3e0; font-size: 14px;'
);
