# Examen de Graficación: Axolote en Canvas 2D

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

Este repositorio contiene la solución a la actividad de renderizado por programación utilizando la **API Canvas 2D de HTML5**. El proyecto consiste en la recreación vectorial simétrica y detallada de una imagen de referencia (un ajolote), cumpliendo y superando el requisito de utilizar más de 30 figuras geométricas básicas.

## 👨‍💻 Datos del Desarrollador
* **Autor:** Antonio Yañez Hernandez
* **Institución:** Tecnológico Nacional de México Campus Pachuca
* **Carrera:** Ingeniería en Sistemas Computacionales
* **Materia:** Graficación
* **Fecha:** 02 Marzo 2026

## 🎯 Objetivo del Proyecto
El objetivo principal es resolver un problema de renderizado gráfico mediante programación modular en JavaScript. La aplicación web muestra una interfaz dividida en dos paneles:
1. **Izquierda:** El dibujo generado dinámicamente mediante código puro en la etiqueta `<canvas>`.
2. **Derecha:** La imagen original que sirvió como referencia.

### ✨ Características Destacadas del Renderizado
* **Superación del límite de figuras:** El código genera más de 100 figuras básicas (elipses, rectángulos, círculos, líneas y curvas de Bezier cuadráticas) mediante el uso de bucles (`for`) y modularización funcional.
* **Simetría y Corrección:** Se solucionó la apariencia incompleta de la branquia inferior izquierda presente en algunos recortes de la imagen original, logrando un ajolote 100% simétrico.
* **Detalle Geométrico:** Las patas fueron detalladas utilizando traslaciones (`translate`) y rotaciones (`rotate`) en el lienzo para colocar rectángulos precisos (dedos) y franjas de color (cyan).
* **Gestión de Capas:** El dibujo se ejecuta en un orden estricto (fondo, algas, burbujas, cola, cuerpo, branquias, cabeza, patas) para simular el *z-index* y la superposición correcta de los elementos espaciales.

## 🛠️ Tecnologías Utilizadas
* **HTML5:** Estructura semántica de la aplicación y contenedor del Canvas.
* **API Canvas 2D:** Renderizado vectorial y matemáticas de coordenadas.
* **JavaScript (Vanilla):** Lógica del trazado, modularización del código y transformaciones 2D.
* **Bootstrap 5:** Sistema de cuadrículas (Grid), Navbar, Cards y diseño responsivo para adaptarse a cualquier pantalla.
* **CSS3:** Estilos personalizados, efectos de cristal (*Glassmorphism*), variables globales y transiciones fluidas.

## 📂 Estructura del Proyecto
El proyecto respeta la siguiente arquitectura de directorios:

```text
/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       ├── favicon.png
│       └── ajolote2d.png
├── index.html
└── README.md