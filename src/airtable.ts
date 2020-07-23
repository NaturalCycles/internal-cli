import { AirtableDB } from '@naturalcycles/airtable-lib'
import { CommonDao } from '@naturalcycles/db-lib'
import { requireEnvKeys } from '@naturalcycles/nodejs-lib'

require('dotenv').config()

const { AIRTABLE_KEY } = requireEnvKeys('AIRTABLE_KEY')

interface Translation {
  id: string
  ready?: boolean
  'en-US': string
  'en-GB'?: string
  // ...
}

const airtableDB = new AirtableDB({
  apiKey: AIRTABLE_KEY,
})

export const airtableDao = new CommonDao<Translation>({
  db: airtableDB,
  table: 'zzzzzzz.zzzzzzz',
})
