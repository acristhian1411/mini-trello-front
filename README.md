# Proyecto React

Este es un proyecto desarrollado con React y Vite. Incluye un sistema de scaffolding para generar rápidamente páginas con archivos base como `Index.jsx`, `Form.jsx`, y `Show.jsx`.

## 🧱 Requisitos

- [Node.js](https://nodejs.org/) >= 16.x
- [pnpm](https://pnpm.io/) recomendado (aunque también funciona con npm o yarn)

---

## 🚀 Instalación

1. Cloná el repositorio:

```bash
git clone https://github.com/usuario/mi-proyecto-react.git
cd mi-proyecto-react
```

2. Instalá las dependencias:

```bash
pnpm install
```

3. Inicia el servidor de desarrollo:

```bash
pnpm dev
```

## 🛠️ Uso del Scaffolding
Este proyecto incluye un comando personalizado para generar carpetas de páginas con archivos base.

### 📦 Crear una nueva sección con Scaffold

```bash
pnpm make NombreDeLaSeccion [--form] [--show] c=[campo1,campo2,campo3]
```
### 📌 Parámetros

`NombreDeLaSeccion`: (obligatorio) nombre de la carpeta y componente base (se generará en src/pages/).

`--form`: (opcional) crea un archivo Form.jsx con un formulario basado en los campos.

`--show`: (opcional) crea un archivo Show.jsx.

`--fields`: (Obigatorio) lista separada por comas de los campos a incluir en el formulario (name,description,email, etc.).

### 📝 Ejemplo

```bash
pnpm make Projects --form --show c=name,description,email
```

Esto genera una carpeta src/pages/Projects con los archivos:

* `Index.jsx`

* `Form.jsx` (basado en los campos especificados)

* `Show.jsx` (actualmente no esta generando nada)

También agrega automáticamente la nueva ruta al archivo de rutas (`src/Routes.jsx`) y al menú lateral (`src/Utils/SidebarRoutes.js`).

---

## 🧹 Scripts disponibles
* `pnpm dev`: inicia el servidor de desarrollo

* `pnpm build`: genera una versión optimizada del proyecto

* `pnpm preview`: previsualiza el build

* `pnpm scaffold`: ejecuta el generador de secciones

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Puedes ver el archivo [LICENSE](LICENSE) para más detalles.
