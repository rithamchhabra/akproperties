import './style.css'

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Add scroll reveal animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .glitch-separator').forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
});

// Smooth Scroll for "Discover Portfolio" and Nav Links
document.querySelectorAll('a[href^="#"], #discover-btn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href') || '#listings';
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search Logic
const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const type = document.getElementById('prop-type').value;
        const location = document.getElementById('prop-location').value;
        const price = document.getElementById('prop-price').value;

        searchBtn.innerHTML = 'Searching...';
        searchBtn.disabled = true;

        const propertyImages = {
            'Ultra-Luxury Villas': '/images/gen1.png',
            'Sky Penthouses': '/images/gen2.png',
            'Heritage Manors': '/images/master.png',
            'Farmhouses': '/images/hero_villa.png'
        };

        const resultHTML = `
            <div class="results-card">
                <img src="${propertyImages[type] || '/images/hero.png'}" alt="${type}" class="result-image">
                <div class="result-info">
                    <h3>${type} Collection</h3>
                    <p>${location}</p>
                    <span class="result-price">Starts from ${price.split(' - ')[0]}</span>
                    <div class="result-features">
                        <span>4 Beds</span>
                        <span>•</span>
                        <span>5,000 sq.ft</span>
                    </div>
                    <div class="result-actions">
                        <button class="btn-small btn-view">View Details</button>
                        <button class="btn-small btn-contact">Enquire</button>
                    </div>
                </div>
            </div>
        `;

        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.innerHTML = resultHTML;
            searchBtn.innerHTML = 'Search Estates';
            searchBtn.disabled = false;
        }
    });
}

// Newsletter Logic
const newsletterBtn = document.getElementById('newsletter-btn');
const newsletterInput = document.getElementById('newsletter-email');
const newsletterMsg = document.getElementById('newsletter-msg');

if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
        const email = newsletterInput.value;
        if (email && email.includes('@')) {
            newsletterMsg.textContent = 'Thank you for subscribing to our elite listings.';
            newsletterMsg.style.color = '#c5a059';
            newsletterMsg.style.display = 'block';
            newsletterInput.value = '';
        } else {
            newsletterMsg.textContent = 'Please enter a valid email address.';
            newsletterMsg.style.color = '#ff4d4d';
            newsletterMsg.style.display = 'block';
        }

        setTimeout(() => {
            newsletterMsg.style.display = 'none';
        }, 4000);
    });
}
