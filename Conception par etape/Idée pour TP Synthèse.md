Idée pour TP Synthèse

Une application web pour faire un critique positif et/ou négatif de musique.

Les utilisateurs peuvent ajouter, modifier, créer et supprimer leurs chansons et leurs critiques.

Nos entités

Utilisateur(s)

* Username
* Email
* Mot de passe

Chasons

* Titre
* Artiste
* Genre
* Étoiles (rating /5)

Critiques

* Titre
* Contenu
* Note (rating /5)
* Avis (positif, négatif ou les deux)

Relations :

* Un utilisateur peut écrire plusieurs critiques
* Une chanson peut avoir plusieurs critiques
* Une critique appartient à un utilisateur et une chanson.

Point de terminaison d’API

**Authentification**

* POST /api/register → inscription
* POST /api/login → connexion

**Chansons**

* GET /api/songs → liste des chansons
* POST /api/songs → ajouter une chanson
* GET /api/songs/:songId → détail chanson
* PUT /api/songs/:songId → modifier
* DELETE /api/songs/:songId → supprimer

**Critiques**

* GET /api/reviews → toutes les critiques
* GET /api/reviews/song/:songId → critiques d’une chanson
* POST /api/reviews → créer une critique
* PUT /api/reviews/:reviewId → modifier
* DELETE /api/reviews/:reviewId → supprimer

Pages front end

**Public (non connecté)**

* / → page d’accueil (liste chansons + critiques)
* /login → connexion
* /register → inscription
* /songs/:songId → voir chanson + critiques

**Connecté (utilisateur)**

* /myReviews → mes critiques
* /songs/add → ajouter une chanson
* /reviews/add/:songId → ajouter critique
* /reviews/edit/:reviewId → modifier critique