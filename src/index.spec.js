const assert = require('assert')
const midiUtil = require('./index')

const test = (name, fn) => {
  try {
    fn()
  } catch (error) {
    /* eslint-disable */
    console.warn(name)
    console.error(error)
    /* eslint-enable */
  }
}

for (let i = 0; i < 17; i++) {
  if (i < 16) {
    assert.ok(midiUtil.isNoteOff(midiUtil.statusMap.get('noteOff') + i))
    assert.ok(midiUtil.isNoteOn(midiUtil.statusMap.get('noteOn') + i))
    assert.ok(
      midiUtil.isPolyphonicAftertouch(
        midiUtil.statusMap.get('polyphonicAftertouch') + i
      )
    )
    assert.ok(
      midiUtil.isControlChange(midiUtil.statusMap.get('controlChange') + i)
    )
    assert.ok(
      midiUtil.isProgramChange(midiUtil.statusMap.get('programChange') + i)
    )
    assert.ok(
      midiUtil.isChannelAftertouch(
        midiUtil.statusMap.get('channelAftertouch') + i
      )
    )
    assert.ok(midiUtil.isPitchBend(midiUtil.statusMap.get('pitchBend') + i))
  } else {
    assert.ok(!midiUtil.isNoteOff(midiUtil.statusMap.get('noteOff') + i))
    assert.ok(!midiUtil.isNoteOn(midiUtil.statusMap.get('noteOn') + i))
    assert.ok(
      !midiUtil.isPolyphonicAftertouch(
        midiUtil.statusMap.get('polyphonicAftertouch') + i
      )
    )
    assert.ok(
      !midiUtil.isControlChange(midiUtil.statusMap.get('controlChange') + i)
    )
    assert.ok(
      !midiUtil.isProgramChange(midiUtil.statusMap.get('programChange') + i)
    )
    assert.ok(
      !midiUtil.isChannelAftertouch(
        midiUtil.statusMap.get('channelAftertouch') + i
      )
    )
    assert.ok(!midiUtil.isPitchBend(midiUtil.statusMap.get('pitchBend') + i))
  }
}

test('getType', () => {
  assert.equal(midiUtil.getType(186), 'controlChange')
  assert.equal(midiUtil.getType(250), 'start')
})
