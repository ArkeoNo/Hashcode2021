const { table } = require("console");

module.exports = 

class Intersection {
    constructor(id) {
        this.id = id;
        this.entreeInter = [];// Liste des rue allant vers l'intersection
        this.dureeFeux = [];// Liste de nombre -> duree d'allumage du feu de la rue
    }

    getInterEntre() {
        return this.entreeInter;
    }

    getInterEntreUtilisee() {
        return this.entreeInterUtilisee;
    }

    getInterDFeux() {
        return this.dureeFeux;
    }

    getId() {
        return this.id;
    }

    getFeuxUtilises() {// Renvoie le nombre de feux qui ont une durée différente de 0
        let feuxUtilises = 0;
        for (let i = 0; i < this.dureeFeux.length; i++) {
            if (this.dureeFeux[i] != 0) {
                feuxUtilises++;
            }
        }
        return feuxUtilises;
    }

    ajouterRue(nomRue) {
        if (!this.entreeInter.includes(nomRue)) {// Si la rue n'existe pas déjà on l'ajoute
            this.entreeInter.push(nomRue);
            this.dureeFeux.push(0);
        }
    }
}

