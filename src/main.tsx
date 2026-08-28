import { StrictMode } from 'react'
import './i18n'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { captureAffiliateRef } from '@/lib/affiliate'
import { captureAttribution } from '@/lib/attribution'

// Must run before React Router (BrowserRouter) mounts and before the user can
// click anything, so the "?ref=" param is captured before client-side
// navigation strips it from the URL. See src/lib/affiliate.ts for details.
captureAffiliateRef()
captureAttribution()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
