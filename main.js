let alumno = null;

function crearAlumno() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const mail = document.getElementById("mail").value;
    const carrera = document.getElementById("carrera").value;
    const anio = parseInt(document.getElementById("anio").value);

    alumno = new Desarrollo2(nombre, apellido, dni, mail, [], carrera, anio);
    document.getElementById("salida").textContent = "Alumno creado correctamente.";
}

function agregarMateria() {
    const materia = document.getElementById("materia").value;
    if (alumno) {
        alumno.agregarMateria(materia);
        document.getElementById("salida").textContent = `Materia agregada: ${materia}`;
    } else {
        document.getElementById("salida").textContent = "Primero crea un alumno.";
    }
}

function cambiarMaterias() {
    const materiasTexto = document.getElementById("materiasNuevas").value;
    const nuevasMaterias = materiasTexto.split(",").map(m => m.trim());
    if (alumno) {
        alumno.cambiarMaterias(nuevasMaterias);
        document.getElementById("salida").textContent = "Materias actualizadas.";
    } else {
        document.getElementById("salida").textContent = "Primero crea un alumno.";
    }
}

function mostrarInfo() {
    if (alumno) {
        let info = `Nombre: ${alumno.nombre}\nApellido: ${alumno.apellido}\nDNI: ${alumno.DNI}\nMail: ${alumno.mail}\nCarrera: ${alumno.carrera}\nAño: ${alumno.año}\nMaterias:\n`;
        if (alumno.materia.length === 0) {
            info += "No tiene materias cargadas.";
        } else {
            alumno.materia.forEach((m, i) => {
                info += `${i + 1}. ${m}\n`;
            });
        }
        document.getElementById("salida").textContent = info;
    } else {
        document.getElementById("salida").textContent = "Primero crea un alumno.";
    }
}