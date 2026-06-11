/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 500,
    delay: 50,
    //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 100 });
sr.reveal('.home__social-icon', { interval: 50 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 50 }); 

/*==================== MODAL ====================*/
const modal = document.getElementById('work-modal');
const modalClose = document.getElementById('work-modal-close');

const modalImg = document.getElementById('work-modal-img');
const modalTitle = document.getElementById('work-modal-title');
const modalDescription = document.getElementById('work-modal-description');
const modalDetails = document.getElementById('work-modal-details');
const modalBtn = document.getElementById('work-modal-btn');

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active-modal');
    });
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active-modal');
    }
});

/*==================== CONTACT FORM SUBMISSION ====================*/
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
        
        contactStatus.textContent = 'Sending...';
        contactStatus.style.color = '#333';

        try {
            // Assuming the backend is running on localhost:3000
            // In production, you would change this URL to your deployed backend URL
            const response = await fetch('http://localhost:3000/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                contactStatus.textContent = 'Message sent successfully!';
                contactStatus.style.color = 'green';
                contactForm.reset();
            } else {
                contactStatus.textContent = 'Failed to send message. Please try again.';
                contactStatus.style.color = 'red';
            }
        } catch (error) {
            console.error('Error sending message:', error);
            contactStatus.textContent = 'An error occurred. Make sure the backend server is running.';
            contactStatus.style.color = 'red';
        }
    });
}
