import sharp from "sharp"
import { readdirSync, existsSync, rmSync } from "fs"
import { join, parse } from "path"
import { fileURLToPath } from "url"

const PUBLIC = join(fileURLToPath(new URL("..", import.meta.url)), "public")
const dirs = ["proyectos", "screenshots"]
let totalSavings = 0

for (const dir of dirs) {
  const fullDir = join(PUBLIC, dir)
  if (!existsSync(fullDir)) continue
  const files = readdirSync(fullDir).filter(f => f.toLowerCase().endsWith(".png"))

  if (files.length === 0) {
    console.log(`${dir}: no PNGs found`)
    continue
  }

  console.log(`\n${dir}/:`)
  for (const file of files) {
    const input = join(fullDir, file)
    const outputName = parse(file).name + ".webp"
    const output = join(fullDir, outputName)

    try {
      const img = sharp(input)
      const meta = await img.metadata()
      const inSize = meta.size || 0
      const resize = meta.width && meta.width > 1920 ? { width: 1920 } : {}
      await img.resize(resize).webp({ quality: 82, effort: 4 }).toFile(output)
      const outMeta = await sharp(output).metadata()
      const outSize = outMeta.size || 0
      const inKB = (inSize / 1024).toFixed(0)
      const outKB = (outSize / 1024).toFixed(0)
      const saved = inSize > 0 ? ((1 - outSize / inSize) * 100).toFixed(0) : "?"
      totalSavings += inSize - outSize
      console.log(`  ${file} (${inKB}KB) -> ${outputName} (${outKB}KB, -${saved}%)`)
      rmSync(input)
    } catch (err) {
      console.error(`  FAILED: ${file} - ${err.message}`)
    }
  }
}

const totalMB = (totalSavings / 1024 / 1024).toFixed(1)
console.log(`\nTotal saved: ${totalMB}MB`)
console.log("Done!")
