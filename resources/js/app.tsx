import './bootstrap'
import '../css/app.css'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ThemeProvider } from '@mui/material/styles'
import { defaultTheme } from './themes/default-theme'
import { CssBaseline } from '@mui/material'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: async (name) => await resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup ({ el, App, props }) {
    const root = createRoot(el)
    root.render(
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <App {...props} />
      </ThemeProvider>
    )
  },
  progress: {
    color: '#4B5563'
  }
})
