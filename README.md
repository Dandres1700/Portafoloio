# Portafolio · Diego Zurita

Portafolio personal hecho con **Vite + TypeScript** (sin frameworks), estilo terminal y bilingüe (ES / EN).

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Editar contenido

Todo el texto vive en [`src/data.ts`](src/data.ts):

- `profile`: nombre, correo, GitHub y rutas de la foto y el CV
- `projects`: tarjetas de proyectos (agrega `demo: 'https://...'` si el proyecto tiene enlace en vivo)
- `content.es` / `content.en`: textos en español e inglés

Las imágenes y el CV están en `public/assets/`.

> `public/assets/CV_Diego_Zurita.pdf` es una **copia pública** del CV sin cédula ni teléfonos de referencias.
> Si actualizas tu CV, vuelve a quitar esos datos antes de reemplazar el archivo.

## Publicar en Vercel

1. Sube el proyecto a un repositorio de GitHub:
   ```bash
   git init
   git add .
   git commit -m "Portafolio inicial"
   git branch -M main
   git remote add origin https://github.com/Dandres1700/portafolio.git
   git push -u origin main
   ```
2. Entra a https://vercel.com, inicia sesión con GitHub y pulsa **Add New → Project**.
3. Importa el repositorio `portafolio`. Vercel detecta Vite automáticamente
   (Build: `npm run build`, Output: `dist`). Pulsa **Deploy**.
4. Cada `git push` a `main` vuelve a publicar el sitio automáticamente.

En Netlify el proceso es igual: **Add new site → Import from Git**, build `npm run build`, carpeta `dist`.
