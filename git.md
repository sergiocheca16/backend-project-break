# Guía para usar Git en equipo

Ahora veremos los pasos necesarios para comenzar:

## 1. Crear el repositorio y clonarlo

Lo primero de todo es que uno de los integrantes haga el repositorio en el que estará nuestro proyecto. Una vez se haga ese repositorio se tendrá que dar acceso a cada uno de los integrantes que van a participar en él. 
Iremos al repositorio -> settings -> collaborators -> y ahí añadiremos el colaborador por su github. Recibirá una invitación al mail y al aceptarla ya tendrá el control que se le haya dado en el repositorio.

Clonar un repositorio. Una vez teniendo todos los integrantes el acceso al repositorio en el que se va a trabajar se clonará en nuestro ordenadores. 
Recordad, aquí no hay que forkear primero, eres dueño o colaborador del mismo, por tanto tendrás acceso a hacer pull, push ...

Ejemplo:
```bash
git clone https://github.com/usuario/repo.git 
```

## 2. Flujos de trabajo con ramas
En equipos, es común usar ramas para desarrollar nuevas funcionalidades o corregir errores sin afectar el código principal.

Crear una nueva rama:
```bash
git checkout -b nombre-de-la-rama
```
Esto crea una nueva rama y te cambia automáticamente a ella.

```bash
git branch
```
Con este comando verificas en la rama que te encuentras. Las ramas disponibles aparecerán listadas, con un asterisco en la que estás actualmente.
Así conseguimos es que cada miembro del equipo trabaje en el mismo proyecto pero en estados diferentes (ramas) haciendo partes definidas previamente por cada integrante.

## 3. Hacer cambios y confirmar
Una vez hecho el trabajo se subira como de costumbre con un pequeño cambio para asegurarnos a que parte va.

```bash
git add .
git commit -a -m "Descripción de los cambios"
git push origin nombre-de-la-rama
```
Con esto subiremos el contenido (origin) a la rama que tendremos en nuetro repositorio en github (remote).

## 4. Colaboración y manejo de conflictos
Traer los últimos cambios del repositorio remoto antes de trabajar en nuevos cambios, asegúrate de estar al día con los últimos cambios.
Siempre estaremos en contacto con nuestro equipo diciéndo lo que hemos hecho y si se puede añadir ese cambio a la rama main y aquí haremos lo que se llama hacer `merge`

### Unir (merge) ramas
Cuando tu trabajo en una rama está listo para integrarse al código principal, debes hacer un merge. Decidiremos quién del equipo es el encargado de esos merge.
para hacerlo se harán los siguientees pasos:
- El equipo habrá subido todos los cambios hasta el momento a github. Al haber trabajado en ramas no debería haber ningún problema.
- La persona encargada del mergeo se cambiará a la rama principal
```bash
git checkout main
```
- La persona en cargada del `mergeo` hará un git pull del proyecto completo con todas las ramas que se hayan creado
```bash
git pull
```
Al realizar este pull todo el repositorio estará actualizado, por tanto tendremos acceso a nuestras ramas y a las ramas creadas por nuestro(s) compañeros. Ahora es el momento de mergear:
- Este es el momento de mergear a la rama principal (main) todas las ramas que se hayan finalizado las tareas.
```bash
git merge nombre-de-la-rama
```
### Resolver conflictos
Si hay conflictos durante el merge, Git te lo notificará. Deberás editar los archivos conflictivos y decidir qué cambios mantener. Probablemente os aparezcan en Visual Studio Code y se tendrá que decidir con qué código quedarse.

- Edita los archivos en conflicto.
- Después de resolverlos, marca el conflicto como resuelto. Es añir ese archivo como si lo fueramos a subir: 
```bash
git add archivo-en-conflicto.js
```
- Haremos el commit y haremos push
```bash 
git commit -a -m "Descripción de los cambios"
git push
```
## 5. Ahora estamos todos con la misma versión
Cada integrante del equipo hará un pull del repositorio. El dueño del mergeo al ser el último en haber mergeado y hecho la subida no tendrá que hacer nada. Los demás integrantes del equipo tendrán que hacer un pull a main y así tener la misma versión.
A partir de ahí ya tenemos el repo actualizado y volvemos a empezar. Creamos otra rama y seguimos trabajando.

## 6. Buenas prácticas
- Ramas por feature: Crea ramas para cada nueva funcionalidad o corrección de errores.
- Commits claros y frecuentes: Haz commits pequeños con mensajes descriptivos.
- Sincronización constante: Haz git pull regularmente para mantener tu rama actualizada.
- Estaremos siempre en continuo contacto con el equipo para saber si se necesita ayuda, si se han subido cambios que afecten al resto del código, ...

### Resumen de comandos

| Comando                        | Descripción                                                                  |
|--------------------------------|------------------------------------------------------------------------------|
| `git clone <URL>`              | Clona un repositorio remoto en tu máquina local.                             |
| `git branch`                   | Muestra las ramas disponibles y la rama activa actualmente.                  |
| `git checkout -b <nombre-rama>`| Crea una nueva rama y te cambia a ella.                                      |
| `git add <archivo>`            | Añade un archivo específico al área de preparación (stage).                  |
| `git add .`                    | Añade todos los archivos modificados al área de preparación.                 |
| `git commit -a -m "mensaje"`   | Confirma los cambios añadidos con un mensaje descriptivo.                    |
| `git pull origin <rama>`       | Trae los últimos cambios de la rama especificada desde el repositorio remoto.|
| `git push origin <rama>`       | Sube los cambios de tu rama actual al repositorio remoto.                    |
| `git merge <nombre-rama>`      | Une los cambios de una rama a la rama activa actual.                         |
| `git status`                   | Muestra el estado actual de los archivos en el repositorio.                  |
| `git log`                      | Muestra el historial de commits.                                             |
|--------------------------------|------------------------------------------------------------------------------|

