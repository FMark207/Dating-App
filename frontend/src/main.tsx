import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ProfileEditor from './components/ProfileEditor.tsx'

createRoot(document.getElementById('root')!).render(
  <ProfileEditor/>
)
