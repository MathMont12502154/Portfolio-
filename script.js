
const typingElement = document.getElementById("typing");
const typingText = "DESENVOLVEDOR EM FORMAÇÃO";
let typingIndex = 0;

function typeText() {
    if (typingIndex < typingText.length) {
        typingElement.textContent += typingText.charAt(typingIndex);
        typingIndex++;
        setTimeout(typeText, 70);
    }
}

typeText();


if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 700,
        once: true,
        offset: 80
    });
}


const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


const themeBtn = document.getElementById("themeBtn");

function updateThemeButton() {
    themeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀" : "☾";
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

updateThemeButton();

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateThemeButton();
});


const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalTags = document.getElementById("modalTags");

const projects = {
    sushi: {
        title: "LANDING PAGE SUSHI",
        text: "Projeto de interface criado a partir de um protótipo no Figma. O objetivo foi praticar estruturação de páginas, organização visual e desenvolvimento com HTML e CSS.",
        tags: ["HTML", "CSS", "FIGMA"]
    },
    portfolio: {
        title: "PORTFÓLIO DIGITAL",
        text: "Meu portfólio pessoal, desenvolvido para apresentar minha formação, habilidades, projetos e formas de contato. Também utiliza JavaScript para interações.",
        tags: ["HTML", "CSS", "JAVASCRIPT"]
    },
    escolar: {
        title: "PROJETO ESCOLAR",
        text: "Projeto realizado durante a formação técnica, envolvendo pesquisa, organização das informações, desenvolvimento e apresentação em equipe.",
        tags: ["TECNOLOGIA", "EQUIPE"]
    }
};

document.querySelectorAll(".project-btn").forEach(button => {
    button.addEventListener("click", () => {
        const project = projects[button.dataset.project];

        modalTitle.textContent = project.title;
        modalText.textContent = project.text;

        modalTags.innerHTML = "";
        project.tags.forEach(tag => {
            const span = document.createElement("span");
            span.textContent = tag;
            modalTags.appendChild(span);
        });

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    });
});

function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});


const telefone = document.getElementById("telefone");

telefone.addEventListener("input", event => {
    let value = event.target.value.replace(/\D/g, "");

    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    } else {
        value = value.replace(/^(\d*)/, "($1");
    }

    event.target.value = value;
});

// 7. FORMULÁRIO
const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

form.addEventListener("submit", async event => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const telefoneValue = telefone.value.replace(/\D/g, "");

    if (!nome || !email || !mensagem || telefoneValue.length < 10) {
        showToast("Preencha todos os campos corretamente.");
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : "";

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "ENVIANDO...";
    }

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            showToast("Mensagem enviada com sucesso!");
            form.reset();
        } else {
            showToast("Não foi possível enviar. Tente novamente.");
        }
    } catch (error) {
        showToast("Erro de conexão. Tente novamente.");
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }
});
