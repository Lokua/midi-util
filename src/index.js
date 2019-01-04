// https://www.midi.org/specifications-old/item/table-2-expanded-messages-list-status-bytes

const NOTE_OFF = 128
const NOTE_ON = 144
const POLYPHONIC_AFTERTOUCH = 160
const CONTROL_CHANGE = 176
const PROGRAM_CHANGE = 192
const CHANNEL_AFTERTOUCH = 208
const PITCHBEND = 224
const SYSEX = 240
const TIME_CODE = 241
const SONG_POSITION = 242
const SONG_SELECT = 243
const TUNE_REQUEST = 246
const END_OF_SYSEX = 247
const CLOCK = 248
const START = 250
const CONTINUE = 251
const STOP = 252
const ACTIVE_SENSING = 254
const SYSTEM_RESET = 255

const statusMap = new Map([
  [NOTE_OFF, 'noteOff'],
  [NOTE_ON, 'noteOn'],
  [POLYPHONIC_AFTERTOUCH, 'polyphonicAftertouch'],
  [CONTROL_CHANGE, 'controlChange'],
  [PROGRAM_CHANGE, 'programChange'],
  [CHANNEL_AFTERTOUCH, 'channelAftertouch'],
  [PITCHBEND, 'pitchBend'],
  [SYSEX, 'sysex'],
  [TIME_CODE, 'timeCode'],
  [SONG_POSITION, 'songPosition'],
  [SONG_SELECT, 'songSelect'],
  [TUNE_REQUEST, 'tuneRequest'],
  [END_OF_SYSEX, 'endOfSysex'],
  [CLOCK, 'clock'],
  [START, 'start'],
  [CONTINUE, 'continue'],
  [STOP, 'stop'],
  [ACTIVE_SENSING, 'activeSensing'],
  [SYSTEM_RESET, 'systemReset'],

  ['noteOff', NOTE_OFF],
  ['noteOn', NOTE_ON],
  ['polyphonicAftertouch', POLYPHONIC_AFTERTOUCH],
  ['controlChange', CONTROL_CHANGE],
  ['programChange', PROGRAM_CHANGE],
  ['channelAftertouch', CHANNEL_AFTERTOUCH],
  ['pitchBend', PITCHBEND],
  ['sysEx', SYSEX],
  ['timeCode', TIME_CODE],
  ['songPosition', SONG_POSITION],
  ['songSelect', SONG_SELECT],
  ['tuneRequest', TUNE_REQUEST],
  ['endOfSysEx', END_OF_SYSEX],
  ['clock', CLOCK],
  ['start', START],
  ['continue', CONTINUE],
  ['stop', STOP],
  ['activeSensing', ACTIVE_SENSING],
  ['systemReset', SYSTEM_RESET],

  ['NOTE_OFF', NOTE_OFF],
  ['NOTE_ON', NOTE_ON],
  ['POLYPHONIC_AFTERTOUCH', POLYPHONIC_AFTERTOUCH],
  ['CONTROL_CHANGE', CONTROL_CHANGE],
  ['PROGRAM_CHANGE', PROGRAM_CHANGE],
  ['CHANNEL_AFTERTOUCH', CHANNEL_AFTERTOUCH],
  ['PITCHBEND', PITCHBEND],
  ['SYSEX', SYSEX],
  ['TIME_CODE', TIME_CODE],
  ['SONG_POSITION', SONG_POSITION],
  ['SONG_SELECT', SONG_SELECT],
  ['TUNE_REQUEST', TUNE_REQUEST],
  ['END_OF_SYSEX', END_OF_SYSEX],
  ['CLOCK', CLOCK],
  ['START', START],
  ['CONTINUE', CONTINUE],
  ['STOP', STOP],
  ['ACTIVE_SENSING', ACTIVE_SENSING],
  ['SYSTEM_RESET', SYSTEM_RESET],
  // [244, 'reserved'],
  // [249, 'reserved']
  // [245, 'reserved'],
  // [253, 'reserved'],
])

const statusEntries = Array.from(statusMap)
const internalGetStatus = x =>
  Object.prototype.toString
    .call(x)
    .toLowerCase()
    .includes('array')
    ? x[0]
    : x

// only for chanel aware status
const is = code => status => {
  const s = internalGetStatus(status)
  return s >= code && s < code + 16
}

const isNoteOff = is(statusMap.get('noteOff'))
const isNoteOn = is(statusMap.get('noteOn'))
const isPolyphonicAftertouch = is(statusMap.get('polyphonicAftertouch'))
const isControlChange = is(statusMap.get('controlChange'))
const isProgramChange = is(statusMap.get('programChange'))
const isChannelAftertouch = is(statusMap.get('channelAftertouch'))
const isPitchBend = is(statusMap.get('pitchBend'))

const isSysex = status => internalGetStatus(status) === statusMap.get('sysEx')
const isSongPosition = status =>
  internalGetStatus(status) === statusMap.get('songPosition')
const isSongSelect = status =>
  internalGetStatus(status) === statusMap.get('songSelect')
const isTuneRequest = status =>
  internalGetStatus(status) === statusMap.get('tuneRequest')
const isEndOfSysex = status =>
  internalGetStatus(status) === statusMap.get('endOfSysEx')
const isClock = status => internalGetStatus(status) === statusMap.get('clock')
const isStart = status => internalGetStatus(status) === statusMap.get('start')
const isContinue = status =>
  internalGetStatus(status) === statusMap.get('continue')
const isStop = status => internalGetStatus(status) === statusMap.get('stop')
const isActiveSensing = status =>
  internalGetStatus(status) === statusMap.get('activeSensing')
const isSystemReset = status =>
  internalGetStatus(status) === statusMap.get('systemReset')

const mtof = m => Math.pow(2, (m - 69) / 12) * 440
const ftom = f => Math.round(12 * (Math.log(f / 440) / Math.log(2)) + 69)

const getChannel = status => internalGetStatus(status) % 16

const getType = status => {
  const s = internalGetStatus(status)
  const isChannelAwareStatus = s >= NOTE_OFF && s <= PITCHBEND

  const [, type] =
    statusEntries.find(([code]) =>
      isChannelAwareStatus ? is(code)(s) : code === s
    ) || []

  if (type) {
    return type
  }
}

async function getPorts() {
  const { inputs, outputs } = await navigator.requestMIDIAccess()

  return {
    inputs: Array.from(inputs.values()),
    outputs: Array.from(outputs.values()),
  }
}

function findPortByName(test, ports) {
  const find = ps => {
    let arr = Array.isArray(ps) ? ps : Array.from(ps).map(entry => entry[1])

    return test instanceof RegExp
      ? arr.find(p => test.test(p.name))
      : arr.find(p => p.name === test)
  }

  return ports ? find(ports) : find
}

module.exports = {
  NOTE_OFF,
  NOTE_ON,
  POLYPHONIC_AFTERTOUCH,
  CONTROL_CHANGE,
  PROGRAM_CHANGE,
  CHANNEL_AFTERTOUCH,
  PITCHBEND,
  SYSEX,
  TIME_CODE,
  SONG_POSITION,
  SONG_SELECT,
  TUNE_REQUEST,
  END_OF_SYSEX,
  CLOCK,
  START,
  CONTINUE,
  STOP,
  ACTIVE_SENSING,
  SYSTEM_RESET,
  statusMap,
  isNoteOff,
  isNoteOn,
  isPolyphonicAftertouch,
  isControlChange,
  isProgramChange,
  isChannelAftertouch,
  isPitchBend,
  isSysex,
  isSongPosition,
  isSongSelect,
  isTuneRequest,
  isEndOfSysex,
  isClock,
  isStart,
  isContinue,
  isStop,
  isActiveSensing,
  isSystemReset,
  mtof,
  ftom,
  getChannel,
  getType,
  getPorts,
  findPortByName,
}
