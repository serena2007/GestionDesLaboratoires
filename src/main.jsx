import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Simple animation for contact form submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Merci pour votre message ! Nous vous contacterons sous peu.");
    this.reset();
});

/* ===================== GESTION DES COMPTES ===================== */
let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

const accountList = document.getElementById("accountList");
const accountSection = document.getElementById("accountSection");

function renderAccounts() {
    accountList.innerHTML = "";
    accounts.forEach((acc, i) => {
        const div = document.createElement("div");
        div.className = "account";
        div.innerHTML = `
            <img src="${acc.avatar}">
            <div class="account-info">
                <strong>${acc.name}</strong><br>
                <small>${acc.email}</small>
            </div>
        `;
        div.onclick = () => login(i);
        accountList.appendChild(div);
    });
}

function login(Connexion) {
    alert("Bienvenue " + accounts[index].name);
    accountSection.style.display = "none";
}

document.getElementById("addAccountBtn").onclick = () => {
    const name = prompt("Nom complet");
    const email = prompt("Email");
    if (!name || !email) return;

    accounts.push({
        name,
        email,
        avatar: "https://via.placeholder.com/80/a259ff/ffffff?text=" + name[0]
    });

    localStorage.setItem("accounts", JSON.stringify(accounts));
    renderAccounts();
};

renderAccounts();