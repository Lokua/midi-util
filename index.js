exports.codeTypeMap = new Map([
  [144, 'noteOn'],
  [128, 'noteOff'],
  [224, 'pitchBend'],
  [176, 'controlChange'],
  [208, 'channelPressure'],
  [248, 'clock'],
  [250, 'start'],
  [252, 'stop'],
  [251, 'continue'],
  [242, 'songPosition']
])

exports.typeCodeMap = new Map()

const is = code => status => status >= code && status < code + 16

for (const [code, type] of exports.codeTypeMap) {
  exports.typeCodeMap.set(type, code)
  exports[`is${type.charAt(0).toUpperCase() + type.slice(1)}`] = is(code)
}

exports.mtof = m => Math.pow(2, (m - 69) / 12) * 440
exports.ftom = f => Math.round(12 * (Math.log(f / 440) / Math.log(2)) + 69)
exports.getChannel = status => status % 16
