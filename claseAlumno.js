// Clase base
class Desarrollo1 {
    constructor(nombre, apellido, DNI, mail, materia = [], carrera, año) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.DNI = DNI;
        this.mail = mail;
        this.materia = materia; // Lista de materias
        this.carrera = carrera;
        this.año = año;
    }

    mostrarInfo() {
        console.log(`Nombre: ${this.nombre}\nApellido: ${this.apellido}\nDNI: ${this.DNI}\nMail: ${this.mail}\nCurso: ${this.carrera}\nAño: ${this.año}`);
        this.mostrarMaterias();
    }

    mostrarMaterias() {
        if (this.materia.length === 0) {
            console.log("No tiene materias cargadas.");
        } else {
            console.log("Materias:");
            this.materia.forEach((m, i) => console.log(`${i + 1}. ${m}`));
        }
    }

    agregarMateria(materia) {
        this.materia.push(materia);
        console.log(`${this.nombre} se inscribió en ${materia}`);
    }
}

// Clase hija
class Desarrollo2 extends Desarrollo1 {
    constructor(nombre, apellido, DNI, mail, carrera, año) {
        super(nombre, apellido, DNI, mail, [], carrera, año); //materia = lista vacía
    }

    cambiarMaterias(nuevasMaterias) {
        if (Array.isArray(nuevasMaterias)) {
            this.materia = [...nuevasMaterias];
            console.log(`Materias actualizadas para ${this.nombre}.`);
        } else {
            console.log("Error: Debe ser una lista de materias.");
        }
    }

    agregarMateria(materia) {
        if (!this.materia.includes(materia)) {
            super.agregarMateria(materia);
        } else {
            console.log(`${this.nombre} ya está inscripto en ${materia}`);
        }
    }
}