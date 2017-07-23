const midi = require(`midi`)

const statusCodes = {
  144: `noteOn`,
  128: `noteOff`,
  224: `pitchBend`,
  176: `cc`,
  208: `channelPressure`,
  248: `clock`,
  250: `start`,
  252: `stop`,
  251: `continue`,
  242: `songPosition`
}

const statusTypes = Object.keys(statusCodes).reduce((acc, code) => {
  acc[statusCodes[code]] = code
  return acc
}, {})

const codeToType = code => statusCodes[code]
const typeToCode = type => statusTypes[type]

const _is = statusType => status => {
  const n = statusTypes[statusType]
  return status >= n && status < n + 16
}

const isControlChange = _is(`cc`)
const isNoteOn = _is(`noteOn`)
const isNoteOff = _is(`noteOff`)

const mtof = m => Math.pow(2, (m - 69) / 12) * 440

const ftom = f => Math.round((12 * (Math.log(f / 440) / Math.log(2))) + 69)

const listPorts = portType => {
  const io = new midi[portType]()
  return Array(io.getPortCount()).fill(null).map((_, index) => io.getPortName(index))
}

const getPortNumber = (portType, name) => {
  const io = new midi[portType]()
  const matches = str => name instanceof RegExp ? name.test(str) : str === name
  for (let i = 0; i < io.getPortCount(); i++) {
    if (matches(io.getPortName(i))) {
      return i
    }
  }
  return -1
}

const getStatus = messageOrStatus =>
  Array.isArray(messageOrStatus) ? messageOrStatus[0] : messageOrStatus

const getChannel = messageOrStatus => getStatus(messageOrStatus).toString(16)[1]

module.exports = {
  statusCodes,
  statusTypes,
  codeToType,
  typeToCode,
  isControlChange,
  isNoteOn,
  isNoteOff,
  mtof,
  ftom,
  listPorts,
  getPortNumber,
  getChannel
}
