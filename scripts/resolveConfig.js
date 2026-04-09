// @ts-check
import { resolve } from 'node:path'
import { mkdir, writeFile } from 'node:fs/promises'
import resolveTailwindConfig from 'tailwindcss/resolveConfig.js'

const currentDir = process.cwd()
const STYLEGUIDE_FOLDER_PATH = `${currentDir}/docs/dist`

/**
 * @returns {Promise<string>}
 */
export const generateConfigContent = async () => {
  const tailwindConfig = await import('../tailwind.config.ts')
  const { theme } = resolveTailwindConfig(tailwindConfig.default)

  return JSON.stringify(theme, null, 2)
}

/**
 * @param {string} content
 */
export const saveFile = async (content) => {
  try {
    await mkdir(resolve(STYLEGUIDE_FOLDER_PATH), { recursive: true })
  } catch (error) {
    console.log(error)
    process.exit(-1)
  }

  await writeFile(resolve(STYLEGUIDE_FOLDER_PATH, 'theme.config.json'), content)
}

const resolveConfig = async () => {
  const config = await generateConfigContent()
  await saveFile(config)
  console.log('config is created')
}

resolveConfig()
  .then(() => {
    process.on('exit', (code) => {
      if (code === 0) {
        console.log('Process finished with exit code 0')
      }
    })
  })
  .catch((error) => {
    console.log(error)
    process.exit(-1)
  })
