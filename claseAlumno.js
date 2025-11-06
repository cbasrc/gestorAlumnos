// Clase base Persona
class Persona {
    constructor(nombre, apellido, dni, email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
    }

    obtenerNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }

    obtenerInfoBasica() {
        return {
            nombre: this.nombre,
            apellido: this.apellido,
            dni: this.dni,
            email: this.email
        };
    }
}

// Clase Alumno que hereda de Persona
class Alumno extends Persona {
    constructor(nombre, apellido, dni, email, carrera, anio, materias = []) {
        super(nombre, apellido, dni, email);
        this.carrera = carrera;
        this.anio = anio;
        this.materias = materias;
    }

    agregarMateria(materia) {
        if (!this.materias.includes(materia)) {
            this.materias.push(materia);
        }
    }

    obtenerInfoCompleta() {
        const infoBasica = super.obtenerInfoBasica();
        return {
            ...infoBasica,
            carrera: this.carrera,
            anio: this.anio,
            materias: this.materias
        };
    }

    mostrarEnConsola() {
        console.log('=== INFORMACIÓN DEL ALUMNO ===');
        console.log(`Nombre: ${this.obtenerNombreCompleto()}`);
        console.log(`DNI: ${this.dni}`);
        console.log(`Email: ${this.email}`);
        console.log(`Carrera: ${this.carrera}`);
        console.log(`Año: ${this.anio}°`);
        console.log(`Materias: ${this.materias.join(', ') || 'Ninguna'}`);
    }
}

// Clase para gestionar el sistema de alumnos
class GestorAlumnos {
    constructor() {
        this.alumnos = [];
        this.materiasDisponibles = [
            "Matemáticas",
            "Práctica del lenguaje", 
            "Física",
            "Química",
            "Historia",
            "Geografía",
            "Proyecto de Investigación",
            "Psicología",
            "Arte"
        ];
    }

    agregarAlumno(alumno) {
        this.alumnos.push(alumno);
        this.guardarEnLocalStorage();
    }

    obtenerUltimoAlumno() {
        return this.alumnos[this.alumnos.length - 1];
    }

    guardarEnLocalStorage() {
        const datosSimplificados = this.alumnos.map(alumno => alumno.obtenerInfoCompleta());
        localStorage.setItem('alumnos', JSON.stringify(datosSimplificados));
    }

    cargarDesdeLocalStorage() {
        const datosGuardados = localStorage.getItem('alumnos');
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            this.alumnos = datos.map(dato => 
                new Alumno(
                    dato.nombre, 
                    dato.apellido, 
                    dato.dni, 
                    dato.email, 
                    dato.carrera, 
                    dato.anio, 
                    dato.materias
                )
            );
            console.log('Alumnos cargados desde localStorage:', this.alumnos);
        }
    }

    mostrarTodosEnConsola() {
        console.log('=== LISTA COMPLETA DE ALUMNOS ===');
        this.alumnos.forEach((alumno, index) => {
            console.log(`Alumno ${index + 1}:`, alumno.obtenerInfoCompleta());
        });
    }
}

// Instancia del gestor
const gestor = new GestorAlumnos();

// Cargar al iniciar
document.addEventListener('DOMContentLoaded', function() {
    gestor.cargarDesdeLocalStorage();
    cargarMateriasEnFormulario();
    mostrarUltimoAlumno();
});

// Cargar checkboxes de materias
function cargarMateriasEnFormulario() {
    const container = document.getElementById('materiasContainer');
    
    gestor.materiasDisponibles.forEach(materia => {
        const div = document.createElement('div');
        div.className = 'materia-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = materia;
        checkbox.onchange = actualizarMateriasVista;
        
        const label = document.createElement('label');
        label.textContent = materia;
        
        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
    });
}

// Actualizar vista de materias seleccionadas
function actualizarMateriasVista() {
    const container = document.getElementById('materiasSeleccionadas');
    const seleccionadas = getMateriasSeleccionadas();
    
    if (seleccionadas.length === 0) {
        container.textContent = 'No hay materias';
        return;
    }
    
    container.innerHTML = '';
    seleccionadas.forEach(materia => {
        const tag = document.createElement('span');
        tag.className = 'materia-tag';
        tag.textContent = materia;
        container.appendChild(tag);
    });
}

// Obtener materias seleccionadas
function getMateriasSeleccionadas() {
    const checkboxes = document.querySelectorAll('#materiasContainer input:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Manejar envío del formulario
document.getElementById('alumnoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Crear instancia de Alumno
    const alumno = new Alumno(
        document.getElementById('nombre').value,
        document.getElementById('apellido').value,
        document.getElementById('dni').value,
        document.getElementById('email').value,
        document.getElementById('carrera').value,
        document.getElementById('anio').value,
        getMateriasSeleccionadas()
    );
    
    // Agregar al gestor
    gestor.agregarAlumno(alumno);
    
    // Mostrar en la vista
    mostrarUltimoAlumno();
    
    // Mostrar en consola
    alumno.mostrarEnConsola();
    gestor.mostrarTodosEnConsola();
    
    // Limpiar formulario
    this.reset();
    actualizarMateriasVista();
});

// Mostrar último alumno en la vista
function mostrarUltimoAlumno() {
    const container = document.getElementById('datosAlumno');
    const ultimoAlumno = gestor.obtenerUltimoAlumno();
    
    if (!ultimoAlumno) {
        container.textContent = 'No hay datos';
        return;
    }
    
    container.innerHTML = `
        <strong>Nombre:</strong> ${ultimoAlumno.obtenerNombreCompleto()}<br>
        <strong>DNI:</strong> ${ultimoAlumno.dni}<br>
        <strong>Email:</strong> ${ultimoAlumno.email}<br>
        <strong>Carrera:</strong> ${ultimoAlumno.carrera}<br>
        <strong>Año:</strong> ${ultimoAlumno.anio}°
    `;
}
