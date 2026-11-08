/**
 * Gera screenshots de página inteira em larguras-chave (320 → 1440).
 *
 * Uso:
 *   1. npm run dev -- --host 127.0.0.1 --port 5173
 *   2. node scripts/visual-check.mjs
 *
 * As imagens são salvas em %TEMP%/opencode/portfolio-shots.
 * O script rola a página até o fim antes de capturar, para que as
 * animações de reveal (IntersectionObserver) sejam disparadas.
 */
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { chromium } from 'playwright'

const BASE_URL = process.env.VISUAL_CHECK_URL ?? 'http://127.0.0.1:5173/'
const OUTPUT_DIR =
  process.env.VISUAL_CHECK_OUT ?? join(tmpdir(), 'opencode', 'portfolio-shots')

const viewports = [
  { name: 'mobile-320', width: 320, height: 800 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 900 },
  { name: 'desktop-1440', width: 1440, height: 1000 },
]

const pages = [
  { name: 'home', path: '/' },
  { name: 'projeto-01', path: '/projects/projeto-01' },
]

async function revealAll(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7)
    const total = document.documentElement.scrollHeight

    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 120))
    }

    window.scrollTo(0, total)
    await new Promise((resolve) => setTimeout(resolve, 400))
    window.scrollTo(0, 0)
    await new Promise((resolve) => setTimeout(resolve, 300))
  })
}

await mkdir(OUTPUT_DIR, { recursive: true })

const browser = await chromium.launch()

for (const target of pages) {
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    })

    await page.goto(`${BASE_URL.replace(/\/$/, '')}${target.path}`, {
      waitUntil: 'networkidle',
    })
    await revealAll(page)

    const file = join(OUTPUT_DIR, `${target.name}-${viewport.name}.png`)
    await page.screenshot({ path: file, fullPage: true })
    console.log(file)

    await page.close()
  }
}

await browser.close()
