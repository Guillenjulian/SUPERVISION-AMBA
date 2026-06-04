# Supervisión AMBA · SeGuVIP

Formulario móvil para supervisores en sucursales (Grupo Plus).

## Estructura

```
src/
├── App.tsx                 # Punto de entrada
├── pages/
│   └── SupervisionPage.tsx # Orquesta formulario + envío
├── components/
│   ├── layout/             # Header, layout principal
│   ├── ui/                 # Botones, campos, secciones
│   ├── form/               # Secciones del formulario
│   └── feedback/           # Errores, éxito, submit
├── hooks/
│   ├── useSupervisionForm.ts
│   └── useSupervisionSubmit.ts
├── types/
│   └── supervision.ts
├── constants.ts
├── services/
│   └── web3forms.ts
├── utils/
│   ├── datetime.ts
│   └── buildMessage.ts
└── styles/
    └── theme.ts
```

## Logo / icono superior

Colocá tu imagen en la carpeta `public/`:

- `public/logo.png` (recomendado, cuadrado)
- o `public/logo.svg`

Hay un `logo.svg` de ejemplo. Para usar el tuyo, reemplazá ese archivo o agregá `logo.png`.

## Desarrollo

```bash
cp .env.example .env   # VITE_WEB3FORMS_KEY=...
npm run dev:supervision
```

Puerto: http://localhost:5176
