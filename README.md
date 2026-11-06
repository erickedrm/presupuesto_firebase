# Mi Presupuesto

App web para llevar gastos, ingresos y presupuesto mensual, pensada para usarse desde el celular.
Se instala como app (PWA), se entra con la cuenta de Google y cada persona ve solo sus propios datos.

Tiene dos modos (se cambian en ⚙ Configuración):

- **Modo sencillo**: solo lo básico (cuánto te queda, categorías, pagos recurrentes y movimientos). Ideal si es tu
  primera app de presupuesto o para personas mayores.
- **Modo completo**: todas las funciones de abajo. Las tarjetas que no usas no aparecen, así que la pantalla no se satura.

## Qué hace

### Capturar
- **Captura rápida**: monto, en qué y categoría. Lo que más repites aparece arriba como botón: un toque lo llena todo
  y solo ajustas el monto. Fecha, método, meses sin intereses, gasto compartido, periodo del recibo y etiquetas
  quedan escondidos en "Cambiar".
- **Captura con IA (Gemini)**: escribe o dicta "hoy gasté 500 en comida y 200 de Uber" y los separa solos.
- **📷 Ticket**: desde el botón "+ Agregar", toma la foto de un ticket y se captura solo.
- **Estado de cuenta**: sube el PDF o fotos de tu estado de cuenta y salen todos los movimientos ya clasificados, para
  revisarlos antes de guardar. Los que ya tenías aparecen desmarcados. El archivo **no se guarda**.
- **Sin internet**: puedes seguir capturando; se queda en el dispositivo y se sube solo cuando vuelve la conexión.

### Ver cómo vas
- Los dos números de arriba (**Te queda** y **Gastado**) y una **proyección**: "a este ritmo cierras el periodo con $X".
  Las categorías avisan al 80%, al pasarte y cuando "a este ritmo te pasas".
- **Pregúntale a tus datos**: escribe en la barra "¿cuánto gasté en Rappi en los últimos 3 meses?".
- **Resumen del periodo con IA** (pestaña Análisis): 3 renglones de cómo vas contra el periodo anterior y una sugerencia.
- **Análisis**: ritmo de gasto del periodo, regla 50/30/20 y gasto de los últimos 12 periodos.
- **Etiquetas** (#viaje-cancun, #boda): suman un evento aunque mezcle categorías. En Movimientos ves el total de cada una.

### Organizar
- **Presupuesto por categoría**, con plantillas al empezar (general, estudiante, familia, jubilado).
- **"Te queda" con lo que esperas ganar o solo con lo que ya entró** (para ingresos variables).
- **Pagos recurrentes**: Netflix, renta, sueldo (por quincena) o el seguro anual. Aparecen en el Resumen para
  registrarlos con un clic, y con 📅 los mandas a tu calendario para que te avise un día antes. En la app instalada,
  el ícono muestra cuántos pagos están vencidos.
- **Varias tarjetas de crédito**, cada una con su corte y fecha límite: cuánto llevas en el corte, cuánto pagar y
  cuánto te falta de meses sin intereses.
- **Cuentas con amigos**: gastos compartidos y préstamos ("me debe" / "le debo") por persona, con abonos y un botón
  para mandarle el resumen por WhatsApp.
- **Metas de ahorro** con barra de avance, cuánto apartar al mes o por quincena y botón "+ Abonar". Fondo de emergencia.
- Periodo por **corte de tarjeta** o por **mes calendario**.

### Cuidar tus datos
- **Respaldo en Excel** con un clic, y un recordatorio una vez al mes.
- **Restaurar desde un respaldo**: si algo falla, subes ese Excel y vuelve todo (antes te baja una copia de lo que hay).
- Tema claro y oscuro, **letra grande**, tutorial de 3 pantallas la primera vez y aviso cuando hay versión nueva.

## Cómo se usa

1. Abre la app y entra con tu cuenta de Google (tienes que estar invitado).
2. Elige la plantilla que más se parece a tu vida, o trae tus datos de la versión anterior con hoja de Google.
3. En **Presupuesto** pon cuánto quieres gastar en cada categoría y da de alta tus pagos recurrentes.
4. Registra con **+ Agregar**, escribiendo o dictando en la barra de arriba, o subiendo tu estado de cuenta.
5. Para usar la IA, pega tu propia clave gratis de Gemini en ⚙ Configuración
   ([aistudio.google.com/apikey](https://aistudio.google.com/apikey)). Cada quien usa la suya.

**Instalarla en el celular:** ábrela en Chrome › menú ⋮ › "Agregar a pantalla principal" / "Instalar app".

## Privacidad

- Los datos se guardan en Firebase (Firestore), en la cuenta de cada quien.
- Solo entran los correos invitados, y las reglas de Firestore hacen que cada usuario lea y escriba **solo lo suyo**.
- `config.js` trae los datos de conexión de Firebase. **No son secretos**: lo que protege la información son las
  reglas de Firestore, no esos datos.
- La clave de Gemini es de cada usuario y se guarda en su propia cuenta, nunca en este repositorio.
- Lo que se manda a Gemini (tu texto, tus tickets, y al hacer preguntas un resumen de tus movimientos del último año)
  va directo de tu navegador a Google con tu propia clave.
- Lo que se captura sin internet se guarda temporalmente en el navegador de ese dispositivo hasta que se sube.

## Cómo está hecha

- Un solo `index.html` con HTML, CSS y JavaScript puro, sin frameworks ni proceso de compilación.
- Firebase Authentication (Google) + Cloud Firestore (SDK por CDN), con caché local para abrir sin internet.
- Google Gemini (modelos Flash, plan gratis) para interpretar texto, fotos y PDF, contestar preguntas y resumir.
- SheetJS (por CDN, solo cuando se usa) para el respaldo y la restauración en Excel.
- `sw.js` (service worker) y `manifest.webmanifest` para que se instale como app.
- Hospedada en GitHub Pages.

| Archivo | Para qué |
|---|---|
| `index.html` | La app completa |
| `config.js` | Datos de conexión del proyecto de Firebase |
| `sw.js` | Guarda la app en el celular para que abra rápido |
| `manifest.webmanifest`, `icon-*.png` | Nombre e íconos al instalarla |

## Actualizar

Al subir una versión nueva de `index.html`, cambia también el número de `CACHE` en `sw.js`
(por ejemplo `presupuesto-fb-v4` → `v5`). Quien tenga la app abierta verá el aviso "Hay una versión nueva".
Los datos de los usuarios no se tocan al actualizar.
