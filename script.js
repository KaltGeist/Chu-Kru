// Mobile Menu Toggle
const mobileMenu = document.getElementById("mobile-menu")
const navLinks = document.querySelector(".nav-links")

if (mobileMenu) {
  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    mobileMenu.classList.toggle("active")
  })
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
    if (mobileMenu) {
      mobileMenu.classList.remove("active")
    }
  })
})

// --- Lógica del Modal de Video (Solo para YouTube) ---

// 1. Seleccionamos los elementos del DOM
const videoModal = document.getElementById("videoModal");
const closeModal = document.getElementById("closeModal");
const youtubePlayer = document.getElementById("youtubePlayer");
const youtubeClipCards = document.querySelectorAll(".clip-card-new"); // Usamos el nombre de tu clase

// 2. Lógica para abrir el modal al hacer clic en una tarjeta
if (youtubeClipCards.length > 0) {
  youtubeClipCards.forEach((card) => {
    card.addEventListener("click", () => {
      const videoSrc = card.getAttribute("data-video");
      
      try {
        // Extraemos el ID del video de la URL de forma segura
        const url = new URL(videoSrc);
        const videoId = url.searchParams.get("v");

        if (!videoId) {
          console.error("URL de YouTube inválida: no se encontró el ID del video.");
          return; // Detiene la ejecución si la URL no es válida
        }

        // Construimos la URL de "embed" correcta y optimizada
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
        
        // Asignamos la URL al iframe
        youtubePlayer.src = embedUrl;

        // Abrimos el modal y "congelamos" el fondo
        videoModal.classList.add("active");
        document.body.classList.add("modal-open");
        
      } catch (error) {
        console.error("Error al procesar la URL de YouTube:", error);
      }
    });
  });
}

// 3. Función única para cerrar el modal
function closeModalFunction() {
  videoModal.classList.remove("active");
  document.body.classList.remove("modal-open");

  // Detenemos la reproducción del video del iframe para liberar recursos
  youtubePlayer.src = "";
}

// 4. Asignamos la función de cierre a los botones
if (closeModal) {
  closeModal.addEventListener("click", closeModalFunction);
}

if (videoModal) {
  videoModal.querySelector(".modal-overlay").addEventListener("click", closeModalFunction);
}

// Contact Form Submission
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    console.log("Form submitted:", { name, email, subject, message })

    // Show success message
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.")

    // Reset form
    contactForm.reset()
  })
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to navbar
let lastScroll = 0
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll <= 0) {
    navbar.style.boxShadow = "none"
  } else {
    navbar.style.boxShadow = "0 2px 20px rgba(236, 0, 140, 0.3)"
  }

  lastScroll = currentScroll
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".team-card, .creator-card, .player-card, .clip-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen")

  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 2000)
})

const playerCards = document.querySelectorAll(".player-card-horizontal")

playerCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    // Add digital glitch effect
    const imageContainer = card.querySelector(".player-image-container")
    imageContainer.style.animation = "digital-glitch 0.3s ease-in-out"

    setTimeout(() => {
      imageContainer.style.animation = ""
    }, 300)
  })
})

const style = document.createElement("style")
style.textContent = `
  @keyframes digital-glitch {
    0%, 100% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-5px);
    }
    40% {
      transform: translateX(5px);
    }
    60% {
      transform: translateX(-3px);
    }
    80% {
      transform: translateX(3px);
    }
  }
`
document.head.appendChild(style)
