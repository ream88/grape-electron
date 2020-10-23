// eslint-disable-next-line import/no-extraneous-dependencies
import { dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

import state from '../../state'

export default () => {
  autoUpdater.on('error', error => {
    state.isUpdateDownloading = false

    dialog.showErrorBox(
      'Error: ',
      error == null ? 'unknown' : (error.stack || error).toString(),
    )
  })
}
