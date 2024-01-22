let instance: KeyboardService | null = null

export class KeyboardService {
  #pressedKeysMap: Record<string, boolean> = {}

  movingDirection: KeyboardServiceTypes.MovingDirection | null = null

  private constructor() {}

  static getInstance() {
    if (instance) return instance
    instance = new KeyboardService()
    return instance
  }

  get isKeyPressed() {
    return Object.keys(this.#pressedKeysMap).length > 0
  }

  removePressedKey() {
    document.addEventListener('keyup', ({ key }) => {
      if (this.movingDirection) {
        this.movingDirection = null
      }

      if (this.#pressedKeysMap[key]) {
        delete this.#pressedKeysMap[key]
      }
    })
  }

  move() {
    document.addEventListener('keypress', ({ key }) => {
      this.#pressedKeysMap[key] = true

      switch (key) {
        case 'w':
          if (this.#pressedKeysMap.d) {
            this.movingDirection = 'right-up'
            break
          }

          if (this.#pressedKeysMap.a) {
            this.movingDirection = 'left-up'
            break
          }

          this.movingDirection = 'up'
          break
        case 's':
          if (this.#pressedKeysMap.a) {
            this.movingDirection = 'left-down'
            break
          }

          if (this.#pressedKeysMap.d) {
            this.movingDirection = 'right-down'
            break
          }

          this.movingDirection = 'down'
          break
        case 'a':
          if (this.#pressedKeysMap.w) {
            this.movingDirection = 'left-up'
            break
          }
          if (this.#pressedKeysMap.s) {
            this.movingDirection = 'left-down'
            break
          }

          this.movingDirection = 'left'
          break
        case 'd':
          if (this.#pressedKeysMap.w) {
            this.movingDirection = 'right-up'
            break
          }
          if (this.#pressedKeysMap.s) {
            this.movingDirection = 'right-down'
            break
          }

          this.movingDirection = 'right'
      }
    })
  }
}
