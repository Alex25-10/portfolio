import { chromium } from "playwright"
import sharp from "sharp"
import path from "path"
import fs from "fs"

const SITES = [
  { name: "Peluqueria", url: "https://peluqueria-cordoba.vercel.app" },
  { name: "Dentista", url: "https://dental-cordoba.vercel.app" },
  { name: "Restaurante", url: "https://restaurante-cordoba.vercel.app" },
  { name: "Plomero", url: "https://plomero-urgencia.vercel.app" },
  { name: "Psicologo", url: "https://psicologo-cordoba.vercel.app" },
  { name: "Gimnasio", url: "https://gimnasio-cordoba.vercel.app" },
  { name: "Veterinaria", url: "https://veterinaria-cordoba.vercel.app" },
  { name: "Begin-Again", url: "https://beginagainbydrasusana.com" },
]

const OUT_DIR = path.resolve("public/proyectos")

async function main() {
  const browser = await chromium.launch({ headless: true })

  for (const site of SITES) {
    console.log(`\n📸 ${site.name}...`)
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()

    try {
      await page.goto(site.url, { waitUntil: "networkidle", timeout: 30000 })
      await page.waitForTimeout(2000)

      const pngPath = path.join(OUT_DIR, `${site.name}.png`)
      await page.screenshot({
        path: pngPath,
        fullPage: true,
        type: "png",
      })

      const metadata = await sharp(pngPath).metadata()

      let pipeline = sharp(pngPath)

      const MAX_DIM = 8000
      if (metadata.width && metadata.width > MAX_DIM) {
        pipeline = pipeline.resize({ width: MAX_DIM })
      }
      if (metadata.height && metadata.height > MAX_DIM) {
        pipeline = pipeline.resize({ height: MAX_DIM })
      }

      await pipeline
        .webp({ quality: 85 })
        .toFile(path.join(OUT_DIR, `${site.name}.webp`))

      fs.unlinkSync(pngPath)
      const stats = fs.statSync(path.join(OUT_DIR, `${site.name}.webp`))
      console.log(`  ✅ ${site.name}.webp (${(stats.size / 1024).toFixed(0)} KB)`)
    } catch (err) {
      console.error(`  ❌ ${site.name}: ${err}`)
    }

    await context.close()
  }

  await browser.close()
  console.log("\n✨ All done!")
}

main()
