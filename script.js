document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // --- Magic Line Logic  ---
    const nav = document.querySelector('.nav-links');
    let magicLine = document.querySelector('.magic-line');
    
    if (!magicLine && window.innerWidth > 900) {
        magicLine = document.createElement('div');
        magicLine.classList.add('magic-line');
        nav.appendChild(magicLine);
    }

    function moveLine(target) {
        if (!target || window.innerWidth <= 900) return;
        const linkRect = target.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        magicLine.style.width = `${linkRect.width}px`;
        magicLine.style.left = `${linkRect.left - navRect.left}px`;
        magicLine.style.opacity = '1';
    }

    const activeLink = document.querySelector('.nav-links a.active');
    if (activeLink) setTimeout(() => moveLine(activeLink), 50);

    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        link.addEventListener('mouseenter', (e) => moveLine(e.target));
    });

    nav.addEventListener('mouseleave', () => {
        if (activeLink) moveLine(activeLink);
        else magicLine.style.opacity = '0';
    });
});

// --- EMAIL SENDING LOGIC ---
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name.length < 2) {
        alert("Please enter a valid name.");
        return false;
    }

    if (!email.includes('@')) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (message.length < 3) {
        alert("Message is too short.");
        return false;
    }

    // THE EMAIL GOES
    const myEmail = "tibatesla@gmail.com"; 
    
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    // Open the user's Email App with everything filled in
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;

    return false; // Prevents the page from reloading
}