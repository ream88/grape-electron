// eslint-disable-next-line import/no-extraneous-dependencies
import { app } from 'electron'
import Store from 'electron-store'
import path from 'path'
import fs from 'fs'

/* eslint-disable import/no-cycle */
import { isDevelopment } from '../utils'
import env from '../env'
/* eslint-enable import/no-cycle */

let data = {}

const filePath = isDevelopment
  ? path.join(app.getPath('userData'), '../Grape Dev')
  : app.getPath('userData')

if (!fs.existsSync(path.join(filePath, 'graperc.json'))) data = env

const schema = {
  name: {
    type: 'string',
  },
  host: {
    cloudProtocol: {
      type: 'string',
    },
    onPremisesProtocol: {
      type: 'string',
    },
    cloudDomain: {
      type: 'string',
      format: 'hostname',
    },
    onPremisesDomain: {
      type: 'string',
      format: 'hostname',
    },
    path: {
      type: 'string',
    },
  },
  currentDomainType: {
    type: 'string',
  },
  lastUrl: {
    type: 'string',
  },
}

const store = new Store({
  name: 'graperc',
  cwd: filePath,
  schema,
  migrations: {
    '3.0.0-alpha.14': s => {
      s.delete('host.type')
    },
  },
})

store.onDidAnyChange(() => {
  global.store = store.get()
})

if (Object.keys(data)) store.set(data)

export default store
