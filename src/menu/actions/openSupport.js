// eslint-disable-next-line import/no-extraneous-dependencies
import { shell } from 'electron'

export default () => {
  shell.openExternal('https://support.chatgrape.com')
}
