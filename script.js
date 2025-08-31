// Navbar Active Link
const navLinks = document.querySelectorAll(".navlink");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Contact Form Submit
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("input[name='name']").value;
    const email = form.querySelector("input[name='email']").value;
    const message = form.querySelector("textarea[name='message']").value;

    if (name && email && message) {
      alert(`धन्यवाद ${name}! आपका संदेश सफलतापूर्वक भेजा गया ✅`);
      form.reset();
    } else {
      alert("कृपया सभी फ़ील्ड भरें ❌");
    }
  });
}

// Project Hover Animation
const projects = document.querySelectorAll(".project");

projects.forEach(project => {
  project.addEventListener("mouseenter", () => {
    project.style.transform = "scale(1.03)";
    project.style.transition = "0.3s ease";
  });
  project.addEventListener("mouseleave", () => {
    project.style.transform = "scale(1)";
  });
});
