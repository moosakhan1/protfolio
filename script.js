// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
  
    // Theme Toggle
    const themeToggleBtn = document.getElementById("theme-toggle-btn")
    const body = document.body
  
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      body.classList.add("dark")
    }
  
    // Theme toggle functionality
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark")
      // Save theme preference
      localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light")
    })
  
    // Mobile Navigation
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    hamburger.addEventListener("click", () => {
      // Create mobile menu
      if (!document.querySelector(".mobile-nav")) {
        const mobileNav = document.createElement("div")
        mobileNav.classList.add("mobile-nav")
  
        const mobileNavLinks = navLinks.cloneNode(true)
        mobileNav.appendChild(mobileNavLinks)
  
        document.body.appendChild(mobileNav)
  
        // Add styles for mobile nav
        mobileNav.style.position = "fixed"
        mobileNav.style.top = "70px"
        mobileNav.style.left = "0"
        mobileNav.style.width = "100%"
        mobileNav.style.backgroundColor = "var(--background)"
        mobileNav.style.padding = "1rem"
        mobileNav.style.boxShadow = "var(--shadow)"
        mobileNav.style.zIndex = "999"
  
        mobileNavLinks.style.display = "flex"
        mobileNavLinks.style.flexDirection = "column"
        mobileNavLinks.style.gap = "1rem"
  
        // Animate mobile menu with GSAP
        gsap.fromTo(mobileNav, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
  
        // Close mobile menu when clicking a link
        const links = mobileNav.querySelectorAll("a")
        links.forEach((link) => {
          link.addEventListener("click", () => {
            gsap.to(mobileNav, {
              opacity: 0,
              y: -20,
              duration: 0.3,
              ease: "power2.in",
              onComplete: () => document.body.removeChild(mobileNav),
            })
          })
        })
      } else {
        const mobileNav = document.querySelector(".mobile-nav")
        gsap.to(mobileNav, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => document.body.removeChild(mobileNav),
        })
      }
    })
  
    // Project Filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")
  
        const filter = this.getAttribute("data-filter")
  
        // GSAP animation for filtering
        gsap.to(projectCards, {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.2,
          onComplete: () => {
            projectCards.forEach((card) => {
              if (filter === "all") {
                card.style.display = "block"
              } else if (card.getAttribute("data-category") === filter) {
                card.style.display = "block"
              } else {
                card.style.display = "none"
              }
            })
  
            gsap.to(projectCards, {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.3,
              delay: 0.1,
            })
          },
        })
      })
    })
  
    // Smooth scrolling for navigation links
    const navLinksAll = document.querySelectorAll('a[href^="#"]')
  
    navLinksAll.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.offsetTop - headerHeight
  
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetPosition,
              autoKill: false,
            },
            ease: "power2.inOut",
          })
        }
      })
    })
  
    // Form validation and submission
    const contactForm = document.getElementById("contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Basic form validation
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        if (!name || !email || !subject || !message) {
          alert("Please fill in all fields")
          return
        }
  
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          alert("Please enter a valid email address")
          return
        }
  
        // Form submission simulation
        const submitBtn = contactForm.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent
  
        submitBtn.disabled = true
        submitBtn.textContent = "Sending..."
  
        // Simulate form submission with timeout
        setTimeout(() => {
          alert("Thank you for your message! I will get back to you soon.")
          contactForm.reset()
          submitBtn.disabled = false
          submitBtn.textContent = originalText
        }, 1500)
      })
    }
  
    // GSAP Animations
  
    // Split text into characters for animation
    const animateText = document.querySelector(".animate-text")
    if (animateText) {
      const text = animateText.textContent
      animateText.innerHTML = ""
  
      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        const span = document.createElement("span")
        span.className = "char"
        span.textContent = char === " " ? "\u00A0" : char
        animateText.appendChild(span)
      }
    }
  
    // Hero section animations
    function initHeroAnimations() {
      const tl = gsap.timeline()
  
      // Animate hero background
      tl.to(
        ".hero::before",
        {
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        0,
      )
  
      // Animate hero text characters
      tl.to(
        ".animate-text .char",
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        0.2,
      )
  
      // Animate hero content
      tl.fromTo(".hero-content h2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.7)
  
      tl.fromTo(".hero-content p", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.9)
  
      tl.fromTo(".cta-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 1.1)
  
      tl.fromTo(".social-links", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 1.3)
  
      // Animate hero image
      tl.fromTo(
        ".hero-image",
        { opacity: 1, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
        0.5,
      )
    }
  
    // Scroll animations
    function initScrollAnimations() {
      // Reveal animations for sections
      gsap.utils.toArray(".gsap-reveal").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 50, opacity: 0, visibility: "visible" },
          {
            y: 0,
            opacity: 1,
            visibility: "visible",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      })
  
      // Staggered reveal animations
      gsap.utils.toArray(".stagger-reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0, visibility: "visible" },
          {
            y: 0,
            opacity: 1,
            visibility: "visible",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        )
      })
  
      // Animate skill bars
      gsap.utils.toArray(".skill-level").forEach((bar) => {
        const width = bar.style.width
        bar.style.width = 0
  
        gsap.to(bar, {
          width: width,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
      })
    }
  
    // Initialize animations
    initHeroAnimations()
    initScrollAnimations()
  
    // Navbar scroll effect
    const header = document.querySelector("header")
  
    gsap.to(header, {
      scrollTrigger: {
        trigger: document.body,
        start: "top -80px",
        end: "top -80px",
        onEnter: () => {
          gsap.to(header, {
            backgroundColor: "rgba(var(--background-rgb), 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "var(--shadow)",
            duration: 0.3,
          })
        },
        onLeaveBack: () => {
          gsap.to(header, {
            backgroundColor: "var(--background)",
            backdropFilter: "blur(0px)",
            boxShadow: "none",
            duration: 0.3,
          })
        },
      },
    })
  
    // Image loading optimization
    const profileImages = document.querySelectorAll(".hero-image img, .about-image img")
    profileImages.forEach((img) => {
      // Add loading animation
      img.style.transition = "opacity 0.5s ease"
    //   img.style.opacity = "0"
  
      img.onload = () => {
        // Fade in image when loaded
        img.style.opacity = "1"
      }
  
      img.onerror = () => {
        // If image fails to load, replace with placeholder
        img.src = "/placeholder.svg?height=400&width=400"
        img.style.opacity = "1"
      }
    })
  })
  
  