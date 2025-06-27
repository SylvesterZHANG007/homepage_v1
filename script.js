// Global variables
let currentLanguage = 'en';
let sectionHeaderManager;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeLanguageSwitcher();
    initializeMobileMenu();
    initializeScrollEffects();
    sectionHeaderManager = new SectionHeaderManager();
    styleSkillLevels();
    initializeScrollAnimations();
});

// Section Header Management
class SectionHeaderManager {
    constructor() {
        this.currentSection = '';
        this.sectionTitles = {
            en: {
                home: 'HOME',
                about: 'ABOUT', 
                education: 'EDUCATION',
                skills: 'SKILLS',
                research: 'RESEARCH',
                publications: 'PUBLICATIONS', 
                projects: 'PROJECTS',
                experience: 'EXPERIENCE',
                contact: 'CONTACT'
            },
            zh: {
                home: '首页',
                about: '关于',
                education: '教育',
                skills: '技能', 
                research: '研究',
                publications: '论文',
                projects: '项目',
                experience: '经历',
                contact: '联系'
            }
        };
        this.init();
    }

    init() {
        this.createSectionHeader();
        this.setupObserver();
    }

    createSectionHeader() {
        // Check if header already exists
        if (document.querySelector('.section-header')) return;

        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = '<div class="section-header-title"></div>';
        document.body.appendChild(header);
        this.headerElement = header;
        this.titleElement = header.querySelector('.section-header-title');
    }

    updateHeader(sectionId) {
        if (!this.headerElement || !this.titleElement) return;
        
        const title = this.sectionTitles[currentLanguage][sectionId] || sectionId.toUpperCase();
        this.titleElement.textContent = title;

        // Show header for non-home sections
        if (sectionId !== 'home') {
            this.headerElement.classList.add('show');
        } else {
            this.headerElement.classList.remove('show');
        }
    }

    updateLanguage() {
        if (this.currentSection && this.currentSection !== 'home') {
            this.updateHeader(this.currentSection);
        }
    }

    setupObserver() {
        const sections = document.querySelectorAll('section[id], .page-section, .hero-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const sectionId = entry.target.id || 'home';
                    if (sectionId !== this.currentSection) {
                        this.currentSection = sectionId;
                        this.updateHeader(sectionId);
                    }
                }
            });
        }, {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update active link based on current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === window.location.pathname.split('/').pop() || 
            (window.location.pathname === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Language switching functionality
function initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Enhanced language content
    const content = {
        en: {
            'nav-home': 'Home',
            'nav-research': 'Research',
            'nav-publications': 'Publications',
            'nav-projects': 'Projects',
            'nav-experience': 'Experience',
            'nav-contact': 'Contact',
            'welcome-title': 'Hi, I\'m Sylvester Zhang!',
            'about-title': 'About Me',
            'about-text-1': 'I am a passionate robotics researcher and engineer dedicated to advancing the field of autonomous systems and artificial intelligence. My work focuses on developing intelligent robots that can seamlessly interact with humans and navigate complex environments.',
            'about-text-2': 'With expertise spanning computer vision, machine learning, and control systems, I bridge the gap between theoretical research and practical applications. My research has been published in top-tier conferences and journals, contributing to breakthrough innovations in human-robot collaboration and autonomous navigation.',
            'education-title': 'Education',
            'skills-title': 'Skills & Expertise',
            'research-areas-title': 'Research Areas',
            'highlight-1-title': '🤖 Human-Robot Interaction',
            'highlight-1-text': 'Developing intuitive interfaces for seamless collaboration between humans and robotic systems',
            'highlight-2-title': '🧠 AI & Machine Learning',
            'highlight-2-text': 'Implementing advanced neural networks and reinforcement learning for autonomous decision-making',
            'highlight-3-title': '🔬 Research Innovation',
            'highlight-3-text': 'Contributing to cutting-edge research with publications in prestigious robotics conferences',
            // Publications page
            'page-title': 'Publications',
            'page-subtitle': 'Recent research contributions and academic publications',
            'category-all': 'All Publications',
            'category-journal': 'Journal Papers',
            'category-conference': 'Conference Papers',
            'category-workshop': 'Workshop Papers',
            'stat-publications': 'Total Publications',
            'stat-citations': 'Total Citations',
            'stat-hindex': 'h-index',
            'stat-awards': 'Best Paper Awards'
        },
        zh: {
            'nav-home': '首页',
            'nav-research': '研究',
            'nav-publications': '论文',
            'nav-projects': '项目',
            'nav-experience': '经历',
            'nav-contact': '联系',
            'welcome-title': '你好，我是张思远！',
            'about-title': '关于我',
            'about-text-1': '我是一名充满热情的机器人研究员和工程师，致力于推进自主系统和人工智能领域的发展。我的工作专注于开发能够与人类无缝交互并在复杂环境中导航的智能机器人。',
            'about-text-2': '凭借涵盖计算机视觉、机器学习和控制系统的专业知识，我在理论研究和实际应用之间架起了桥梁。我的研究已在顶级会议和期刊上发表，为人机协作和自主导航的突破性创新做出了贡献。',
            'education-title': '教育背景',
            'skills-title': '技能与专长',
            'research-areas-title': '研究领域',
            'highlight-1-title': '🤖 人机交互',
            'highlight-1-text': '开发直观界面，实现人类与机器人系统的无缝协作',
            'highlight-2-title': '🧠 人工智能与机器学习',
            'highlight-2-text': '实施先进的神经网络和强化学习技术，用于自主决策',
            'highlight-3-title': '🔬 研究创新',
            'highlight-3-text': '在顶级机器人会议上发表前沿研究，贡献突破性成果',
            // Publications page
            'page-title': '发表论文',
            'page-subtitle': '最新研究贡献和学术论文',
            'category-all': '全部论文',
            'category-journal': '期刊论文',
            'category-conference': '会议论文',
            'category-workshop': '研讨会论文',
            'stat-publications': '论文总数',
            'stat-citations': '引用总数',
            'stat-hindex': 'h指数',
            'stat-awards': '最佳论文奖'
        }
    };

    // Update content based on language
    function updateContent(lang) {
        // Update navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            const keys = ['nav-home', 'nav-research', 'nav-publications', 'nav-projects', 'nav-experience', 'nav-contact'];
            if (keys[index] && content[lang][keys[index]]) {
                link.textContent = content[lang][keys[index]];
            }
        });

        // Update main content
        const elements = {
            'welcome-title': document.querySelector('.welcome-title'),
            'about-title': document.querySelector('#about h2'),
            'education-title': document.querySelector('#education .section-title'),
            'skills-title': document.querySelector('#skills .section-title'),
            'research-areas-title': document.querySelector('.research-areas h3'),
            // Publications page elements
            'page-title': document.querySelector('.page-title'),
            'page-subtitle': document.querySelector('.page-subtitle')
        };

        Object.keys(elements).forEach(key => {
            if (elements[key] && content[lang][key]) {
                elements[key].textContent = content[lang][key];
            }
        });

        // Update about section paragraphs
        const aboutParagraphs = document.querySelectorAll('#about .intro-content p');
        if (aboutParagraphs.length >= 2) {
            aboutParagraphs[0].textContent = content[lang]['about-text-1'];
            aboutParagraphs[1].textContent = content[lang]['about-text-2'];
        }

        // Update highlight items
        const highlightTitles = document.querySelectorAll('.highlight-item h4');
        const highlightTexts = document.querySelectorAll('.highlight-item p');
        
        for (let i = 1; i <= 3; i++) {
            if (highlightTitles[i-1] && content[lang][`highlight-${i}-title`]) {
                highlightTitles[i-1].textContent = content[lang][`highlight-${i}-title`];
            }
            if (highlightTexts[i-1] && content[lang][`highlight-${i}-text`]) {
                highlightTexts[i-1].textContent = content[lang][`highlight-${i}-text`];
            }
        }

        // Update publications page category buttons
        const categoryBtns = document.querySelectorAll('.category-btn');
        if (categoryBtns.length > 0) {
            const categoryKeys = ['category-all', 'category-journal', 'category-conference', 'category-workshop'];
            categoryBtns.forEach((btn, index) => {
                if (categoryKeys[index] && content[lang][categoryKeys[index]]) {
                    btn.textContent = content[lang][categoryKeys[index]];
                }
            });
        }

        // Update publication stats
        const statTexts = document.querySelectorAll('.stat-item p');
        if (statTexts.length > 0) {
            const statKeys = ['stat-publications', 'stat-citations', 'stat-hindex', 'stat-awards'];
            statTexts.forEach((text, index) => {
                if (statKeys[index] && content[lang][statKeys[index]]) {
                    text.textContent = content[lang][statKeys[index]];
                }
            });
        }

        // Update section header if manager exists
        if (sectionHeaderManager) {
            sectionHeaderManager.updateLanguage();
        }

        // Reapply skill level styles after language change
        styleSkillLevels();
    }

    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    currentLanguage = savedLanguage;
    
    // Set initial button states
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === savedLanguage);
    });

    // Language button event listeners
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            
            // Update active state
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update content
            currentLanguage = lang;
            updateContent(lang);
            
            // Save preference
            localStorage.setItem('preferred-language', lang);
        });
    });

    // Initial content update
    setTimeout(() => {
        updateContent(savedLanguage);
    }, 100);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll effects for navbar
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Enhanced glassmorphism on scroll
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.backdropFilter = 'blur(50px) saturate(200%)';
            navbar.style.webkitBackdropFilter = 'blur(50px) saturate(200%)';
            navbar.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            navbar.style.boxShadow = `
                0 12px 40px rgba(0, 0, 0, 0.6),
                0 4px 12px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.15)`;
        } else {
            navbar.style.background = 'rgba(20, 20, 20, 0.6)';
            navbar.style.backdropFilter = 'blur(40px) saturate(180%)';
            navbar.style.webkitBackdropFilter = 'blur(40px) saturate(180%)';
            navbar.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = `
                0 8px 32px rgba(0, 0, 0, 0.4),
                0 2px 8px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)`;
        }
        
        lastScrollTop = scrollTop;
    });
}

// Apply skill level styles
function styleSkillLevels() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const text = level.textContent.toLowerCase();
        if (text.includes('expert')) {
            level.style.background = 'linear-gradient(135deg, #ff6b35, #ff8c66)';
            level.style.color = 'white';
            level.style.border = 'none';
        } else if (text.includes('advanced')) {
            level.style.background = 'rgba(255, 107, 53, 0.2)';
            level.style.color = '#ff6b35';
            level.style.border = '1px solid #ff6b35';
        } else if (text.includes('proficient')) {
            level.style.background = 'rgba(255, 107, 53, 0.1)';
            level.style.color = '#ffffff';
            level.style.border = '1px solid rgba(255, 107, 53, 0.3)';
        } else if (text.includes('familiar')) {
            level.style.background = 'rgba(161, 161, 166, 0.1)';
            level.style.color = '#a1a1a6';
            level.style.border = '1px solid rgba(161, 161, 166, 0.3)';
        }
    });
}

// Add some simple animations on scroll
function initializeScrollAnimations() {
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
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.education-item, .skill-area, .intro-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contact form functionality (if present)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Language switching
const languageToggle = document.getElementById('languageToggle');
const enBtn = document.getElementById('enBtn');
const zhBtn = document.getElementById('zhBtn');

// Add ripple effect
function addRipple(button, e) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

if (enBtn && zhBtn) {
    enBtn.addEventListener('click', (e) => {
        if (currentLanguage !== 'en') {
            addRipple(enBtn, e);
            switchLanguage('en');
        }
    });

    zhBtn.addEventListener('click', (e) => {
        if (currentLanguage !== 'zh') {
            addRipple(zhBtn, e);
            switchLanguage('zh');
        }
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update button states
    if (enBtn && zhBtn) {
        enBtn.classList.toggle('active', lang === 'en');
        zhBtn.classList.toggle('active', lang === 'zh');
    }
    
    // Update all elements with data-lang attributes
    document.querySelectorAll('[data-lang]').forEach(element => {
        element.style.display = element.getAttribute('data-lang') === lang ? 'block' : 'none';
    });
    
    // Update section header language
    sectionHeaderManager.updateLanguage();
}

// Mobile navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('show');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize language
switchLanguage('en'); 