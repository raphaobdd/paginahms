// Menu Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animação do hamburger
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header fixo com sombra ao rolar
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animação ao rolar para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação a elementos
const animateElements = document.querySelectorAll('.tech-card, .solution-card, .stat-card, .diff-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    // Por exemplo, usando fetch() para enviar para um backend
    
    // Simulação de envio
    const formData = new FormData(contactForm);
    
    // Exibir mensagem de sucesso
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Limpar formulário
    contactForm.reset();
    
    // Em produção, você substituiria isso por:
    /*
    fetch('/api/contact', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Mensagem enviada com sucesso!');
        contactForm.reset();
    })
    .catch(error => {
        alert('Erro ao enviar mensagem. Tente novamente.');
    });
    */
});

// Contador animado para estatísticas
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16); // 60 FPS
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
};

// Observer para estatísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.textContent);
            entry.target.classList.add('counted');
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

// Aplicar aos números das estatísticas
document.querySelectorAll('.stat-card h3').forEach(stat => {
    statsObserver.observe(stat);
});

// Adicionar classe active ao link do menu baseado na seção visível
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNav);

// Prevenção de comportamento padrão em links vazios
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Loading animation ao carregar a página
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('DaRNATech website loaded successfully! 🧬🌱');