
import './App.css'
import Header from './components/Header'
function App() {
 

  return (
    <>
      <Header />
    </>
  )
}

export default App


// Exemple de comptes stockés localement (dans une vraie app, ces données viennent du serveur)
let accounts = JSON.parse(localStorage.getItem('accounts')) || [
  {
    name: "Aurèle Dorian",
    email: "aureledorian@gmail.com",
    avatar: "https://via.placeholder.com/80/7a1fff/ffffff?text=A"
  },
  {
    name: "Aurèle Njeuha",
    email: "aurelenj@gmail.com",
    avatar: "https://via.placeholder.com/80/7a1fff/ffffff?text=N"
  }
];

// Afficher les comptes dans la liste
function renderAccounts() {
  const container = document.getElementById("accountList");
  container.innerHTML = "";
  accounts.forEach((acc, index) => {
    const div = document.createElement("div");
    div.classList.add("account");
    div.innerHTML = `
      <img src="${acc.avatar}" alt="avatar">
      <div class="account-info">
        <h3>${acc.name}</h3>
        <p>${acc.email}</p>
      </div>
      <span class="arrow">›</span>
    `;
    div.onclick = () => selectAccount(index);
    container.appendChild(div);
  });
}

// Sélection d’un compte (simulation de connexion)
function selectAccount(index) {
  const acc = accounts[index];
  alert(`Bienvenue ${acc.name} !`);
  // Ici tu pourrais rediriger vers la page d'accueil
  // window.location.href = "dashboard.html";
}

// Ajouter un nouveau compte
document.getElementById("addAccountBtn").addEventListener("click", () => {
  const name = prompt("Nom complet :");
  const email = prompt("Adresse email :");
  if (name && email) {
    const newAcc = {
      name,
      email,
      avatar: "https://via.placeholder.com/80/7a1fff/ffffff?text=" + name.charAt(0)
    };
    accounts.push(newAcc);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    renderAccounts();
  }
});

renderAccounts();