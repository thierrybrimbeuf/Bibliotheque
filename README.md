# Mes lectures de retraité

**Bibliothèque personnelle de livres lus et à lire**

Application Web personnelle permettant de gérer, consulter et enrichir une bibliothèque de lectures.

La bibliothèque est conçue comme une application simple, autonome et légère, fonctionnant directement dans un navigateur à partir d'un fichier de données JSON.

## Présentation

**Mes lectures de retraité** permet de conserver l'historique de mes lectures et de gérer les ouvrages que je souhaite lire.

L'application permet notamment de :

- consulter les livres sous forme de cartes ;
- rechercher rapidement un titre ou un auteur ;
- filtrer les ouvrages par année ;
- afficher les livres **À lire** ;
- consulter une fiche détaillée ;
- gérer les livres depuis une interface d'administration ;
- suivre le statut de lecture ;
- rechercher un ouvrage sur plusieurs sites spécialisés ;
- exporter les données de la bibliothèque au format JSON.

Le projet est développé en **HTML, CSS et JavaScript**, sans base de données.

---

## Fonctionnalités

### Consultation de la bibliothèque

Les ouvrages sont présentés sous forme de cartes.

Chaque carte affiche :

- la couverture ;
- le titre ;
- l'auteur ;
- le support ;
- le statut de lecture ;
- un accès à la fiche détaillée.

Les livres sont classés du plus récent au plus ancien selon l'année et le mois de lecture. À période identique, ils sont classés alphabétiquement par titre.

### Recherche

La barre de recherche permet une recherche instantanée sur :

- le titre ;
- l'auteur.

### Filtres

La bibliothèque propose :

- **Toutes** ;
- **À Lire** ;
- une sélection par année.

Le nombre de livres correspondant à chaque filtre est affiché automatiquement.

---

## Gestion des statuts

Chaque ouvrage peut avoir l'un des trois statuts :

| Statut | Signification |
|---|---|
| **Lu** | Livre terminé |
| **Lecture en cours** | Livre actuellement en cours de lecture |
| **À lire** | Livre prévu pour une lecture future |

Le statut est visible directement sur les cartes et dans la fiche détaillée.

Le formulaire adapte automatiquement la gestion de l'année et du mois de lecture en fonction du statut.

---

## Fiche détaillée

La fiche détaillée constitue l'espace de consultation complète d'un ouvrage.

Elle présente notamment :

- la couverture ;
- le titre ;
- l'auteur ;
- le statut ;
- l'année ;
- le mois de lecture ;
- le support ;
- la note ;
- le résumé ;
- la critique ;
- l'avis personnel.

La note est affichée sous forme d'étoiles accompagnées de sa valeur sur 5.

---

## Liens vers les sites spécialisés

La fiche détaillée permet de rechercher automatiquement le livre sur quatre sites :

- Cultura ;
- FNAC ;
- Amazon ;
- Google Books.

Les recherches sont construites automatiquement à partir du **titre et de l'auteur**. Les URL ne sont donc pas enregistrées dans `livres.json`.

---

## Administration

L'administration est accessible depuis le bouton **Administration**.

L'accès est protégé par un code PIN.

Elle permet de :

- ajouter un livre ;
- modifier un livre ;
- supprimer un livre ;
- gérer les informations bibliographiques ;
- gérer le statut de lecture ;
- renseigner le résumé, la critique et l'avis personnel ;
- associer une couverture ;
- attribuer une note ;
- exporter la bibliothèque.

Lorsqu'un nouveau livre est créé, son identifiant est généré automatiquement à partir du plus grand identifiant existant.

---

## Export et sauvegarde

L'application fonctionne avec le fichier :

```text
livres.json
```

Le navigateur ne modifie pas directement ce fichier sur le disque.

Lorsqu'une modification est effectuée dans l'administration, elle est réalisée en mémoire.

L'utilisateur peut ensuite utiliser **Exporter JSON** afin de générer une nouvelle version de `livres.json`.

Le fichier exporté peut ensuite remplacer l'ancien fichier dans le projet et être sauvegardé.

---

## Installation

L'application ne nécessite pas de serveur applicatif ni de base de données.

### Prérequis

- un navigateur Web moderne ;
- les fichiers du projet ;
- un environnement permettant de servir les fichiers localement si nécessaire.

Le projet peut notamment être utilisé avec **Visual Studio Code** et **Live Server**.

### Installation

1. Télécharger ou cloner le projet.
2. Conserver l'arborescence des fichiers.
3. Ouvrir le projet avec Visual Studio Code.
4. Lancer l'application avec un serveur local.
5. Ouvrir `index.html` dans le navigateur.

Le fichier `livres.json` doit être accessible depuis le même environnement que l'application.

---

## Structure du projet

```text
Bibliothèque/
│
├── index.html
├── style.css
├── script.js
├── livres.json
│
├── images/
│   ├── couvertures...
│   ├── logo-bibliotheque.png
│   ├── logo-compact.png
│   └── pas-de-couverture.jpg
│
├── favicon.png
│
└── Documentation/
```

Les quatre fichiers principaux ont des responsabilités distinctes :

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de l'application |
| `style.css` | Présentation graphique et responsive |
| `script.js` | Logique et fonctionnement |
| `livres.json` | Données de la bibliothèque |

---

## Données — `livres.json`

Les informations relatives aux ouvrages sont stockées dans un fichier JSON.

Les principaux champs sont :

| Champ | Description |
|---|---|
| `id` | Identifiant numérique unique |
| `titre` | Titre du livre |
| `auteur` | Auteur |
| `annee` | Année de lecture |
| `dateLecture` | Mois de lecture |
| `support` | Livre, BD ou Liseuse |
| `image` | Chemin vers la couverture |
| `note` | Note de 0 à 5 |
| `statut` | Statut de lecture |
| `resume` | Résumé |
| `critique` | Critique |
| `avisPersonnel` | Avis personnel |

Le modèle actuel conserve le mois sous forme de texte. Cette représentation est conservée pour la V1.2.

---

## Technologies utilisées

Le projet repose volontairement sur des technologies simples :

- **HTML5**
- **CSS3**
- **JavaScript**
- **JSON**

Aucun framework JavaScript n'est nécessaire.

Aucune base de données n'est utilisée.

L'architecture repose sur un chargement du fichier JSON, un traitement des données en mémoire puis une génération dynamique de l'interface.

---

## Identité graphique

L'application possède une identité graphique spécifique autour de l'univers de la bibliothèque.

Le titre est :

> **Mes lectures de retraité**

avec le sous-titre :

> *Les livres qui m'ont accompagné*

L'en-tête utilise un logo spécifique avec une version compacte adaptée aux petits écrans. Le favicon est également intégré à la page.

L'interface est responsive et s'adapte aux :

- ordinateurs ;
- tablettes ;
- smartphones.

---

## Versions et évolutions

La V1.2 a été construite progressivement à partir de la baseline **V1.1.1-a**.

Principales évolutions :

- **EVOL-001** — Refonte du formulaire d'administration
- **EVOL-002** — Refonte de la fiche détaillée
- **EVOL-003** — Liens automatiques vers les sites spécialisés
- **EVOL-003A** — Adaptation du lien Cultura
- **EVOL-004** — Modernisation de la page principale
- **EVOL-004E** — Finalisation de l'interface utilisateur
- **EVOL-005** — Identité graphique
- **EVOL-006** — Favicon
- **BUG-0003** — Gestion des dates selon le statut

La V1.2 constitue la version de référence de l'application.

---

## Documentation

Le README constitue la **documentation d'accueil du projet**.

Il est complété par le **Manuel de Référence Technique et Fonctionnel**, qui décrit de manière plus détaillée l'architecture, les données, le fonctionnement et la méthode de développement du projet.

La documentation du projet comprend notamment :

```text
README.md
CHANGELOG.md
VERSION.txt
Documentation/
```

---

## Projet personnel

**Mes lectures de retraité** est un projet personnel destiné à conserver, organiser et partager une bibliothèque de lectures.

L'objectif est de privilégier :

- la simplicité ;
- l'autonomie ;
- la pérennité ;
- la lisibilité du code ;
- la facilité de maintenance ;
- l'évolutivité.

Le projet est conçu pour pouvoir continuer à évoluer progressivement, sans dépendre d'une infrastructure complexe.
