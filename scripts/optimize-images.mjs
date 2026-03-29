import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import { join, basename, extname } from 'node:path'

const SOURCE_DIR = new URL('../images-src/', import.meta.url).pathname
const OUTPUT_DIR = new URL('../public/images/', import.meta.url).pathname

const TARGETS = {
  'Pharelo-Logo.png': { width: 128, height: 128 },
  'Pharelo-Hero-1.png': { width: 640 },
  'hero-person-sitting.png': { width: 1920 },
  'waiting-room.png': { width: 1920 },
  'walking-out.png': { width: 1920 },
  'chronic-condition.png': { width: 400 },
  'caring-for-parent.png': { width: 400 },
  'big-appointment.png': { width: 400 },
}

async function optimize() {
  const files = await readdir(SOURCE_DIR).catch(() => null)
  if (!files) {
    console.log('images-src/ not found, skipping optimization (WebP files already committed).')
    return
  }
  const pngs = files.filter((f) => extname(f).toLowerCase() === '.png')

  for (const file of pngs) {
    const target = TARGETS[file]
    if (!target) continue

    const inputPath = join(SOURCE_DIR, file)
    const outputPath = join(OUTPUT_DIR, basename(file, '.png') + '.webp')

    const info = await stat(inputPath)
    const outStat = await stat(outputPath).catch(() => null)

    // Skip if WebP already exists and is newer than source
    if (outStat && outStat.mtimeMs >= info.mtimeMs) {
      console.log(`  skip ${file} (up to date)`)
      continue
    }

    let pipeline = sharp(inputPath)

    if (target.width && target.height) {
      pipeline = pipeline.resize(target.width, target.height, { fit: 'cover' })
    } else if (target.width) {
      pipeline = pipeline.resize(target.width, undefined, {
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    await pipeline.webp({ quality: 80 }).toFile(outputPath)

    const outInfo = await stat(outputPath)
    const savings = ((1 - outInfo.size / info.size) * 100).toFixed(0)
    console.log(
      `  ${file} → ${basename(outputPath)} (${(outInfo.size / 1024).toFixed(0)} KB, -${savings}%)`
    )
  }

  console.log('Image optimization complete.')
}

optimize().catch((err) => {
  console.error('Image optimization failed:', err)
  process.exit(1)
})
