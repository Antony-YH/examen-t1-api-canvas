/**
 * ============================================================================
 * PROYECTO: Dibujo Vectorial con API Canvas 2D
 * INSTITUCIÓN: Tecnológico Nacional de México
 * CARRERA: Ingeniería en Sistemas Computacionales
 * ESPECIALIDAD: Redes y Tecnología de Software
 * AUTOR: Antonio Yañez Hernandez
 * FECHA: Marzo 2026
 * DESCRIPCIÓN: Renderizado programático de un ajolote completo y simétrico
 * utilizando la API Canvas 2D. Este código genera una ilustración con todas
 * las seis branquias completamente renderizadas y simétricas, solucionando
 * la apariencia incompleta de la branquia inferior izquierda para que coincida
 * con el diseño original completo. El dibujo incluye más de 100
 * figuras geométricas básicas (rectángulos, círculos, líneas y curvas).
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inicialización del Canvas
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
        cyanDetail: "#5CE1E6",  // Azul claro (Detalle de las patas) <-- Añadido
        black: "#000000",       // Negro (Ojos)
        white: "#ffffff"        // Blanco (Pupilas de ojos)
    };

    /**
     * Función constructora principal
     * Llama a las subfunciones en orden de capas (fondo -> primer plano)
     */
    function drawScene() {
        drawBackground();
        drawPlants();
        drawBubbles();
        drawTail();     // Detrás del cuerpo
        drawBody();     // Delante de la cola
        drawGills();    // Las seis, completas y simétricas, detrás de la cabeza
        drawHead();     // Delante del cuerpo y branquias
        drawFace();     // Symmetrical y completa
        drawLegs();     // Las cuatro, symmetrical y completas
    }

    // --- 1. FONDO (AGUA Y ARENA) ---
    function drawBackground() {
        // Agua (Rectángulo)
        ctx.fillStyle = colors.water;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Arena (Rectángulo)
        ctx.fillStyle = colors.sand;
        ctx.fillRect(0, 520, canvas.width, 80);

        // Línea divisoria (Línea)
        ctx.beginPath();
        ctx.moveTo(0, 520);
        ctx.lineTo(canvas.width, 520);
        ctx.strokeStyle = colors.black;
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    // --- 2. VEGETACIÓN (ESTILO BLOQUES) ---
    function drawPlants() {
        ctx.lineWidth = 2;
        // Algas izquierdas (bloques y círculos)
        drawBlockyPlant(80, 520, 9);
        // Algas derechas (bloques y círculos)
        drawBlockyPlant(750, 520, 6);
        drawBlockyPlant(800, 520, 4);
        drawBlockyPlant(850, 520, 7);
    }

    // Subfunción para dibujar una alga de bloques
    function drawBlockyPlant(x, yBase, blocks) {
        let currentY = yBase;
        const width = 20;
        const height = 24;

        for (let i = 0; i < blocks; i++) {
            currentY -= height;

            // Bloque (Rectángulo)
            ctx.fillStyle = colors.plantDark;
            ctx.fillRect(x - width / 2, currentY, width, height);
            ctx.strokeRect(x - width / 2, currentY, width, height);

            // Círculos laterales
            ctx.fillStyle = colors.plantLight;
            ctx.beginPath();
            ctx.arc(x - width / 2, currentY, 7, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();

            ctx.beginPath();
            ctx.arc(x + width / 2, currentY, 7, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
        }
    }

    // --- 3. BURBUJAS ---
    function drawBubbles() {
        // Coordenadas y radios para la composición
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

    // --- 4. COLA ---
    function drawTail() {
        ctx.beginPath();
        // Forma triangular simétrica con curvas (Path)
        ctx.moveTo(350, 310);
        ctx.quadraticCurveTo(150, 310, 80, 440); // Curva superior hacia la punta
        ctx.quadraticCurveTo(250, 450, 340, 390); // Curva inferior de regreso
        ctx.fillStyle = colors.axolotlBody;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.stroke();

        // Línea central magenta interior (symmetrical)
        ctx.beginPath();
        ctx.moveTo(320, 350);
        ctx.lineTo(110, 435);
        ctx.strokeStyle = colors.axolotlDark;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.strokeStyle = colors.black; 
    }

    // --- 5. BRANQUIAS ---
    // ESTA FUNCIÓN DIBUJA LAS SEIS BRANQUIAS COMPLETAS Y SIMÉTRICAS
    function drawGills() {
        const cx = 630;
        const cy = 240;

        // Ángulos simétricos para las branquias (3 izq, 3 der)
        const angles = [
            Math.PI + 0.4, Math.PI, Math.PI - 0.4, // Lado izquierdo de la cabeza (symmetrical)
            -0.4, 0, 0.4                           // Lado derecho de la cabeza (symmetrical)
        ];

        angles.forEach(angle => {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            
            // Tallo central rojo/rosa (línea gruesa)
            ctx.beginPath();
            ctx.moveTo(95, 0); 
            ctx.lineTo(190, 0); 
            ctx.strokeStyle = colors.axolotlGills;
            ctx.lineWidth = 8;
            ctx.stroke();

            // Círculos magentas (franja) - DIBUJA TODOS LOS CÍRCULOS COMPLETOS
            ctx.fillStyle = colors.axolotlGills;
            ctx.strokeStyle = colors.black;
            ctx.lineWidth = 1.5;
            
            // Loop para dibujar múltiples círculos por branquia (genera muchas figuras)
            for(let i = 110; i <= 180; i += 18) {
                // Ramificación superior
                ctx.beginPath(); ctx.arc(i, -10, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                // Ramificación inferior
                ctx.beginPath(); ctx.arc(i, 10, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            }

            ctx.restore();
        });
        
        ctx.strokeStyle = colors.black;
        ctx.lineWidth = 2.5;
    }

    // --- 6. CABEZA ---
    function drawHead() {
        ctx.beginPath();
        // Symmetrical y completa
        ctx.ellipse(630, 240, 105, 90, 0, 0, Math.PI * 2);
        ctx.fillStyle = colors.axolotlBody;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    // --- 7. CUERPO (MODIFICADO: Ángulo corregido) ---
    function drawBody() {
        ctx.beginPath();
        // Ángulo negativo (-0.25) para que el cuerpo apunte hacia arriba a la cabeza
        ctx.ellipse(450, 330, 160, 85, -0.25, 0, Math.PI * 2);
        ctx.fillStyle = colors.axolotlBody;
        ctx.fill();
        ctx.strokeStyle = colors.black;
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    // --- 8. PATAS (MODIFICADO: Como el original) ---
    function drawLegs() {
        // Coordenadas ajustadas para que cuelguen rectas
        drawLeg(340, 390, -0.1); 
        drawLeg(410, 400, 0.05);  
        drawLeg(520, 370, -0.15); 
        drawLeg(570, 350, 0.1);  
    }

    // Subfunción para dibujar una pata (Rectángulos y 3 dedos)
    function drawLeg(x, y, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        // Pata principal
        ctx.fillStyle = colors.axolotlBody;
        ctx.lineWidth = 3;
        ctx.fillRect(-12, 0, 24, 35);
        ctx.strokeRect(-12, 0, 24, 35);

        // Línea azul (cyan) en el tobillo
        ctx.fillStyle = colors.cyanDetail;
        ctx.fillRect(-12, 35, 24, 6);
        ctx.strokeRect(-12, 35, 24, 6);

        // 3 Dedos separados (como en el original)
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

    // --- 9. ROSTRO ---
    function drawFace() {
        // Ojos (negros, simétricos con pupilas blancas)
        drawEye(570, 210);
        drawEye(680, 210);

        // Sonrisa magenta simple (curva)
        ctx.beginPath();
        ctx.moveTo(580, 260);
        ctx.quadraticCurveTo(625, 290, 670, 260);
        ctx.strokeStyle = colors.axolotlDark; // Usar magenta/rosa oscuro
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    // Subfunción para dibujar un ojo
    function drawEye(x, y) {
        // Ojo negro (Círculo)
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fillStyle = colors.black;
        ctx.fill();

        // Pupila blanca (Círculo pequeño, symmetrical)
        ctx.beginPath();
        ctx.arc(x + 5, y - 5, 5, 0, Math.PI * 2);
        ctx.fillStyle = colors.white;
        ctx.fill();
    }

    // Ejecutar la secuencia de dibujo
    drawScene();
});