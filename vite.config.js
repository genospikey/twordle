import { defineConfig } from 'vite'
import { ghPages } from "vite-plugin-gh-pages"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://genospikey.github.io/twordle/',
  plugins: [vue(), ghPages()],
})
