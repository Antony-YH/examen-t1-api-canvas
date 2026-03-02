/**
 * ============================================================================
 * PROYECTO: Dibujo Vectorial con API Canvas 2D
 * INSTITUCIÓN: Tecnológico Nacional de México Campus Pachuca
 * CARRERA: Ingeniería en Sistemas Computacionales
 * MATERIA: Graficación
 * AUTOR: Antonio Yañez Hernandez
 * FECHA: 02 Marzo 2026
 * DESCRIPCIÓN: Renderizado programático de un ajolote completo y simétrico
 * utilizando la API Canvas 2D. Este código genera una ilustración con todas
 * las seis branquias completamente renderizadas y simétricas, solucionando
 * la apariencia incompleta de la branquia inferior izquierda para que coincida
 * con el diseño original completo. El dibujo incluye más de 100
 * figuras geométricas básicas (rectángulos, círculos, líneas y curvas).
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inicialización del Canvas y Contexto
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Paleta de colores exacta extraída de la imagen original
    const colors = {
        water: "#a8d8f0",       // Azul cielo (Agua)
        sand: "#e6c998",        // Arena beige
        axolotlBody: "#ff99cc", // Rosa claro (Cuerpo y Cabeza)
        axolotlDark: "#e65c99", // Magenta/Rosa oscuro (Líneas internas y Boca)
        axolotlGills: "#d11a59",// Rojo/Rosa intenso (Tallos de branquias)
        plantDark: "#388e3c",   // Verde oscuro (Bloques de algas)
        plantLight: "#4caf50",  // Verde claro (Círculos de algas)
        cyanDetail: "#5CE1E6",  // Azul claro (Detalle de las patas) 
        black: "#000000",       // Negro (Líneas y Ojos)
        white: "#ffffff"        // Blanco (Burbujas y Brillo de ojos)
    };

    /**
     * Función constructora principal que orquesta el dibujo.
     * El orden de las llamadas determina qué elementos se dibujan delante de otros (z-index natural).
     */
    function drawScene() {
        drawBackground(); // Capa 1: Agua y Arena
        drawPlants();     // Capa 2: Vegetación
        drawBubbles();    // Capa 3: Burbujas
        drawTail();       // Capa 4: Cola (detrás del cuerpo)
        drawBody();       // Capa 5: Cuerpo
        drawGills();      // Capa 6: Branquias (detrás de la cabeza)
        drawHead();       // Capa 7: Cabeza
        drawFace();       // Capa 8: Rostro (sobre la cabeza)
        drawLegs();       // Capa 9: Patas (sobre el cuerpo)
    }

    /**
     * Dibuja el fondo marino utilizando rectángulos planos.
     * Crea un rectángulo grande para el agua y uno más pequeño en la base para la arena.
     */
    function drawBackground() {
        // Agua
        ctx.fillStyle = colors.water;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Arena
        ctx.fillStyle = colors.sand;
        ctx.fillRect(0, 520, canvas.width, 80);

        // Línea divisoria entre agua y arena
        ctx.beginPath();
        ctx.moveTo(0, 520);
        ctx.lineTo(canvas.width, 520);
        ctx.strokeStyle = colors.black;
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    /**
     * Coordina el dibujo de los cuatro grupos de algas/plantas en la base del canvas.
     */
    function drawPlants() {
        ctx.lineWidth = 2;
        drawBlockyPlant(80, 520, 9);  // Izquierda
        drawBlockyPlant(750, 520, 6); // Derecha
        drawBlockyPlant(800, 520, 4); // Derecha
        drawBlockyPlant(850, 520, 7); // Derecha
    }

    /**
     * Dibuja una planta individual basada en segmentos (bloques y círculos).
     * @param {number} x - Coordenada X central de la planta.
     * @param {number} yBase - Coordenada Y donde nace la planta (suelo).
     * @param {number} blocks - Número de segmentos/bloques verticales.
     */
    function drawBlockyPlant(x, yBase, blocks) {
        let currentY = yBase;
        const width = 20;
        const height = 24;

        for (let i = 0; i < blocks; i++) {
            currentY -= height;

            // Bloque central (Tallo rectangular)
            ctx.fillStyle = colors.plantDark;
            ctx.fillRect(x - width / 2, currentY, width, height);
            ctx.strokeRect(x - width / 2, currentY, width, height);

            // Círculos laterales simulando hojas
            ctx.fillStyle = colors.plantLight;
            ctx.beginPath();
            ctx.arc(x - width / 2, currentY, 7, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();

            ctx.beginPath();
            ctx.arc(x + width / 2, currentY, 7, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
        }
    }

    /**
     * Dibuja múltiples círculos blancos con contorno negro simulando burbujas
     * distribuidas estáticamente en el lienzo.
     */
    function drawBubbles() {
        const bubbles = [
            { x: 120, y: 150, r: 16 }, { x: 160, y: 220, r: 14 },
            { x: 110, y: 280, r: 8 },  { x: 140, y: 420, r: 10 },
            { x: 300, y: 120, r: 18 }, { x: 320, y: 250, r: 10 },
            { x: 800, y: 100, r: 15 }, { x: 840, y: 140, r: 10 },
            { x: 720, y: 350, r: 8 },  { x: 740, y: 430, r: 6 }
        ];

        ctx.fillStyle = colors.white;
        ctx.lineWidth = 2;

        bubbles.forEach(b => {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
        });
    }

    /**
     * Construye la cola trasera del ajolote utilizando un triángulo base 
     * modificado con curvas de Bezier cuadráticas para suavizar los bordes.
     */
    function drawTail() {
        ctx.beginPath();
        ctx.moveTo(350, 310);
        ctx.quadraticCurveTo(150, 310, 80, 440); // Curva superior 
        ctx.quadraticCurveTo(250, 450, 340, 390); // Curva inferior 
        ctx.fillStyle = colors.axolotlBody;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.stroke();

        // Detalle interior de la cola (Línea central color magenta)
        ctx.beginPath();
        ctx.moveTo(320, 350);
        ctx.lineTo(110, 435);
        ctx.strokeStyle = colors.axolotlDark;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.strokeStyle = colors.black; // Restaura el color a negro para futuros outlines
    }

    /**
     * Dibuja las seis branquias características del ajolote (3 por lado).
     * Utiliza transformaciones (translate/rotate) para colocar cada branquia simétricamente.
     */
    function drawGills() {
        const cx = 630; // Centro X (mismo centro de la cabeza)
        const cy = 240; // Centro Y

        // Ángulos simétricos en radianes para las 6 branquias
        const angles = [
            Math.PI + 0.4, Math.PI, Math.PI - 0.4, // Izquierda
            -0.4, 0, 0.4                           // Derecha
        ];

        angles.forEach(angle => {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            
            // Tallo central grueso color rojo
            ctx.beginPath();
            ctx.moveTo(95, 0); 
            ctx.lineTo(190, 0); 
            ctx.strokeStyle = colors.axolotlGills;
            ctx.lineWidth = 8;
            ctx.stroke();

            // Renderización de los "pelitos" de la branquia usando bucles de círculos magentas
            ctx.fillStyle = colors.axolotlGills;
            ctx.strokeStyle = colors.black;
            ctx.lineWidth = 1.5;
            
            for(let i = 110; i <= 180; i += 18) {
                // Fila superior de círculos
                ctx.beginPath(); ctx.arc(i, -10, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                // Fila inferior de círculos
                ctx.beginPath(); ctx.arc(i, 10, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            }

            ctx.restore();
        });
        
        ctx.strokeStyle = colors.black;
        ctx.lineWidth = 2.5;
    }

    /**
     * Dibuja la cabeza del ajolote mediante una elipse perfectamente horizontal.
     */
    function drawHead() {
        ctx.beginPath();
        ctx.ellipse(630, 240, 105, 90, 0, 0, Math.PI * 2);
        ctx.fillStyle = colors.axolotlBody;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    /**
     * Dibuja el cuerpo principal del ajolote mediante una elipse inclinada 
     * en ángulo negativo (-0.25 radianes) para conectar naturalmente con la cabeza.
     */
    function drawBody() {
        ctx.beginPath();
        ctx.ellipse(450, 330, 160, 85, -0.25, 0, Math.PI * 2);
        ctx.fillStyle = colors.axolotlBody;
        ctx.fill();
        ctx.strokeStyle = colors.black;
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    /**
     * Coordina el dibujo de las 4 patas colgantes.
     */
    function drawLegs() {
        drawLeg(340, 390, -0.1);  // Trasera izquierda
        drawLeg(410, 400, 0.05);  // Trasera derecha
        drawLeg(520, 370, -0.15); // Delantera izquierda
        drawLeg(570, 350, 0.1);   // Delantera derecha
    }

    /**
     * Dibuja una pata completa, aplicando rotación individual y 
     * ensamblando la base rectangular, el detalle cyan y los 3 dedos inferiores.
     * @param {number} x - Coordenada X de origen.
     * @param {number} y - Coordenada Y de origen.
     * @param {number} angle - Ángulo de rotación de la pata (en radianes).
     */
    function drawLeg(x, y, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        // Base de la pata (Rectángulo rosa principal)
        ctx.fillStyle = colors.axolotlBody;
        ctx.lineWidth = 3;
        ctx.fillRect(-12, 0, 24, 35);
        ctx.strokeRect(-12, 0, 24, 35);

        // Franja de detalle en el tobillo (Rectángulo Cyan)
        ctx.fillStyle = colors.cyanDetail;
        ctx.fillRect(-12, 35, 24, 6);
        ctx.strokeRect(-12, 35, 24, 6);

        // Dedos separados (3 Rectángulos iterados manualmente para control de rotación)
        ctx.fillStyle = colors.axolotlBody; 
        const toeW = 6;
        const toeH = 14;
        
        // Dedo izquierdo (rotado hacia afuera)
        ctx.save(); ctx.translate(-8, 41); ctx.rotate(0.3);
        ctx.fillRect(-toeW/2, 0, toeW, toeH); ctx.strokeRect(-toeW/2, 0, toeW, toeH); ctx.restore();
        
        // Dedo central (recto)
        ctx.save(); ctx.translate(0, 41);
        ctx.fillRect(-toeW/2, 0, toeW, toeH); ctx.strokeRect(-toeW/2, 0, toeW, toeH); ctx.restore();
        
        // Dedo derecho (rotado hacia afuera)
        ctx.save(); ctx.translate(8, 41); ctx.rotate(-0.3);
        ctx.fillRect(-toeW/2, 0, toeW, toeH); ctx.strokeRect(-toeW/2, 0, toeW, toeH); ctx.restore();
        
        ctx.restore();
    }

    /**
     * Construye las facciones del ajolote: los dos ojos y la boca sonriente.
     */
    function drawFace() {
        // Renderizado de ojos simétricos
        drawEye(570, 210);
        drawEye(680, 210);

        // Renderizado de boca sonriente (Curva de Bezier Cuadrática)
        ctx.beginPath();
        ctx.moveTo(580, 260); // Punto de inicio
        ctx.quadraticCurveTo(625, 290, 670, 260); // Punto de control y punto final
        ctx.strokeStyle = colors.axolotlDark;
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    /**
     * Dibuja un ojo con un círculo negro de base y un pequeño círculo blanco simulando brillo especular.
     * @param {number} x - Coordenada X del centro del ojo.
     * @param {number} y - Coordenada Y del centro del ojo.
     */
    function drawEye(x, y) {
        // Base oscura
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fillStyle = colors.black;
        ctx.fill();

        // Brillo (Pupila blanca descentrada hacia arriba a la derecha)
        ctx.beginPath();
        ctx.arc(x + 5, y - 5, 5, 0, Math.PI * 2);
        ctx.fillStyle = colors.white;
        ctx.fill();
    }

    // Disparador principal para ejecutar todo el renderizado al cargar la página
    drawScene();
});