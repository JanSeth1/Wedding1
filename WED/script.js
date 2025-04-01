document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: "smooth"
                });
            }
        });
    });

    // Active link functionality
    const menuLinks = document.querySelectorAll(".nav-menu li a");
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        const nav = document.querySelector('nav');
        
        // Add or remove bottom border based on scroll position
        if (scrollPosition < 50) {
            nav.classList.add('top-page');
        } else {
            nav.classList.remove('top-page');
        }
        
        // Remove active class from all links
        menuLinks.forEach(link => link.classList.remove("active"));
        
        // If at the top of the page, only highlight the home link
        if (scrollPosition < 100) {
            const homeLink = document.querySelector('.nav-menu li a[href="#home"]');
            if (homeLink) homeLink.classList.add("active");
            return;
        }
        
        // Otherwise, highlight the appropriate section link
        menuLinks.forEach(link => {
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const sectionTop = targetElement.offsetTop - 150;
                const sectionBottom = sectionTop + targetElement.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    link.classList.add("active");
                }
            }
        });
    }
    
    // Run on page load
    updateActiveLink();
    
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (menuToggle && navMenu) {
        // Toggle menu when clicking the hamburger icon
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking the overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }
        
        // Close menu when clicking a nav link
        const mobileNavLinks = document.querySelectorAll('.nav-menu a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll(".fade-in, .slide-up");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // RSVP button interaction
    const rsvpButton = document.querySelector(".rsvp-button");
    if (rsvpButton) {
        rsvpButton.addEventListener("click", function () {
            document.getElementById("rsvp").scrollIntoView({ behavior: "smooth" });
        });
    }

    // RSVP form submission
    const rsvpForm = document.querySelector("#rsvp-form");
    if (rsvpForm) {
        rsvpForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thank you for your RSVP! We look forward to celebrating with you.");
        });
    }

    // View map functionality
    const mapButton = document.querySelector(".map-button");
    if (mapButton) {
        mapButton.addEventListener("click", function () {
            window.open("https://maps.google.com?q=Rosewood+Garden,California", "_blank");
        });
    }

    const heroImage = document.querySelector('.hero-image');
    const heroSection = document.querySelector('.hero');

    // Navbar scroll behavior
    const nav = document.querySelector('nav');
    const scrollThreshold = 50;
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update active link on scroll
        updateActiveLink();
        
        // Add scrolled class when page is scrolled
        if (currentScroll > scrollThreshold) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            // Scrolling down - hide navbar
            nav.classList.add('hidden');
        } else {
            // Scrolling up - show navbar
            nav.classList.remove('hidden');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("image-lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const lightboxClose = document.querySelector(".lightbox-close");
    const lightboxPrev = document.querySelector(".lightbox-prev");
    const lightboxNext = document.querySelector(".lightbox-next");
    const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

    let currentIndex = 0; // To keep track of the current image index
    const images = Array.from(lightboxTriggers).map(trigger => trigger.getAttribute("href"));

    lightboxTriggers.forEach((trigger, index) => {
        trigger.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior
            currentIndex = index; // Set the current index
            lightboxImage.src = images[currentIndex]; // Set the lightbox image source
            lightbox.classList.add("active"); // Show the lightbox
        });
    });

    lightboxClose.addEventListener("click", function () {
        lightbox.classList.remove("active"); // Hide the lightbox
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.classList.remove("active"); // Hide the lightbox
        }
    });

    // Next button functionality
    lightboxNext.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent the lightbox from closing
        currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image
        lightboxImage.src = images[currentIndex]; // Update the image source
    });

    // Previous button functionality
    lightboxPrev.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent the lightbox from closing
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop back to the last image
        lightboxImage.src = images[currentIndex]; // Update the image source
    });
});