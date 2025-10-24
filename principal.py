# Importamos la clase Alumno desde alumno.py
from alumno import Alumno

# Creamos una lista para guardar los alumnos ingresados
lista_alumnos = []

print("Gestor de alumnos de la escuela")
print("Para terminar, escribí 'salir'.\n")

# Bucle para ingresar alumnos
while True:  # Se repite hasta que el usuario escriba "yo no fui"
    nombre = input("Ingrese el nombre del alumno: ")
    if nombre.lower() == "salir":
        break  # Sale del bucle

    try:
        edad = int(input("Ingrese su edad: "))
    except ValueError:
        print("ingresa un numero.")
        edad = 0  # Si no pone un número, se asigna 0

    curso = input("Ingresá curso: ")

    # Creamos un objeto Alumno y lo agregamos a la lista
    alumno = Alumno(nombre, edad, curso)
    lista_alumnos.append(alumno)
    print("Alumno guardado exitosamente.\n")

# Mostrar todos los alumnos ingresados en esta sesión
print("\nLista de alumnos ingresados:")
for alumno in lista_alumnos:
    alumno.mostrar()
    print("-" * 30)

# Guardar los alumnos en un archivo de texto
with open("alumnos.txt", "w", encoding="utf-8") as archivo:
    for alu in lista_alumnos:
        archivo.write(f"{alumno.nombre}, {alumno.edad}, {alumno.curso}\n")

# Leer y mostrar el contenido del archivo alumnos.txt
print("\nContenido del archivo alumnos.txt:")
try:
    with open("alumnos.txt", "r", encoding="utf-8") as archivo:
        for linea in archivo:
            print(linea.strip())  # Muestra cada línea sin salto extra
except FileNotFoundError:
    print("El archivo alumnos.txt no existe todavía.")