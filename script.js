let tousLesLivres = [];
let books = [];

fetch("livres.json")
    .then(response => response.json())
    .then(data => {

        tousLesLivres = data;
        books = [...data];

        afficherLivres(data);

        creerFiltresAnnees();

        
        updateAdminList();

    });


bookForm.addEventListener("submit", e => {

    e.preventDefault();

    const book = {

    id: document.getElementById("bookId").value || Date.now(),

    titre: document.getElementById("titre").value,
    auteur: document.getElementById("auteur").value,
    annee: parseInt(document.getElementById("année").value),

    dateLecture: document.getElementById("dateLecture").value,
    support: document.getElementById("support").value,

    statut: document.getElementById("statut").value,

    image: document.getElementById("image").value,

    note: parseInt(document.getElementById("rating").value),

    avis: document.getElementById("avis").value,

    resume: document.getElementById("resume").value
};

    const index = books.findIndex(
        b => b.id == book.id
    );

    if(index >= 0){
        books[index] = book;
    }else{
        books.push(book);
    }

    
    afficherLivres(books);
    updateAdminList();
    const saveBtn =
    document.getElementById("saveBtn");

if(saveBtn){
    saveBtn.textContent =
        "➕ Ajouter un livre";
}

document.getElementById("bookForm").reset();

document.getElementById("bookId").value = "";

});

function etoiles(note) {

    return "★".repeat(note) + "☆".repeat(5 - note);

}

function creerFiltresAnnees() {

    const nav = document.getElementById("filtres");

    nav.innerHTML = "";

    const btnToutes = document.createElement("button");

    btnToutes.dataset.annee = "toutes";
    btnToutes.innerHTML = "Toutes<br>(" + tousLesLivres.length + ")";

    nav.appendChild(btnToutes);

    const annees = [...new Set(
        tousLesLivres.map(livre => livre.annee)
    )].sort((a,b) => b-a);

const nbALire =
tousLesLivres.filter(
    l => l.statut === "alire"
).length;

const btnALire = document.createElement("button");

btnALire.dataset.annee = "alire";

btnALire.innerHTML = `À Lire<br>(${nbALire})`;

nav.appendChild(btnALire);
    annees.forEach(annee => {

        const nbLivres = tousLesLivres.filter(
            livre => livre.annee === annee
        ).length;

        const btn = document.createElement("button");

        btn.dataset.annee = annee;
        btn.innerHTML = `${annee}<br>(${nbLivres})`;

        nav.appendChild(btn);

    });

}

function afficherLivres(livres) {

    const bibliotheque = document.getElementById("bibliotheque");

    bibliotheque.innerHTML = "";

    livres.forEach(livre => {

        bibliotheque.innerHTML += `

        <article class="livre-card">

            <img src="${livre.image}" alt="${livre.titre}">

            <div class="contenu">

                <h2>${livre.titre}</h2>

                <div class="meta-livre">

                    <p class="auteur">${livre.auteur}</p>

                    <span class="support">${livre.support}</span>

                </div>

                <div class="infos">

                    <span class="etoiles">${etoiles(livre.note)}</span>

                    <span>${livre.dateLecture}</span>

                </div>

                <h3>Mon avis</h3>

                <p>${livre.avis}</p>

                <details>

                    <summary>Voir le résumé</summary>

                    <p>${livre.resume}</p>

                </details>

            </div>

        </article>
        `;
    });
}

document.addEventListener("click", function(e) {

    if (!e.target.dataset.annee) return;

    document
        .querySelectorAll("#filtres button")
        .forEach(btn => btn.classList.remove("actif"));

    e.target.classList.add("actif");

    const annee = e.target.dataset.annee;

    if (annee === "toutes") {

        afficherLivres(tousLesLivres);
        return;
    }

   if (annee === "alire") {

    afficherLivres(
        tousLesLivres.filter(
            livre => livre.statut === "alire"
        )
    );

    return;
} 

    const filtres = tousLesLivres.filter(
        livre => livre.annee == annee
    );

    afficherLivres(filtres);

});

function deleteBook(id){

    if(confirm("Supprimer ce livre ?")){

        books = books.filter(
            b => b.id != id
        );
        afficherLivres(books);
        updateAdminList();
           }
}

function editBook(id){

    const b = books.find(book => book.id == id);

    if(!b) return;

   document.getElementById("bookId").value = b.id;

document.getElementById("titre").value = b.titre;
document.getElementById("auteur").value = b.auteur;
document.getElementById("année").value = b.annee;

document.getElementById("dateLecture").value = b.dateLecture || "";
document.getElementById("support").value = b.support || "";

document.getElementById("image").value = b.image || "";

document.getElementById("rating").value = b.note || "";

document.getElementById("avis").value = b.avis || "";
document.getElementById("resume").value = b.resume || "";

document.getElementById("statut").value =
    b.statut || "lu";

    document.getElementById("statut").value =
    b.statut || "lu";

  const saveBtn =
    document.getElementById("saveBtn");

if(saveBtn){
    saveBtn.textContent =
        "💾 Enregistrer les modifications";
}
console.log("Avant changement bouton");

document.getElementById("saveBtn").textContent =
    "💾 Enregistrer les modifications";

console.log("Après changement bouton");
}


document
.getElementById("exportJson")
.addEventListener("click", () => {

    const blob = new Blob(
        [JSON.stringify(books,null,2)],
        {type:"application/json"}
    );

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "books.json";

    a.click();
});

function updateAdminList(){

    const selector =
    document.getElementById(
        "bookSelector"
    );

    if(!selector) return;

    selector.innerHTML =
    '<option value="">Choisir un livre...</option>';

    books.forEach(book=>{

        selector.innerHTML += `

            <option value="${book.id}">
                ${book.titre}
            </option>

        `;

    });

}

document
.getElementById("editSelected")
?.addEventListener("click",()=>{

    const id =
    document.getElementById(
        "bookSelector"
    ).value;

    if(id){

        editBook(id);

    }

});

document
.getElementById("deleteSelected")
?.addEventListener("click",()=>{

    const id =
    document.getElementById(
        "bookSelector"
    ).value;

    if(id){

        deleteBook(id);

    }

});

document.getElementById("searchInput").addEventListener("keyup", function() {

    const filtre = this.value.toLowerCase();

    const resultat = tousLesLivres.filter(livre =>

        livre.titre.toLowerCase().includes(filtre)
        ||
        livre.auteur.toLowerCase().includes(filtre)

    );

    afficherLivres(resultat);

});

const adminBtn = document.getElementById("adminBtn");
const adminModal = document.getElementById("adminModal");
const closeBtn = document.querySelector(".close");

const loginModal =
document.getElementById("loginModal");

const loginBtn =
document.getElementById("loginBtn");

adminBtn.addEventListener("click", () => {

    loginModal.style.display = "block";

});

closeBtn.addEventListener("click", () => {
    adminModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === adminModal) {
        adminModal.style.display = "none";
    }
});

loginBtn.addEventListener("click", () => {

    const code =
    document.getElementById("adminCode").value;

    if(code === "9719"){

        loginModal.style.display = "none";

        adminModal.style.display = "block";

        document.getElementById(
            "adminCode"
        ).value = "";

    }else{

        alert(
            "Code bibliothécaire incorrect"
        );
    }

});
