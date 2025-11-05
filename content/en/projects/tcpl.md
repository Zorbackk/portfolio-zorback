---
title: "Complete Fullstack Application"
intro: "As part of my final training internship, my project was to create the website for the tennis club where I am a member. This project was carried out between February 2025 and November 2025. Initially, the project duration was supposed to align with the internship period, which was 10 weeks, from mid-February 2025 to mid-May 2025. However, I continued to develop this project until"
teamWork: "I completed this project alone from the design phase to modeling, from backend development to front-end implementation, and then to deployment setup. I also did part of the web content writing for the site."
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
  - title: "Home Page"
    description: "The site's home page includes the retrieval of the 3 most recent articles written, displays the latest photo galleries uploaded, a banner featuring the club's various partners, and a contact form."
  
  - title: "Administrator Dashboard"
    description: "The administrator dashboard allows administrators to create categories and tags for articles, add teams and enter their results, as well as partners, and edit photo galleries."
  
  - title: "Article Editor"
    description: "The article editor allows you to write articles by adding different tags and a category to which the article will be linked. There is a text editor (Quill) allowing intuitive article writing. It is also possible to add photos and PDFs to the article. It is also possible to affiliate one or more partners to the article."
  
  - title: "Articles and Photo Galleries Pages"
    description: "This page centralizes the various articles written. From the twelfth article onwards, pagination is implemented for a better user experience. The same applies from the twelfth gallery onwards."

  - title: "Results Entry"
    description: "In the dashboard, it is possible to create player profiles. These different profiles can be integrated into teams. Finally, a last part of the Results block allows an administrator to enter the results of this team by taking different parameters into account such as: away or home match, match date, etc..."

  - title: "Partners"
    description: "Like categories, results and galleries, the club has the possibility to add partners whether they are institutional or commercial. A dashboard tab allows you to create this new partner and assign them a card with their logo, name, description and clickable link to their website (if needed)."
  
  - title: "Secure Authentication"
    description: "Implementation of user roles (administrator and editor), systematic validation of JWT tokens, and rigorous control of endpoints according to authentication. Password hashing with BCrypt to strengthen the confidentiality of sensitive data. In order to improve the user experience, a notification will remind them that their session is about to expire and will invite them to extend it or log out."
  
  - title: "Data Security"
    description: "Use of Data Transfer Objects (DTO) which ensure secure and precise data transfer between the different layers without exposing the entire entities. Creation of custom exceptions to secure data access."


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