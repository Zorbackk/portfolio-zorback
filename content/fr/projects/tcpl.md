---
title: "Application Fullstack complète"
intro: "Dans le cadre de mon stage de fin de formation, mon projet a été de réaliser le site internet du club de tennis dans lequel je suis adhérent. Ce projet s'est réalisé entre février 2025 et novembre 2025. Initialement, la durée du projet devait se caler sur le temps de stage soit 10 semaines, de mi-février 2025 à mi-mai 2025. Cependant, j'ai continué à développer ce projet jusqu'au"
teamWork: "J'ai réalisé ce projet seul de la phase de conception à la modélisation, du développement du backend à la réalisation du front-end, puis à la mise en place du déploiement. J'ai également réalisé une partie de la rédaction web du site."
image: "/images/projects/tcpl/tcpl.png"
status: "completed"

technologies:
  - "Front-end : React 19 et Mantine 8"
  - "Backend : Java 21 et Spring Boot"
  - "Base de données : MariaDB"
  - "Déploiement : Docker et PowerShell"
  - "IDEs : VSCode et IntelliJ"
  - "Autres outils notables : LiberKey, Laragon, Cmdr, GitHub"

github: "https://github.com/Zorbackk/backend-tennis-club-2025"
live: "https://tennis-club-de-landerneau.fr/"

pdf:
  title: "Présentation technique"
  file: "/PDF/app-presentation.pdf"

# Galerie de screenshots
screenshots:
  - title: "Accueil du site"
    image: "/images/projects/tcpl/accueil-tcpl.webp"
    description: ""

  - title: "Dashboard administrateur"
    image: "/images/projects/tcpl/dashboard-tcpl.webp"
    description: ""
  
  - title: "Editeur d'articles avec fil d'Ariane"
    image: "/images/projects/tcpl/editor-tcpl.webp"
    description: ""
  
  - title: "Page des articles"
    image: "/images/projects/tcpl/posts-tcpl.webp"
    description: ""

#  Fonctionnalités principales
features:
  - title: "Page d'accueil"
    description: "La page d'accueil du site comporte entre autres la récupération des 3 derniers articles écrits, affiche les dernières galeries photos mises en ligne, un bandeau avec les différents partenaires du club et un formulaire de contact."
  
  - title: "Dashboard administrateur"
    description: "Le dashboard administrateur permet aux administrateurs de créer des catégories et tags pour les articles, d'ajouter des équipes et saisir leurs résultats, ainsi que des partenaires et d'éditer des galeries photos."
  
  - title: "Éditeur d'articles"
    description: "L'éditeur d'articles permet de rédiger des articles en ajoutant différents tags et une catégorie auxquels l'article sera lié. Il y a un éditeur de texte (Quill) permettant une rédaction intuitive des articles. Il est également possible d'ajouter des photos et des PDF à l'article. Il est également possible d'affilier un ou plusieurs partenaires à l'article."
  
  - title: "Pages des articles et des galeries photos"
    description: "Cette page centralise les différents articles rédigés. A partir du douzième article, une pagination se met en place pour une meilleur expérience utilisateur. Il en va de même à compter de la douzième galerie."

  - title: "Saisie des résultats"
    description: "Dans le dashboard, il est possible de créer des profils de joueurs. Ces différents profils pourront être intégrés à des équipes. Enfin, une dernière partie du bloc Résultats permet à un administrateur de saisir les résultats de cette équipe en prenant différents paramètres en compte tel que : match à l'extérieur ou domicile, la date du match, etc..."

  - title: "Partenaires"
    description: "A l'instar des catégories, des résultats et des galeries, le club a la possibilité d'ajouter des partenaires qu'ils soient institutionnels ou commerciaux. Un onglet du dashboard permet de créer ce nouveau partenaire et de lui assigner une card avec son logo, son nom, une description et un lien cliquable vers son site internet (au besoin)."
  
  - title: "Authentification sécurisée"
    description: "Implémentation de rôles utilisateurs (administrateur et rédacteur), validation systématique des tokens JWT, et contrôle rigoureux des endpoints selon l'authentification. Hachage des mots de passe avec BCrypt pour renforcer la confidentialité des données sensibles. Afin d'améliorer l'expérience utilisateur,  une notification viendra lui rappeler que sa session arrive à expiration bientôt et l’invitera à la prolonger ou à se déconnecter."
  
  - title: "Sécurisation des données"
    description: "Utilisation des Data Transfert Object (DTO) qui assurent un transfert sécurisé et précis des données entre les différentes couches sans exposer la totalité des entités. Création d'exceptions personnalisées dans le but de sécuriser l'accès aux données."
  


# Autres informations
otherInfo:
  year: "2025"
  duration: "8 mois"
  team: "Solo"
  role: "Développeur Fullstack"
  client: "Tennis club de Landerneau"
  
  challenges:
    - "Ce projet étant le premier à mener d'un bout à l'autre de son développement, j'ai connu plusieurs pics de difficultés comme ceux exposés ci-dessous."
    - "La conceptualisation et la modélisation ont été un premier enjeu de taille car ces étapes ont déterminé la direction que je devais prendre pour la suite de projet."
    - "La réalisation du backend a été également un moment difficile car il me fallait prendre en main Java et Spring Boot tout en devant réaliser au mieux la structure que j'avais établi à l'étape précédente. "
    - "Le passage au front-end fut également un challenge de taille car il fallait faire le faire communiquer avec la base de données via mon backend. J'ai également découvert l'utilisation de React durant cette étape."
    - "Le déploiement a été un véritable challenge car c'était la première fois que je mettais en ligne une application de cette taille. Il a été effectué sur un serveur virtuel via la conteneurisation de l'application avec Docker, préalablement installé dans le VPS."
  
  results:
    - "Application en ligne"
    - "Challenges techniques relevés"
    - "Apprentissage de plusieurs nouvelles technologies"
---