import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const WIDTH = 1200
const HEIGHT = 630
const BG = '#F7F3EC'
const LOGO_HEIGHT = 400

// Render the SVG logo at high resolution then resize
const logo = await sharp(path.join(root, 'public/images/Pharelo.svg'), { density: 300 })
  .resize({ height: LOGO_HEIGHT, fit: 'inside' })
  .png()
  .toBuffer()

const logoMeta = await sharp(logo).metadata()
const logoW = logoMeta.width
const logoH = logoMeta.height

const logoCy = HEIGHT / 2 - 50

// Text overlay as SVG
const svgText = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <text
    x="${WIDTH / 2}"
    y="${logoCy + logoH / 2 + 10}"
    text-anchor="middle"
    font-family="'DM Serif Display', Georgia, serif"
    font-size="40"
    fill="#1C1917"
    letter-spacing="-0.5"
  >Walk in prepared. Walk out clear.</text>
  <text
    x="${WIDTH / 2}"
    y="${logoCy + logoH / 2 + 55}"
    text-anchor="middle"
    font-family="'Inter', 'Helvetica Neue', Arial, sans-serif"
    font-size="20"
    fill="#78716C"
  >Prepare for appointments. Capture every detail. Understand everything after.</text>
</svg>`

const output = await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: BG,
  },
})
  .composite([
    {
      input: logo,
      top: Math.round(logoCy - logoH / 2),
      left: Math.round(WIDTH / 2 - logoW / 2),
    },
    {
      input: Buffer.from(svgText),
      top: 0,
      left: 0,
    },
  ])
  .png()
  .toFile(path.join(root, 'public/images/og-image.png'))

console.log(`Generated og-image.png (${output.width}x${output.height}, ${(output.size / 1024).toFixed(1)}KB)`)
