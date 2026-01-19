document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));


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
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    function toggleMenu() {
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMenu);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Smooth Scrolling for Anchor Links (Optional specific control)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Chatbot Functional Logic
    const chatToggle = document.getElementById('chatToggle');
    const closeChat = document.getElementById('closeChat');
    const chatPopup = document.getElementById('chatPopup');
    const chatBody = document.getElementById('chatBody');

    if (chatToggle && chatPopup) {
        let hasOpened = false;

        chatToggle.addEventListener('click', () => {
            chatPopup.classList.toggle('active');
            if (chatPopup.classList.contains('active') && !hasOpened) {
                // Determine greeting based on time of day
                const hour = new Date().getHours();
                let greeting = "Hello! 👋";

                if (hour < 12) greeting = "Good morning! ☀️";
                else if (hour < 18) greeting = "Good afternoon! 🌤️";
                else greeting = "Good evening! 🌙";

                // Simulate typing delay
                setTimeout(() => {
                    addMessage("bot", `${greeting} I'm your AI Assistant. How can I help you automate your business today?`);
                    hasOpened = true;
                }, 500);
            }
        });

        if (closeChat) {
            closeChat.addEventListener('click', () => {
                chatPopup.classList.remove('active');
            });
        }

        // Optional: Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!chatPopup.contains(e.target) && !chatToggle.contains(e.target)) {
                chatPopup.classList.remove('active');
            }
        });
    }

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto scroll
    }

    // Blog Engagement Logic
    const reactionBtn = document.getElementById('reactionBtn');
    if (reactionBtn) {
        const pageId = window.location.pathname; // Unique key per page
        const countDisplay = document.getElementById('reactCount');
        const storageKey = 'reaction_' + pageId;
        const clickedKey = 'reacted_' + pageId;

        // Initialize Count (Smart Mock: Starts at 20-30 if new)
        let count = parseInt(localStorage.getItem(storageKey));
        if (isNaN(count)) {
            count = 20 + Math.floor(Math.random() * 12); // Initial social proof
            localStorage.setItem(storageKey, count);
        }

        // Check if user already reacted
        if (localStorage.getItem(clickedKey)) {
            reactionBtn.classList.add('reacted');
        }

        countDisplay.textContent = count;

        // Create Click Counter Logic (Medium Claps Style)
        window.toggleReaction = function () {
            // Always increment
            count++;

            // Visual Feedback
            reactionBtn.classList.add('reacted');

            // Store total user clicks (cumulative)
            localStorage.setItem(storageKey, count);

            // Animate Number
            countDisplay.style.transform = 'scale(1.5)';
            setTimeout(() => countDisplay.style.transform = 'scale(1)', 150);

            // Pop animation for Icon
            const icon = reactionBtn.querySelector('.react-icon');
            icon.style.transform = 'scale(1.4) rotate(-10deg)';
            setTimeout(() => icon.style.transform = 'scale(1) rotate(0deg)', 200);

            countDisplay.textContent = count;
        };

        // Setup Share Links
        const linkedinBtn = document.getElementById('shareLinkedin');
        const whatsappBtn = document.getElementById('shareWhatsapp');

        if (linkedinBtn) {
            linkedinBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentUrl = encodeURIComponent(window.location.href);
                const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
                window.open(shareUrl, '_blank', 'width=600,height=600');
            });
        }

        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentUrl = encodeURIComponent(window.location.href);
                const currentTitle = encodeURIComponent(document.title);
                const shareUrl = `https://api.whatsapp.com/send?text=${currentTitle}%20${currentUrl}`;
                window.open(shareUrl, '_blank');
            });
        }
    }

});
