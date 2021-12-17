# JEST - Conceptos básicos para crear mocks con Jest

En este repositorio encontrarás unos ejemplos simples que te permitirá realizar tus primeros tests con mocks que reimplementan parcialmente o totalmente una función o un módulo de node.

## Recomendaciones
El contenido esta organizado para que sea visto en un determinado orden, el cual comienza desde algo sencillo a algo un poco mas complejo. Y algunos ejercicios de diferentes complejidades. Econtrarás, dentro del código, comentarios detallando contenidos y situaciones.

Comienza viendo los archivos en el siguiente orden:
  * src/functions.js - contiene funciones que realizan cáculos sensillos.
  * src/services.js - contiene funciones simples que consumen una API.
  * tests/functions.test.js - contiene los primeros ejemplos de tests.
  * tests/functionsWithMocks.test.js - contiene los primeros mocks.
  * test/services.test.js - contiene tests simples de los servicios que ofrece la API.
  * test/servicesWithMocks.test.js - contiene ejemplos de mocks de la API.

**Si utilizas Visual Studio Code, instalar la extensión ``` Jest Runner ``` te será MUY UTIL para que puedas aprovechar al 100% los ejemplos en este repositorio.** Podrás ejecutar aisladamente cada test, o los tests que esten agrupados.
Extensión para Visual Studio Code:
![image](https://github.com/marcegdv/demo-jest/blob/master/jestRunnerExtension.jpg?raw=true)
Luego de instalar la extensiòn, aparecerá la opción **Run** con la que podrás focalizar la ejecución de tests:
![image](https://raw.githubusercontent.com/marcegdv/demo-jest/master/jestRunnerRunOption.jpg)

Recuerda luego de clonar este repositorio, ejecutar el comando: ``` npm install ``` para instalar las dependencias.

## Links útiles
Api utilizada para los test: https://date.nager.at/Api

Más APIs en: https://github.com/public-apis/public-apis#open-data

Jest: https://jestjs.io/
