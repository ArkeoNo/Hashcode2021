//Entrée (Lecture et tri des données)
const Intersection = require('./Modules/Classes/Intersection')//Intersection(entreeRues, feux)
const Voiture = require('./Modules/Classes/Voiture.js')//Voiture(etapes)
const Rue = require('./Modules/Classes/Rue.js')//Rue(debut, fin, temps, nom)
const fs = require('fs');

filename = "b.txt"

fs.readFile(`data/${filename}`, 'utf8', function (err, data) {
    if (err) throw err;
    console.log(`Fichier chargé: ${filename}`);
    //Traitement du Fichier d'input
    let lignes = data.split("\n");

    // Traitement de la première ligne

    let ligne0 = lignes[0].split(' ');
    let temps = Number(ligne0[0]);
    let nbIntersections = Number(ligne0[1]);
    let nbRues = Number(ligne0[2]);
    let nbVoitures = Number(ligne0[3]);
    let pointsBonus = Number(ligne0[1]);
    console.log(`temps: ${temps}, intersections: ${nbIntersections}, rues: ${nbRues}, voitures: ${nbVoitures}, points bonus: ${pointsBonus}`);

    console.log('Premiere ligne OK');

    // Création des intersections
    let listeIntersections = [];
    for (let i = 0; i < nbIntersections; i++) {
        listeIntersections.push(new Intersection(i))
    }

    console.log('Intersection OK');

    // Traitement des rues
    let listeRues = [];
    for (let indexLigneRue = 1; indexLigneRue <= nbRues; indexLigneRue++) {// Pour chaque ligne de rue
        let infosRue = lignes[indexLigneRue].split(' ');
        let debutRue = Number(infosRue[0])
        let finRue = Number(infosRue[1]);
        let nomRue = infosRue[2];
        let tempsRue = infosRue[3];

        listeRues.push(new Rue(debutRue, finRue, tempsRue, nomRue));
        listeIntersections[finRue].ajouterRue(nomRue);
    }

    console.log('Rue OK');

    // Traitement des voitures
    let listeVoitures = [];
    console.log('C\'est long là ...');
    for (let indexLigneVoiture = 1 + nbRues; indexLigneVoiture - 1 - nbRues < nbVoitures; indexLigneVoiture++) {// Pour chaque ligne de voiture
        let infosVoiture = lignes[indexLigneVoiture].split(' ');
        let nbRuesTrajetVoiture = infosVoiture[0];
        // Traitement des étapes de chaque voiture
        let ruesTrajetVoiture = [];
        for (let indexRueTrajet = 1; indexRueTrajet <= nbRuesTrajetVoiture; indexRueTrajet++) {
            ruesTrajetVoiture.push(infosVoiture[indexRueTrajet]);

            let feuChange = false;
            for (let i = 0; i < nbIntersections; i++) {
                if (listeIntersections[i].getInterEntre().includes(infosVoiture[indexRueTrajet])) {
                    for (let j = 0; j < listeIntersections[i].getInterEntre().length; j++) {
                        if (listeIntersections[i].getInterEntre()[j] == infosVoiture[indexRueTrajet]) {
                            listeIntersections[i].getInterDFeux()[j] = 1;
                            feuChange = true;
                            break;
                        }
                    }

                    if (feuChange == true) {
                        break;
                    }
                }
            }

        }
        listeVoitures.push(new Voiture(ruesTrajetVoiture));
    }

    console.log('Voiture - Intersection useless OK');


    // if (nbIntersections <= 100) {
    //     console.log("Rues: ");
    //     console.log(listeRues);
    //     console.log("Voitures: ");
    //     console.log(listeVoitures);
    //     console.log("Intersections: ");
    //     console.log(listeIntersections);
    // }

    let intersectionsUtilisees = 0;
    for (let i = 0; i < nbIntersections; i++) {
        if (listeIntersections[i].getFeuxUtilises() > 0) {
            intersectionsUtilisees++;
        }
    }
    
    console.log('Intersection utilisée OK');
    // Sortie
    sortie = fs.createWriteStream(`./data/output/output_${filename}`, { flag: 'a' });
    console.log(`Fichier output_${filename} créé/ouvert`)
    sortie.write(intersectionsUtilisees + '\n');
    for (let indexIntersection = 0; indexIntersection < nbIntersections; indexIntersection++) {
        let intersecionActuelle = listeIntersections[indexIntersection];
        if (intersecionActuelle.getFeuxUtilises() >= 1) {
            sortie.write(intersecionActuelle.getId() + '\n' + intersecionActuelle.getFeuxUtilises() + '\n');
            for (let indexFeux = 0; indexFeux < intersecionActuelle.getInterEntre().length; indexFeux++) {
                if (intersecionActuelle.getInterDFeux()[indexFeux] != 0) {
                    sortie.write(intersecionActuelle.getInterEntre()[indexFeux] + ' ' + intersecionActuelle.getInterDFeux()[indexFeux] + '\n');
                }
            }
        }
    }
})