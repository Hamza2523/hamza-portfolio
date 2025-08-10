document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar-item');
    const sections = document.querySelectorAll('.page-section');
    const mainContent = document.getElementById('main-content');
    const menuToggle = document.getElementById('menu-toggle');
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    let homeAnimationsInitialized = false;

    function runHomeAnimations() {
        if (homeAnimationsInitialized) return;
        homeAnimationsInitialized = true;

        const welcomeText = "Welcome to Hamza's Portfolio...";
        const welcomeElement = document.getElementById('welcome-text');
        const nameElement = document.getElementById('main-name');
        const rolesElement = document.getElementById('roles');
        const quoteElement = document.getElementById('quote');
        
        if(welcomeElement) welcomeElement.innerHTML = '';
        if(rolesElement) rolesElement.innerHTML = '';

        let i = 0;
        function typeWelcome() {
            if (welcomeElement && i < welcomeText.length) {
                welcomeElement.innerHTML = welcomeText.substring(0, i + 1) + '<span class="typing-cursor"></span>';
                i++;
                setTimeout(typeWelcome, 100);
            } else if (welcomeElement) {
                 welcomeElement.innerHTML = welcomeText;
            }
        }
        
        if (nameElement) {
            nameElement.style.animation = 'none';
            nameElement.offsetHeight; /* trigger reflow */
            nameElement.style.animation = 'fadeIn 1s forwards 1s';
        }

        if (quoteElement) {
            quoteElement.style.animation = 'none';
            quoteElement.offsetHeight; /* trigger reflow */
            quoteElement.style.animation = 'fadeIn 1s forwards 3.5s';
        }

        const roles = ["Game Dev", "Android Dev", "Web Dev"];
        let roleIndex = 0;
        
        function typeRoles() {
            if (rolesElement && roleIndex < roles.length) {
                const roleSpan = document.createElement('span');
                roleSpan.className = 'dev-role';
                
                if (roleIndex > 0) {
                   const separator = document.createElement('span');
                   separator.className = 'dev-role';
                   separator.textContent = ' | ';
                   separator.style.animationDelay = `${1.5 + roleIndex * 0.5}s`;
                   rolesElement.appendChild(separator);
                }
                
                roleSpan.textContent = roles[roleIndex];
                roleSpan.style.animationDelay = `${1.5 + roleIndex * 0.5}s`;
                rolesElement.appendChild(roleSpan);
                
                roleIndex++;
                setTimeout(typeRoles, 500);
            }
        }

        setTimeout(typeWelcome, 500);
        setTimeout(typeRoles, 1500);
    }

    // --- Scrollspy for active link highlighting ---
    mainContent.addEventListener('scroll', () => {
        let current = 'home'; // Default to home
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (mainContent.scrollTop >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
    });

    // Close sidebar when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                sidebar.classList.add('-translate-x-full');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-times');
            }
        });
    });


    // --- Swiper Carousel Initialization ---
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });

    // --- Project Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalContentContainer = document.getElementById('modal-content-container');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

    function openModal(project) {
        const modalSource = document.getElementById(`modal-${project}`);
        if (modalSource) {
            modalContentContainer.innerHTML = modalSource.innerHTML;
            modal.classList.remove('hidden');
            modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        }
    }

    function closeModal() {
        modal.classList.add('hidden');
        modalContentContainer.innerHTML = '';
    }

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const project = this.closest('.project-card').getAttribute('data-project');
            openModal(project);
        });
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Run animations for home page on load
    runHomeAnimations();
});
