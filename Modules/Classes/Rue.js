module.exports = 


class Rue {
    constructor (debut, fin, temps, nom){
        this.nom = nom;
        this.temps = temps;
        this.debut = debut;
        this.fin = fin;
    }

    getRueName(){
        return this.nom;
    }

    getRueTemps(){
        return this.temps;
    }

    getRueDebut(){
        return this.debut;
    }

    getRueFin(){
        return this.fin;
    }
}