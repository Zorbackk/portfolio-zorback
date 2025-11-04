---
title: "Fullstack application"
intro: "As part of my end-of-training internship, my project was to create the website for the tennis club of which I am a member. This project took place between February 2025 and the end of October 2025."
teamWork: "I carried out this project entirely on my own, from the design and modeling phases to backend development, frontend implementation, and deployment setup. I also wrote part of the website’s content."
image: "/images/projects/"
status: "completed"

technologies:
  - "Front-end : React 19 and Mantine 8"
  - "Backend : Java 21 and Spring Boot"
  - "Database : MariaDB"
  - "Deployment : Docker and PowerShell"
  - "IDEs : VSCode et IntelliJ"
  - "Others notable tools : LiberKey, Laragon, Cmdr, GitHub"

github: "https://github.com/Zorbackk/backend-tennis-club-2025"
live: "https://tennis-club-de-landerneau.fr/"

pdf:
  title: "Technical overview"
  file: "/PDF/app-presentation.pdf"

# Galerie de screenshots
screenshots:
  - title: "Homepage"
    image: "/images/projects/tcpl/accueil-tcpl.webp"
    description: ""

  - title: "Administrator Dashboard"
    image: "/images/projects/tcpl/dashboard-tcpl.webp"
    description: ""
  
  - title: "Article Editor"
    image: "/images/projects/tcpl/editor-tcpl.webp"
    description: ""
  
  - title: "Articles page"
    image: "/images/projects/tcpl/posts-tcpl.webp"
    description: ""

#  Fonctionnalités principales
features:
  - title: "Homepage"
    description: "The homepage of the website includes, among other things, the display of the three most recent articles, the latest uploaded photo galleries, a banner showcasing the club’s various partners, and a contact form."
  
  - title: "Administrator Dashboard"
    description: "The administrator dashboard allows admins to create categories and tags for articles, create teams and enter their results, add partners, and edit photo galleries."
  
  - title: "Article Editor"
    description: "The article editor allows users to write articles by adding various tags and a category to which the article will be linked. A text editor (Quill) provides an intuitive writing experience. It is also possible to add photos or PDFs to the article and to associate one or several partners with it if desired."
  
  - title: "Articles and Photo Galleries Pages"
    description: "This page centralizes all published articles. Starting from the twelfth article, pagination is implemented to provide a better user experience. The same applies from the twelfth photo gallery onward."
  
  - title: "Results Entry"
    description: "Within the dashboard, it is possible to create player profiles. These profiles allow the creation of teams for the club. Finally, a dedicated section within the Results module lets an administrator enter team results, taking into account various parameters such as home or away matches, match dates, and more."
  
  - title: "Partners"
    description: "Similar to categories, results, and galleries, the club has the ability to add partners, whether institutional or commercial. A dashboard tab allows admins to create new partners and generate a card with their logo, name, description, and an optional clickable link to their website."
  
  - title: "Secure Authentication"
    description: "Implementation of user roles (administrator and editor), systematic JWT token validation, and strict endpoint access control based on authentication. Passwords are hashed using BCrypt to strengthen the confidentiality of sensitive data. To enhance the user experience, a small notification alerts the user when their session is about to expire, inviting them to extend it or log out."
  
  - title: "Data Security"
    description: "Use of Data Transfer Objects (DTOs) ensures secure and precise data transfer between layers without exposing entire entities. Custom exceptions have been created to further secure data access."


# Autres informations
otherInfo:
  year: ""
  duration: ""
  team: ""
  role: ""
  client: ""
  
  challenges:
    - ""
    - ""
    - ""
    - ""
    - ""
  
  results:
    - ""
    - ""
    - ""
    - ""
    - ""
    - ""
---