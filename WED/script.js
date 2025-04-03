document.addEventListener("DOMContentLoaded", function () {
    // Handle page transitions for all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    let isTransitioning = false;

    function handleNavClick(e) {
        e.preventDefault();
        if (isTransitioning) return;
        
        const targetHref = this.getAttribute('href');
        if (targetHref.startsWith('#')) {
            // For same-page navigation, just scroll
            const targetElement = document.querySelector(targetHref);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }
        
        // Set transition state and preserve hover effects
        isTransitioning = true;
        document.body.style.pointerEvents = 'auto';
        
        // Add a small delay before transition to ensure hover effects work
        setTimeout(() => {
            document.body.classList.add('page-transition');
            
            setTimeout(() => {
                window.location.href = targetHref;
            }, 400);
        }, 50);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Reset transition state when page loads
    window.addEventListener('pageshow', function() {
        isTransitioning = false;
        document.body.classList.remove('page-transition');
    });

    // Handle page transition for entourage link
    const entourageLink = document.querySelector('.registry-button');
    if (entourageLink) {
        entourageLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetHref = this.getAttribute('href');
            document.body.classList.add('page-transition');
            
            setTimeout(() => {
                window.location.href = targetHref;
            }, 600);
        });
    }


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
    const elementsToAnimate = document.querySelectorAll('.hero, .section, .save-date, .detail-column, .dress-code');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Remove class when out of view
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(element => {
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

    const sections = document.querySelectorAll('.section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target); // Stop observing after it becomes visible
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                heroObserver.unobserve(entry.target); // Stop observing after it becomes visible
            }
        });
    }, { threshold: 0.1 });

    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    const textElements = document.querySelectorAll('.fade-in');

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Remove class when out of view
            }
        });
    }, { threshold: 0.1 });

    textElements.forEach(element => {
        textObserver.observe(element);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Handle page transitions for all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    let isTransitioning = false;

    function handleNavClick(e) {
        e.preventDefault();
        if (isTransitioning) return;
        
        const targetHref = this.getAttribute('href');
        if (targetHref.startsWith('#')) {
            // For same-page navigation, just scroll
            const targetElement = document.querySelector(targetHref);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }
        
        // Set transition state and preserve hover effects
        isTransitioning = true;
        document.body.style.pointerEvents = 'auto';
        
        // Add a small delay before transition to ensure hover effects work
        setTimeout(() => {
            document.body.classList.add('page-transition');
            
            setTimeout(() => {
                window.location.href = targetHref;
            }, 400);
        }, 50);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Reset transition state when page loads
    window.addEventListener('pageshow', function() {
        isTransitioning = false;
        document.body.classList.remove('page-transition');
    });

    // Handle page transition for entourage link
    const entourageLink = document.querySelector('.registry-button');
    if (entourageLink) {
        entourageLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetHref = this.getAttribute('href');
            document.body.classList.add('page-transition');
            
            setTimeout(() => {
                window.location.href = targetHref;
            }, 600);
        });
    }

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

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after it becomes visible
            }
        });
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});

function adjustHeroImageWidth() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.width = window.innerWidth + 'px';
    }
}

// Adjust the hero image width on page load and window resize
window.addEventListener('load', adjustHeroImageWidth);
window.addEventListener('resize', adjustHeroImageWidth);