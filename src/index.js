// https://www.midi.org/specifications-old/item/table-2-expanded-messages-list-status-bytes
const codeTypeMap = new Map([
  [128, 'noteOff'],
  [144, 'noteOn'],
  [160, 'polyphonicAftertouch'],
  [176, 'controlChange'],
  [192, 'programChange'],
  [208, 'channelAftertouch'],
  [224, 'pitchBend'],

  [240, 'sysEx'],
  // is this correct nomenclature?
  [241, 'timeCode'],
  [242, 'songPosition'],
  [243, 'songSelect'],
  // [244, 'reserved'],
  // [245, 'reserved'],
  [246, 'tuneRequest'],
  [247, 'endOfSysEx'],
  [248, 'clock'],
  // [249, 'reserved']
  [250, 'start'],
  [251, 'continue'],
  [252, 'stop'],
  // [253, 'reserved'],
  [254, 'activeSensing'],
  [255, 'systemReset'],
])

const codeTypeEntries = Array.from(codeTypeMap)

const typeCodeMap = new Map(codeTypeEntries.map(([k, v]) => [v, k]))

const is = code => status => status >= code && status < code + 16
const isNoteOff = is(typeCodeMap.get('noteOff'))
const isNoteOn = is(typeCodeMap.get('noteOn'))
const isPolyphonicAftertouch = is(typeCodeMap.get('polyphonicAftertouch'))
const isControlChange = is(typeCodeMap.get('controlChange'))
const isProgramChange = is(typeCodeMap.get('programChange'))
const isChannelAftertouch = is(typeCodeMap.get('channelAftertouch'))
const isPitchBend = is(typeCodeMap.get('pitchBend'))

const isSongPosition = status => status === typeCodeMap.get('songPosition')
const isSongSelect = status => status === typeCodeMap.get('songSelect')
const isTuneRequest = status => status === typeCodeMap.get('tuneRequest')
const isEndOfSysEx = status => status === typeCodeMap.get('endOfSysEx')
const isClock = status => status === typeCodeMap.get('clock')
const isStart = status => status === typeCodeMap.get('start')
const isContinue = status => status === typeCodeMap.get('continue')
const isStop = status => status === typeCodeMap.get('stop')
const isActiveSensing = status => status === typeCodeMap.get('activeSensing')
const isSystemReset = status => status === typeCodeMap.get('systemReset')

const mtof = m => Math.pow(2, (m - 69) / 12) * 440
const ftom = f => Math.round(12 * (Math.log(f / 440) / Math.log(2)) + 69)

const internalGetStatus = x => (Array.isArray(x) ? x[0] : x)
const getChannel = status => internalGetStatus(status) % 16

const getType = status => {
  const _status = internalGetStatus(status)
  const isChannelAwareStatus =
    status >= typeCodeMap.get('noteOff') &&
    status <= typeCodeMap.get('pitchBend')

  const [, type] =
    codeTypeEntries.find(([code]) =>
      isChannelAwareStatus ? is(code)(_status) : code === _status
    ) || []

  if (type) {
    return type
  }
}

module.exports = {
  codeTypeMap,
  typeCodeMap,
  isNoteOff,
  isNoteOn,
  isPolyphonicAftertouch,
  isControlChange,
  isProgramChange,
  isChannelAftertouch,
  isPitchBend,
  isSongPosition,
  isSongSelect,
  isTuneRequest,
  isEndOfSysEx,
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
}
