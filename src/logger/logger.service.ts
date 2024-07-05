import { ConsoleLogger, Injectable } from '@nestjs/common'
import { existsSync } from 'fs'
import { mkdir, appendFile } from 'fs/promises'
import { join } from 'path'

@Injectable()
export class LoggerService extends ConsoleLogger {
  async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Chicago',
    }).format(new Date())}\t${entry}\n`

    try {
      if (!existsSync(join(__dirname, '..', '..', 'logs')))
        await mkdir(join(__dirname, '..', '..', 'logs'))

      await appendFile(
        join(__dirname, '..', '..', 'logs', 'logFile.log'),
        formattedEntry,
      )
    } catch (err) {
      if (err instanceof Error) console.error(err.message)
    }
  }

  log(message: any, context?: string): void {
    const entry = `${context}\t${message}`
    this.logToFile(entry)
    super.log(message, context)
  }

  error(message: any, stackOrContext?: string): void {
    const entry = `${stackOrContext}\t${message}`
    this.logToFile(entry)
    super.error(message, stackOrContext)
  }
}
