let instance: KeyboardService | null = null

export class KeyboardService {
  #pressedKeysMap: Record<string, boolean> = {}

  private constructor() {}

  static getInstance() {
    if (instance) return instance
    instance = new KeyboardService()
    return instance
  }

  removePressedKey() {
    document.addEventListener('keyup', ({ key }) => {
      if (this.#pressedKeysMap[key]) {
        delete this.#pressedKeysMap[key]
      }
    })
  }

  move(onKeyPress: (key: string) => void) {
    document.addEventListener('keypress', ({ key }) => {
      this.#pressedKeysMap[key] = true

      switch (key) {
        case 'w':
          if (this.#pressedKeysMap.d) return onKeyPress('up-right')
          if (this.#pressedKeysMap.a) return onKeyPress('up-left')
          return onKeyPress('up')
        case 's':
          if (this.#pressedKeysMap.a) return onKeyPress('down-left')
          if (this.#pressedKeysMap.d) return onKeyPress('down-right')
          return onKeyPress('down')
        case 'a':
          if (this.#pressedKeysMap.w) return onKeyPress('left-up')
          if (this.#pressedKeysMap.s) return onKeyPress('left-down')
          return onKeyPress('left')
        case 'd':
          if (this.#pressedKeysMap.w) return onKeyPress('right-up')
          if (this.#pressedKeysMap.s) return onKeyPress('right-down')
          return onKeyPress('right')
      }
    })
  }
}
