# TP quizz JS

```
* Lidec Chloé 23A
* Contient QuizzJs.html, scriptquizz.js et style.css
```

## Notes
* Les commentaires de fonctions et autres sont écrits en anglais pour me faciliter l'export sur mon dossier de projets.
* Les variables de questions ne sont pas en JSON car je n'ai pas réussi à creer de fonction pour importer le JSON.
* J'avais commencé pour le premier formulaire a faire un pattern or les patternes ne fonctionnaient pas (exemple le nom était marqué comme faux alors qu'il etait sous le bon format). Après avoir cherché avec l'aide du professeur, le souci n'a pas été réglé, j'ai donc fait une fonction js qui le verifie elle meme
* Le bouton continuer du formulaire n'est donc pas du type submit le submit ne convenait pas pour le type de page que je voulait faire
C'est donc un bouton simple qui appelle une fonction JS qui vérifie tout.
* La page n'est jamais rechargée sauf lors du retour à l'acceuil pour que la navigation soit fluide, je cache et découvre les sections.
* A la fin du projet, aucun patternes seulement des verifs à l'aide de js car les patterns sont liés au submit qui bloque ensuite ma page même en cas de submit valide