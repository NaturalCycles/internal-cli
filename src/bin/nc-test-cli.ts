#!/usr/bin/env node

import { runScript } from '@naturalcycles/nodejs-lib/dist/script'
import * as inquirer from 'inquirer'

const BASES = {
  COUNTRIES: 'applVrIQSYcnBG8tZ',
  LALALA: 'lalala',
}

runScript(async () => {
  // console.log('Good morning, Cyclers!')

  const answers = await inquirer.prompt([
    {
      name: 'question1',
      // input: 'question1',
    },
    {
      name: 'Airtable BASE',
      type: 'list',
      choices: Object.keys(BASES),
    },

    // Q of key
    // Q of en-US copy
  ])

  console.log({answers})

  // validation
  // use airrable-lib to insert a row
})
