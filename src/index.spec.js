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
    // test works with array
    assert.ok(midiUtil.isNoteOff([midiUtil.statusMap.get('noteOff') + i]))

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

test('getType (works for array, UInt8, etc)', () => {
  assert.equal(midiUtil.getType([186]), 'controlChange')
  const uIntArray = new Uint8Array([186])
  assert.equal(midiUtil.getType(uIntArray), 'controlChange')
})

test('findPortByName (regexp, array)', () => {
  const ports = [{ name: 'foo' }]

  assert.equal(ports[0], midiUtil.findPortByName(/f/, ports))
})

test('findPortByName (regexp, map)', () => {
  const ports = new Map([[0, { name: 'foo' }]])

  assert.equal(ports.get(0), midiUtil.findPortByName(/f/, ports))
})

test('findPortByName (string, array)', () => {
  const ports = [{ name: 'FoO' }]

  assert.equal(ports[0], midiUtil.findPortByName('FoO', ports))
  assert.ok(!midiUtil.findPortByName('foo', ports))
})

test('findPortByName (partial', () => {
  const ports = [{ name: 'FoO' }]
  const findFoo = midiUtil.findPortByName(/f/i)

  assert.equal(ports[0], findFoo(ports))
})
