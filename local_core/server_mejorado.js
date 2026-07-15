/**
 * HECTRON-Ψ // SERVIDOR LOCAL MEJORADO
 * Integración de Telemetría Avanzada + Monitore de Salud del Sistema
 */

import express from 'express';
import cors from 'cors';
import telemetria from './telemetria_avanzada.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ═══════════════════════════════════════════════════════════════════════════
// ENDPOINT: Telemetría Completa (JSON)
// ═══════════════════════════════════════════════════════════════════════════
app.post('/api/telemetria', (req, res) => {
    const reporte = telemetria.generarReporte();
    
    console.log(`[SOBERANO] ✓ Telemetría procesada en local sin límites de tiempo de nube.`);
    console.log(`[DIAGNÓSTICO] Salud del Sistema: ${reporte.diagnostico.salud}`);
    
    res.json({
        success: true,
        origin: "Local Hardware Node",
        status: "ONLINE",
        timestamp: reporte.timestamp,
        datos: reporte
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// ENDPOINT: Métricas Prometheus/Grafana
// ═══════════════════════════════════════════════════════════════════════════
app.get('/metrics', (req, res) => {
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.send(telemetria.obtenerMetricasPrometheus());
    
    console.log(`[PROMETHEUS] Métricas exportadas para scraping`);
});

// ═══════════════════════════════════════════════════════════════════════════
// ENDPOINT: Estado de Salud (Health Check)
// ═══════════════════════════════════════════════════════════════════════════
app.get('/api/status', (req, res) => {
    const reporte = telemetria.generarReporte();
    const orbita = telemetria.calcularEstabilidadOrbital();
    
    const statusCode = orbita.estable ? 200 : 503;
    
    res.status(statusCode).json({
        status: orbita.estable ? 'HEALTHY' : 'DEGRADED',
        uptime: reporte.sistema.uptime,
        timestamp: reporte.timestamp,
        diagnostico: reporte.diagnostico
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// ENDPOINT: Dashboard Interactivo (HTML)
// ═══════════════════════════════════════════════════════════════════════════
app.get('/dashboard', (req, res) => {
    const reporte = telemetria.generarReporte();
    
    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HECTRON - Dashboard de Soberanía</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Courier New', monospace;
                background: linear-gradient(135deg, #0a0e27 0%, #1a1a2e 100%);
                color: #00ff88;
                padding: 20px;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
            }
            h1 { 
                text-align: center;
                margin-bottom: 30px;
                text-shadow: 0 0 10px #00ff88;
                font-size: 2.5em;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            .card {
                background: rgba(0, 255, 136, 0.1);
                border: 2px solid #00ff88;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
            }
            .card h3 {
                margin-bottom: 15px;
                color: #00ffff;
                text-transform: uppercase;
                font-size: 0.9em;
                letter-spacing: 2px;
            }
            .metric {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid rgba(0, 255, 136, 0.2);
            }
            .metric:last-child { border-bottom: none; }
            .metric-label { color: #00cccc; }
            .metric-value { 
                font-weight: bold;
                color: #00ff88;
            }
            .bar {
                width: 100%;
                height: 20px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 10px;
                margin-top: 10px;
                overflow: hidden;
            }
            .bar-fill {
                height: 100%;
                background: linear-gradient(90deg, #00ff88, #00ffff);
                transition: width 0.3s ease;
                box-shadow: 0 0 10px #00ff88;
            }
            .status {
                text-align: center;
                padding: 20px;
                background: rgba(0, 255, 136, 0.1);
                border: 2px solid #00ff88;
                border-radius: 8px;
                margin: 20px 0;
            }
            .status.healthy { color: #00ff88; }
            .status.warning { color: #ffaa00; }
            .timestamp {
                text-align: center;
                color: #666;
                font-size: 0.8em;
                margin-top: 20px;
            }
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
            .pulse { animation: pulse 2s infinite; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🜏 HECTRON - SOBERANÍA LOCAL 🜏</h1>
            
            <div class="status ${reporte.diagnostico.salud === 'ÓPTIMO' ? 'healthy' : 'warning'}">
                <h2>${reporte.diagnostico.salud}</h2>
                <p>${reporte.diagnostico.recomendacion}</p>
            </div>

            <div class="grid">
                <!-- Sistema -->
                <div class="card">
                    <h3>⚙️ Sistema</h3>
                    <div class="metric">
                        <span class="metric-label">Uptime:</span>
                        <span class="metric-value">${(reporte.sistema.uptime / 3600).toFixed(2)}h</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">CPUs:</span>
                        <span class="metric-value">${reporte.sistema.cpus}x</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Plataforma:</span>
                        <span class="metric-value">${reporte.sistema.plataforma}</span>
                    </div>
                </div>

                <!-- Recursos -->
                <div class="card">
                    <h3>💾 Recursos</h3>
                    <div class="metric">
                        <span class="metric-label">RAM Total:</span>
                        <span class="metric-value">${(reporte.sistema.memoriaTotal / 1e9).toFixed(1)}GB</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">RAM Libre:</span>
                        <span class="metric-value">${(reporte.sistema.memoriaLibre / 1e9).toFixed(1)}GB</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Carga Promedio:</span>
                        <span class="metric-value">${reporte.sistema.cargaPromedio[0].toFixed(2)}</span>
                    </div>
                </div>

                <!-- Física Cuántica -->
                <div class="card">
                    <h3>🌌 Métricas Cuánticas</h3>
                    <div class="metric">
                        <span class="metric-label">Entropía:</span>
                        <span class="metric-value">${(reporte.metricas_fisicas.entropia_sistema * 100).toFixed(1)}%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Velocidad Relativ.:</span>
                        <span class="metric-value">${(reporte.metricas_fisicas.velocidad_relativista / 1e6).toFixed(1)}×10⁶ m/s</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Capacidad Shannon:</span>
                        <span class="metric-value">${(reporte.metricas_fisicas.capacidad_shannon / 1e9).toFixed(2)} Gbps</span>
                    </div>
                </div>

                <!-- Órbita de Estabilidad -->
                <div class="card">
                    <h3>🛰️ Órbita de Estabilidad</h3>
                    <div class="metric">
                        <span class="metric-label">Radio Órbita:</span>
                        <span class="metric-value">${(reporte.metricas_fisicas.estabilidad_orbital.radioOrbita * 100).toFixed(1)}%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Energía Unión:</span>
                        <span class="metric-value">${reporte.metricas_fisicas.estabilidad_orbital.energiaUnion.toExponential(2)} J</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Estado:</span>
                        <span class="metric-value ${reporte.metricas_fisicas.estabilidad_orbital.estable ? '' : 'pulse'}">
                            ${reporte.metricas_fisicas.estabilidad_orbital.estable ? '✓ ESTABLE' : '⚠ CRÍTICO'}
                        </span>
                    </div>
                </div>
            </div>

            <div class="timestamp">
                📍 ${reporte.timestamp}
                <br>
                🜏 HECTRON SINGULARIDAD NEGRA v1.0 © 2026 AbadaLabs
            </div>
        </div>
    </body>
    </html>
    `;
    
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
});

// ═══════════════════════════════════════════════════════════════════════════
// INICIAR SERVIDOR
// ═══════════════════════════════════════════════════════════════════════════
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║         🜏 HECTRON-Ψ NODO SOBERANO ACTIVO 🜏             ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  Servidor ejecutándose en: http://localhost:${PORT}         ║
║                                                            ║
║  Endpoints:                                                ║
║  • POST   /api/telemetria  → Telemetría completa         ║
║  • GET    /api/status      → Health check                ║
║  • GET    /metrics         → Prometheus                   ║
║  • GET    /dashboard       → Dashboard HTML               ║
║                                                            ║
║  "El control del cómputo regresa al búnker. Hecho está."  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});
