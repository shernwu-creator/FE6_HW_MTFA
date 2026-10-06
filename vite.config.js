import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { copyFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import process from 'node:process'

function spa404Fallback() {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const distDir = resolve(fileURLToPath(new URL('.', import.meta.url)), 'dist')
      const indexHtml = resolve(distDir, 'index.html')
      const notFoundHtml = resolve(distDir, '404.html')
      if (existsSync(indexHtml)) copyFileSync(indexHtml, notFoundHtml)
    },
  }
}

export default defineConfig({
  plugins: [react(), spa404Fallback()],
  base: process.env.NETLIFY ? '/' : '/FE6_HW_MTFA/',
})
