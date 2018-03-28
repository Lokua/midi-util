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

test('type / code maps should be inverse of each other', () => {
  const keys = Array.from(midiUtil.codeTypeMap.keys())
  const values = Array.from(midiUtil.typeCodeMap.values())
  assert.deepEqual(keys, values)
})

const testIsFn = (code, fn) => {
  const isInCodeRange = i => i >= code && i < code + 16

  for (let i = 128; i < 256; i++) {
    if (isInCodeRange(i)) {
      assert.ok(fn(i))
    } else {
      assert.ok(!fn(i))
    }
  }
}

Object.keys(midiUtil).forEach(key => {
  if (key.startsWith('is')) {
    const type =
      key
        .slice(2)
        .charAt(0)
        .toLowerCase() + key.slice(3)

    testIsFn(midiUtil.typeCodeMap.get(type), midiUtil[key])
  }
})

for (let i = 144; i < 144 + 16; i++) {
  assert.equal(midiUtil.getChannel(i), i - 144)
}

test('getType', () => {
  assert.equal(midiUtil.getType(186), 'controlChange')
})
