#!/usr/bin/env node

import { _by } from '@naturalcycles/js-lib'
import { Debug } from '@naturalcycles/nodejs-lib'
import { runScript } from '@naturalcycles/nodejs-lib/dist/script'
import * as inquirer from 'inquirer'
import { airtableDao } from '../airtable'

interface Answers {
  baseName: string
  key: string
  copy: string
}

const BASES = {
  COUNTRIES: 'applVrIQSYcnBG8tZ',
  NCAPP3_GUIDE: 'appuwKmQewOasMnmm',
}

const log = Debug('nc-cli')

runScript(async () => {
  log('hello')
  // console.log('Good morning, Cyclers!')

  const answers = await inquirer.prompt<Answers>([
    // {
    //   name: 'question1',
    //   // input: 'question1',
    // },
    {
      name: 'baseName',
      type: 'list',
      choices: Object.keys(BASES),
    },
    {
      name: 'key',
      // input: 'question1',
    },
    {
      name: 'copy',
      // input: 'question1',
    },
    // validation after each question
  ])

  log({ answers })

  const baseId = BASES[answers.baseName]

  // await airtableDB.ping()
  const table = [baseId, `Translations`].join('.')

  const rows = await airtableDao.query(table).select(['id', 'en-US']).runQuery()
  const rowsById = _by(rows, r => r.id)

  if (rowsById[answers.key]) {
    log(`Key already exists! skipping`)
    return
  }

  await airtableDao.saveBatch(
    [
      {
        id: answers.key,
        'en-US': answers.copy,
      },
    ],
    {
      table,
    },
  )

  // how to auth nicely when you consume it as a cli
  // validation
})
