const { isControlChange, getChannel } = require(`./index`)

describe(`midi-util`, () => {
  describe(`isControlChange`, () => {
    it(`should return false for values < 176`, () => {
      for (let i = 0; i < 176; i++) {
        expect(isControlChange(i)).toBe(false)
      }
    })
    it(`should return false for values > 191`, () => {
      for (let i = 192; i < 256; i++) {
        expect(isControlChange(i)).toBe(false)
      }
    })
    it(`should return true for values between [176, 191]`, () => {
      for (let i = 176; i < 192; i++) {
        expect(isControlChange(i)).toBe(true)
      }
    })
  })

  describe(`getChannel`, () => {
    it(`should return channel for given status byte`, () => {
      expect(getChannel(128)).toEqual(0)
      expect(getChannel(128 + 15)).toEqual(15)
      expect(getChannel(128 + 16)).toEqual(0)
    })
  })
})
