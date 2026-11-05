# Mi Presupuesto

App web para llevar gastos, ingresos y presupuesto mensual, pensada para usarse desde el celular.
Se instala como app (PWA), se entra con la cuenta de Google y cada persona ve solo sus propios datos.

## Qué hace

- **Captura rápida**: monto, en qué y categoría. Fecha, método de pago, meses sin intereses, gasto compartido
  y periodo del recibo quedan escondidos en "Cambiar" para cuando hacen falta.
- **Captura con IA (Gemini)**: escribe o dicta "hoy gasté 500 en comida y 200 de Uber" y los separa solos.
- **Estado de cuenta**: sube el PDF o fotos de tu estado de cuenta (o un ticket) y salen todos los movimientos,
  ya clasificados, para revisarlos antes de guardar. Los que ya habías registrado aparecen desmarcados.
  El archivo solo se manda a Gemini para leerlo; **no se guarda**.
- **Pagos recurrentes**: Netflix, renta, gimnasio, sueldo (por quincena) o el seguro anual. Cada periodo aparecen
  en el Resumen para registrarlos con un clic, y los pagos anuales avisan un periodo antes.
- **Presupuesto por categoría** con barras de avance, alertas al 80% y al pasarte.
- **Tarjeta de crédito**: total por corte, fecha límite de pago y compras a meses sin intereses.
- **Gastos compartidos**: lo que te deben los roomies y botón "Ya me pagó".
- **Metas de ahorro** y fondo de emergencia.
- **Análisis**: ritmo de gasto del periodo, regla 50/30/20 y gasto de los últimos 12 periodos.
- Periodo por **corte de tarjeta** o por **mes calendario**.
- Tema claro y oscuro, funciona en compu y celular, y se puede descargar todo en Excel.

## Cómo se usa

1. Abre la app y entra con tu cuenta de Google (tienes que estar invitado).
2. Empieza desde cero o trae tus datos de la versión anterior con hoja de Google.
3. En **Presupuesto** pon cuánto quieres gastar en cada categoría y da de alta tus pagos recurrentes.
4. Registra con el botón **+ Agregar**, escribiendo o dictando en la barra de arriba, o subiendo tu estado de cuenta.
5. Para usar la IA, pega tu propia clave gratis de Gemini en ⚙ Configuración
   ([aistudio.google.com/apikey](https://aistudio.google.com/apikey)). Cada quien usa la suya.

**Instalarla en el celular:** ábrela en Chrome › menú ⋮ › "Agregar a pantalla principal" / "Instalar app".

## Privacidad

- Los datos se guardan en Firebase (Firestore), en la cuenta de cada quien.
- Solo entran los correos invitados, y las reglas de Firestore hacen que cada usuario lea y escriba **solo lo suyo**.
- `config.js` trae los datos de conexión de Firebase. **No son secretos**: lo que protege la información son las
  reglas de Firestore, no esos datos.
- La clave de Gemini es de cada usuario y se guarda en su propia cuenta, nunca en este repositorio.

## Cómo está hecha

- Un solo `index.html` con HTML, CSS y JavaScript puro, sin frameworks ni proceso de compilación.
- Firebase Authentication (Google) + Cloud Firestore (SDK por CDN), con caché local para abrir sin internet.
- Google Gemini (modelos Flash, plan gratis) para interpretar texto, fotos y PDF.
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
(por ejemplo `presupuesto-fb-v3` → `v4`) para que los celulares descarguen la versión nueva.
Los datos de los usuarios no se tocan al actualizar.
