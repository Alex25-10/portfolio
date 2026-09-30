import { chromium } from "playwright"

const BASE = "http://localhost:3100"
const OUT = "../.omo/scripts/evidence"
const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-834", width: 834, height: 1194 },
  { name: "mobile-375", width: 375, height: 667 },
]

async function main() {
  const browser = await chromium.launch({ headless: true })
  const report = []

  for (const v of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height } })
    const page = await ctx.newPage()
    const errors = []
    page.on("pageerror", (e) => errors.push("pageerror: " + String(e).slice(0, 160)))
    page.on("console", (m) => {
      if (m.type() === "error") errors.push("console: " + m.text().slice(0, 160))
    })

    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 })
    await page.waitForTimeout(4000)

    const overflow = await page.evaluate(() => {
      const bad = []
      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.width > window.innerWidth + 1 && r.left < window.innerWidth && r.right > window.innerWidth) {
          const tag = el.tagName.toLowerCase()
          const cls = (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 60)
          bad.push(`${tag}.${cls} w=${Math.round(r.width)}`)
        }
      })
      return { scrollW: document.documentElement.scrollWidth, winW: window.innerWidth, bad: bad.slice(0, 10) }
    })

    await page.screenshot({ path: `${OUT}/audit-${v.name}-full.png`, fullPage: true })
    await page.screenshot({ path: `${OUT}/audit-${v.name}-hero.png` })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
    await page.waitForTimeout(1500)
    await page.screenshot({ path: `${OUT}/audit-${v.name}-mid.png` })

    report.push({ viewport: v.name, errors, overflow })
    await ctx.close()
  }

  await browser.close()
  console.log(JSON.stringify(report, null, 2))
}

main()
