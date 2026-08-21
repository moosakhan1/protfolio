document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

  const body = document.body
  const header = document.querySelector("header")
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const menuToggle = document.getElementById("menu-toggle")
  const navLinks = document.getElementById("nav-links")
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    body.classList.add("dark")
  }

  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark")
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light")
  })

  function setMenuOpen(isOpen) {
    navLinks.classList.toggle("open", isOpen)
    menuToggle.classList.toggle("is-open", isOpen)
    menuToggle.setAttribute("aria-expanded", String(isOpen))
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu")
  }

  menuToggle.addEventListener("click", () => {
    setMenuOpen(!navLinks.classList.contains("open"))
  })

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false))
  })

  const onScrollHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 12)
  }
  onScrollHeader()
  window.addEventListener("scroll", onScrollHeader, { passive: true })

  const sectionIds = ["home", "about", "skills", "projects", "contact"]
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]')

  function updateActiveNav() {
    const offset = header.offsetHeight + 80
    let current = "home"
    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section && section.getBoundingClientRect().top <= offset) {
        current = id
      }
    })
    navAnchors.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current)
    })
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true })
  updateActiveNav()

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)
      if (!targetElement) {
        return
      }
      e.preventDefault()
      const targetPosition = targetElement.offsetTop - header.offsetHeight
      gsap.to(window, {
        duration: 0.85,
        scrollTo: { y: targetPosition, autoKill: false },
        ease: "power2.inOut",
      })
    })
  })

  function openGmail(e) {
    e.preventDefault()
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=moosakhan033233@gmail.com",
      "_blank",
      "noopener,noreferrer",
    )
  }

  const contactEmail = document.getElementById("contact-email")
  const heroEmail = document.getElementById("hero-email")
  if (contactEmail) {
    contactEmail.addEventListener("click", openGmail)
  }
  if (heroEmail) {
    heroEmail.addEventListener("click", openGmail)
  }

  const contactForm = document.getElementById("contact-form")
  const formStatus = document.getElementById("form-status")
  const CONTACT_INBOX = "moosakhan033233@gmail.com"
  const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const NAME_PATTERN = /^[\p{L}\s.'-]{2,80}$/u

  function setFormStatus(message, type) {
    if (!formStatus) {
      return
    }
    formStatus.textContent = message
    formStatus.classList.remove("success", "error")
    if (type) {
      formStatus.classList.add(type)
    }
  }

  function sanitizeField(value, maxLength) {
    return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, maxLength)
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const honeypot = contactForm.querySelector('input[name="_honey"]')
      if (honeypot && honeypot.value) {
        setFormStatus("Thank you for your message! I will get back to you soon.", "success")
        contactForm.reset()
        return
      }

      const name = sanitizeField(document.getElementById("name").value, 80)
      const email = sanitizeField(document.getElementById("email").value, 254)
      const subject = sanitizeField(document.getElementById("subject").value, 120)
      const message = sanitizeField(document.getElementById("message").value, 2000)

      if (!name || !email || !subject || !message) {
        setFormStatus("Please fill in all fields.", "error")
        return
      }
      if (!NAME_PATTERN.test(name)) {
        setFormStatus("Please enter a valid name.", "error")
        return
      }
      if (!EMAIL_PATTERN.test(email)) {
        setFormStatus("Please enter a valid email address.", "error")
        return
      }
      if (subject.length < 3) {
        setFormStatus("Subject must be at least 3 characters.", "error")
        return
      }
      if (message.length < 10) {
        setFormStatus("Message must be at least 10 characters.", "error")
        return
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.disabled = true
      submitBtn.textContent = "Sending..."
      setFormStatus("Sending your message...", "")

      try {
        const response = await fetch("https://formsubmit.co/ajax/" + CONTACT_INBOX, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            _replyto: email,
            _subject: subject,
            message,
            _template: "table",
            _captcha: "false",
          }),
        })
        const result = await response.json().catch(() => ({}))
        if (!response.ok || result.success === "false" || result.success === false) {
          throw new Error("Form service rejected the request")
        }
        contactForm.reset()
        setFormStatus("Thank you! Your message has been sent.", "success")
      } catch (error) {
        setFormStatus("Could not send right now. Please email moosakhan033233@gmail.com directly.", "error")
      } finally {
        submitBtn.disabled = false
        submitBtn.textContent = originalText
      }
    })
  }

  function wrapChars(element) {
    const nodes = Array.from(element.childNodes)
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment()
        Array.from(node.textContent).forEach((ch) => {
          const span = document.createElement("span")
          span.className = "char"
          span.textContent = ch === " " ? "\u00A0" : ch
          frag.appendChild(span)
        })
        element.replaceChild(frag, node)
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        wrapChars(node)
      }
    })
  }

  const animateText = document.querySelector(".animate-text")
  if (animateText) {
    wrapChars(animateText)
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (!reduceMotion) {
    const tl = gsap.timeline()
    tl.fromTo(
      ".animate-text .char",
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.025, duration: 0.45, ease: "power2.out" },
      0.1,
    )
    tl.fromTo(".hero-content .eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
    tl.fromTo(".hero-content h2", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.35)
    tl.fromTo(".hero-lead", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.45)
    tl.fromTo(".cta-buttons", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.55)
    tl.fromTo(".hero-content .social-links", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.65)
    tl.fromTo(".hero-image", { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 0.2)

    gsap.utils.toArray(".gsap-reveal").forEach((section) => {
      gsap.fromTo(
        section,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    gsap.utils.toArray(".stagger-reveal").forEach((item) => {
      gsap.fromTo(
        item,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    gsap.utils.toArray(".skill-level").forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0"
      gsap.to(bar, {
        width: width,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      })
    })
  }

  document.querySelectorAll(".hero-image img, .about-image img").forEach((img) => {
    img.addEventListener("error", () => {
      img.alt = "Moosa Khan"
    })
  })
})
