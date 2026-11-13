# Mi Presupuesto

App web para llevar gastos, ingresos y presupuesto, pensada para usarse desde el celular.
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
- **Fecha con ‹ ›**: cambias de día con un toque, y la app recuerda la última fecha que usaste por unos minutos
  (para capturar varios gastos del mismo día).
- **"Ponte al día"**: si llevas 2 días o más sin anotar, aparece un aviso que abre la captura en el primer día que falta.
- **Captura con IA (Gemini)**: escribe o dicta "hoy gasté 500 en comida y 200 de Uber" y los separa solos.
- **📷 Ticket**: desde el botón "+ Agregar", toma la foto de un ticket y se captura solo.
- **Estado de cuenta**: sube el PDF o fotos de tu estado de cuenta y salen todos los movimientos ya clasificados, para
  revisarlos antes de guardar. Los que ya tenías aparecen desmarcados. El archivo **no se guarda**.
- **Sin internet**: puedes seguir capturando; se queda en el dispositivo y se sube solo cuando vuelve la conexión.

### Ver cómo vas
- Los dos números de arriba (**Te queda** y **Gastado**) y una **proyección**: "a este ritmo cierras el periodo con $X".
  Las categorías avisan al 80%, al pasarte y cuando "a este ritmo te pasas".
- **Ingresos que faltan**: debajo de "Te queda" ves "Ingresos $15,000 de $30,000 · falta Quincena 15 oct". Un toque
  en la quincena que falta la registra (puedes cambiar el monto si llegó distinto).
- **Tu semana**: cuánto puedes gastar al día hasta el corte, barras de lunes a domingo con tu gasto del día a día, y los
  pagos de los próximos 7 días (recurrentes y tarjeta).
- **Pregúntale a tus datos**: escribe en la barra "¿cuánto gasté en Rappi en los últimos 3 meses?".
- **Análisis**:
  - **Resumen del periodo con IA**: 3 renglones de cómo vas contra el periodo anterior y una sugerencia.
  - **¿En qué se te va?**: tus gastos agrupados por lugar o concepto ("OXXO", "Uber"…), aunque los hayas escrito distinto.
  - **Gastos hormiga**: lo chiquito (hasta $200) que se repite 3 veces o más y cuánto suma.
  - **Unir nombres**: si anotaste "OXXO Juárez" y "Oxxo", los unes para que cuenten como uno (a mano o con sugerencias de la IA).
  - Ritmo de gasto del periodo, regla 50/30/20 y gasto de los últimos 12 periodos.
- **Etiquetas** (#viaje-cancun, #boda): suman un evento aunque mezcle categorías. En Movimientos ves el total de cada una.

### Organizar
- **✨ Armar mi presupuesto** (pestaña Presupuesto): pones cuánto te pagan (por quincena o al mes) y te sugiere cuánto
  darle a cada categoría:
  1. Los **pagos fijos** (renta, Netflix) tal cual.
  2. Lo que **de verdad gastas** (promedio de los últimos 3 periodos).
  3. Un **estimado típico** para las categorías sin historial.
  4. Todo ajustado a tu regla **50/30/20**. Lo que gastas en necesidades no se recorta; si se pasa del 50%, te avisa
     y se le quita a gustos. El ahorro va primero a tus metas (según su fecha) y lo que sobra, al fondo de emergencia.

  Cada monto se puede cambiar o desmarcar antes de usarlo, y "Usar estos" se puede deshacer. Vuelve a correrlo cuando
  quieras para ajustar.
- **Presupuesto por categoría**, con plantillas al empezar (general, estudiante, familia, jubilado).
- **Ingreso esperado**: sale del presupuesto de tu categoría de ingreso o de tus cobros recurrentes (ej. una quincena
  de $15,000 = $30,000 al mes), lo que sea mayor. "Te queda" se calcula con lo que esperas ganar o solo con lo que ya
  entró (para ingresos variables).
- **Pagos recurrentes**: Netflix, renta, sueldo (semanal o por quincena) o el seguro anual. En el Resumen salen
  cuando faltan 3 días o menos (o si ya se pasó la fecha) para registrarlos con un toque; lo que viene después queda
  en "Próximos" y lo ya registrado en "Registrados". Un sueldo semanal cuenta como 4 pagos al mes en el presupuesto.
  Al capturar un movimiento, "¿Se repite?" lo convierte en pago recurrente, y con 📅 los mandas a tu calendario para que te avise un día antes. En la app instalada,
  el ícono muestra cuántos pagos están vencidos.
- **Tarjetas de crédito** (una o varias), cada una con su **día de corte** y su **día límite de pago** (el que dice tu
  estado de cuenta). Para cada corte ves:
  - cuánto llevas o cuánto debes pagar, y la fecha límite con los días que faltan;
  - **qué quincenas lo cubren**: lo que gastas del 13 de octubre al 12 de noviembre se cubre con las quincenas del
    15 y 31 de octubre, y te dice cuánto sale de cada una;
  - cuánto te falta de meses sin intereses.
- **Cuentas con amigos**: gastos compartidos y préstamos ("me debe" / "le debo") por persona, con abonos y un botón
  para mandarle el resumen por WhatsApp.
- **Metas de ahorro** con barra de avance, cuánto apartar al mes o por quincena y botón "+ Abonar". Fondo de emergencia.
- Periodo por **corte de tarjeta** o por **mes calendario**.

### Recordatorios
- En ⚙ Configuración agregas a tu calendario un aviso **cada noche** ("anota lo que gastaste hoy") y otro **los
  domingos** ("revisa cómo vas"). Al tocar el aviso se abre la app directo en la captura o en tu semana.
  En iPhone se descarga un archivo .ics; en Android y compu se abre Google Calendar.

### Cuidar tus datos
- **Respaldo en Excel** con un clic, y un recordatorio una vez al mes.
- **Restaurar desde un respaldo**: si algo falla, subes ese Excel y vuelve todo (antes te baja una copia de lo que hay).
- Tema claro y oscuro, **letra grande**, animaciones suaves (se apagan si tu dispositivo pide "reducir movimiento"),
  tutorial de 3 pantallas la primera vez y aviso cuando hay versión nueva.

## Cómo se usa

1. Abre la app y entra con tu cuenta de Google (tienes que estar invitado).
2. Elige la plantilla que más se parece a tu vida, o trae tus datos de la versión anterior con hoja de Google.
3. En **⚙ Configuración** pon el día de corte y el día límite de pago de tu tarjeta.
4. En **Presupuesto** da de alta tus pagos recurrentes (incluida tu quincena como ingreso) y usa
   **✨ Armar mi presupuesto** para repartir tu sueldo entre las categorías.
5. Registra con **+ Agregar**, escribiendo o dictando en la barra de arriba, o subiendo tu estado de cuenta.
6. Para usar la IA, pega tu propia clave gratis de Gemini en ⚙ Configuración
   ([aistudio.google.com/apikey](https://aistudio.google.com/apikey)). Cada quien usa la suya.

**Instalarla en el celular:**
- Android: ábrela en Chrome › menú ⋮ › "Agregar a pantalla principal" / "Instalar app".
- iPhone: ábrela en Safari › botón Compartir › "Agregar a pantalla de inicio".

Si te pasan el link por WhatsApp, Instagram o Facebook, ábrelo en Safari o Chrome: dentro de esas apps Google no
deja entrar (sale "The requested action is invalid"). En iPhone y Safari se entra con el botón oficial de Google.

## Privacidad

- Los datos se guardan en Firebase (Firestore), en la cuenta de cada quien.
- Solo entran los correos invitados, y las reglas de Firestore hacen que cada usuario lea y escriba **solo lo suyo**.
- `config.js` trae los datos de conexión de Firebase. **No son secretos**: lo que protege la información son las
  reglas de Firestore, no esos datos.
- La clave de Gemini es de cada usuario y se guarda en su propia cuenta, nunca en este repositorio.
- Lo que se manda a Gemini va directo de tu navegador a Google con tu propia clave: tu texto, tus tickets y estados de
  cuenta, al hacer preguntas un resumen de tus movimientos del último año, y al "Unir nombres" los nombres de tus
  gastos de los últimos 6 meses. **Armar mi presupuesto no usa IA**: se calcula en tu dispositivo.
- Lo que se captura sin internet se guarda temporalmente en el navegador de ese dispositivo hasta que se sube.

## Cómo está hecha

- Un solo `index.html` con HTML, CSS y JavaScript puro, sin frameworks ni proceso de compilación.
- Firebase Authentication (Google) + Cloud Firestore (SDK por CDN), con caché local para abrir sin internet.
  En iPhone/Safari el inicio de sesión usa Google Identity Services.
- Google Gemini (modelos Flash, plan gratis) para interpretar texto, fotos y PDF, contestar preguntas, resumir y
  sugerir nombres para unir.
- SheetJS (por CDN, solo cuando se usa) para el respaldo y la restauración en Excel.
- `sw.js` (service worker) y `manifest.webmanifest` para que se instale como app.
- Hospedada en GitHub Pages.

| Archivo | Para qué |
|---|---|
| `index.html` | La app completa |
| `config.js` | Datos de conexión del proyecto de Firebase |
| `sw.js` | Guarda la app en el celular para que abra rápido |
| `manifest.webmanifest`, `icon-*.png` | Nombre e íconos al instalarla |

### Datos que guarda (una "hoja" por tema, igual que el respaldo en Excel)

| Hoja | Qué tiene |
|---|---|
| Movimientos | Cada gasto o ingreso: fecha, categoría, monto, método, tarjeta, MSI, compartido, etiquetas, recurrente |
| Categorías | Nombre, tipo, grupo (Necesidad / Gusto / Ahorro / Ingreso), presupuesto mensual o anual |
| Recurrentes | Pagos y cobros que se repiten (cada semana, quincena, mes o año; en semanal, Día = 1 lunes … 7 domingo) |
| Tarjetas | Nombre, día de corte, día límite de pago (y "días para pagar" aproximado, para versiones anteriores) |
| Metas | Metas de ahorro con objetivo y fecha |
| Deudas | Préstamos con amigos y abonos |
| Alias | Nombres unidos ("OXXO Juárez" → "Oxxo") |
| Config | Modo, corte, regla 50/30/20, roomies, etc. |

## Actualizar

Al subir una versión nueva de `index.html`, cambia también el número de `CACHE` en `sw.js`
(por ejemplo `presupuesto-fb-v9` → `v10`). Quien tenga la app abierta verá el aviso "Hay una versión nueva".
Los datos de los usuarios no se tocan al actualizar. Las tarjetas guardadas con "días para pagar" (versión 8 o
anterior) se convierten solas a "día límite" al abrir la versión 9.
