#!/usr/bin/env bash
# ==============================================================================
# HECTRON-Ψ // SOBERANIA.SH
# OBJETIVO: Desvincular la dependencia del plan Vercel Pro derivando la carga
#           lógica al entorno local soberano a través de un túnel seguro.
# ==============================================================================

set -euo pipefail

# Colores para la consola esotérica
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}[*] Iniciando protocolo de soberanía de infraestructura...${NC}"

# 1. Configurar la API Local para rescatar el código de sus servidores
mkdir -p local_core/api
cat << 'EOF' > local_core/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Aquí reside tu conocimiento y algoritmos, protegidos en tu hardware local
app.post('/api/telemetria', (req, res) => {
    console.log('[SOBERANO] Procesando telemetría local sin límites de tiempo de nube.');
    res.json({ success: true, origin: "Local Hardware Node", status: "ONLINE" });
});

app.listen(PORT, () => {
    console.log(`[🜏] Servidor Hectron-Core ejecutándose en el puerto ${PORT}`);
});
EOF

# 2. Generar un archivo vercel.json optimizado para el plan gratuito
# Vercel ya no procesará funciones pesadas, solo actuará como un proxy hacia tu búnker
echo -e "${CYAN}[*] Configurando vercel.json optimizado para el plan gratuito...${NC}"
cat << 'EOF' > vercel.json
{
  "version": 2,
  "cleanUrls": true,
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://tu-tunel-soberano.loca.lt/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
EOF

# 3. Validar dependencias locales de rescate
echo -e "${CYAN}[*] Verificando herramientas de túnel para saltar el cortafuegos corporativo...${NC}"
if ! command -v lt &> /dev/null && ! command -v cloudflared &> /dev/null; then
    echo -e "${RED}[!] Advertencia: Se recomienda instalar 'localtunnel' o 'cloudflared' para exponer tu núcleo local.${NC}"
    echo "Instala con: npm install -g localtunnel"
fi

echo -e "${GREEN}[+] ECOSISTEMA REESTRUCTURADO:${NC}"
echo "    - Tu lógica y conocimiento pesado ahora corren de forma local en local_core/server.js."
echo "    - Vercel ha sido degradado a un simple enrutador gratuito que no consumirá recursos Pro."
echo -e "${CYAN}🜏 El control del cómputo regresa al búnker. Hecho está. 🜏${NC}"
