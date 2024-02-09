import {
  AnimatedSprite,
  Application,
  BaseTexture,
  Sprite,
  Spritesheet,
  TilingSprite,
} from 'pixi.js'
import playerShootingSpritesheetJson from './playerShooting.spritesheet.json'
import playerWalkSpritesheetJson from './playerWalk.spritesheet.json'
import { AbstractGameElement } from '../AbstractGameElement'
import { calculateAngle, toGlobal } from '~/game/game.helpers'
import { Shooting } from '../Shooting'
import { IntersectionManager } from '~/game/services/IntersectionManager'
import { KeyboardService } from '~/game/services/KeyboardService'

const VELOCITY = 3

const ANIMATION_SPEED = 0.1666

// TODO: Стейт перенести в state machine
export class Player extends AbstractGameElement {
  firePlayerSpritesheet!: Spritesheet

  walkPlayerSpritesheet!: Spritesheet

  #player!: AnimatedSprite

  bonus: PlayerTypes.Bonus | null = null

  hp = 100

  bullets: Sprite[] = []

  shooting!: Shooting

  intersected = false

  constructor(app: Application) {
    super(app)

    this.#init().then(() => {
      this.shooting = new Shooting(app)

      const keyboardService = KeyboardService.getInstance()
      keyboardService.move()
      keyboardService.removePressedKey()

      document.addEventListener('mousemove', (e) => this.#rotate(e))

      document.addEventListener('mousedown', () => {
        this.#player.textures = this.firePlayerSpritesheet.animations.player
        this.#player.play()
        this.shooting.fire()
      })

      document.addEventListener('mouseup', () => {
        this.#player.stop()
        this.shooting.stop()
        this.#player.textures = this.walkPlayerSpritesheet.animations.player
      })

      document.addEventListener('keyup', () => {
        this.#player.stop()
      })
    })
  }

  get playerSprite() {
    return this.#player
  }

  get background() {
    return this.viewport.getChildByName('background') as TilingSprite | null
  }

  async #init() {
    this.walkPlayerSpritesheet = new Spritesheet(
      BaseTexture.from(playerWalkSpritesheetJson.meta.image),
      playerWalkSpritesheetJson
    )
    await this.walkPlayerSpritesheet.parse()

    this.#player = new AnimatedSprite(
      this.walkPlayerSpritesheet.animations.player
    )

    this.#player.name = 'player'
    this.#player.scale.set(1.2, 1.2)
    this.#player.anchor.set(0.15, 0.5)
    this.#player.animationSpeed = ANIMATION_SPEED

    this.viewport.addChild(this.#player)
    this.viewport.follow(this.#player, {
      speed: 1,
      acceleration: 1,
    })

    this.firePlayerSpritesheet = new Spritesheet(
      BaseTexture.from(playerShootingSpritesheetJson.meta.image),
      playerShootingSpritesheetJson
    )
    this.firePlayerSpritesheet.parse()
  }

  get isReady() {
    return this.#player !== undefined
  }

  #move() {
    if (!this.background) return

    const intersectionManager = IntersectionManager.getInstance()

    const mapOutSide = intersectionManager.testMapCollision(
      this.#player,
      this.background
    )

    const obstacleCollisionSide = intersectionManager.testObstacleCollisionSide(
      this.#player
    )

    // switch (obstacleCollisionSide) {
    //   case 'down':
    //     this.#player.position.y += 1
    //     break
    //   case 'up':
    //     this.#player.position.y -= 1
    //     break
    //   case 'left':
    //     this.#player.position.x -= 1
    //     break
    //   case 'right':
    //     this.#player.position.x += 1
    //     break
    // }

    this.#player.play()

    const { movingDirection } = KeyboardService.getInstance()
    switch (movingDirection) {
      case 'right-up':
        if (
          mapOutSide !== 'up' &&
          mapOutSide !== 'right' &&
          obstacleCollisionSide !== 'down' &&
          obstacleCollisionSide !== 'left'
        ) {
          this.#player.position.set(
            this.#player.x + VELOCITY,
            this.#player.y - VELOCITY
          )
        }
        break
      case 'right-down':
        if (
          mapOutSide !== 'down' &&
          mapOutSide !== 'right' &&
          obstacleCollisionSide !== 'up' &&
          obstacleCollisionSide !== 'left'
        ) {
          this.#player.position.set(
            this.#player.x + VELOCITY,
            this.#player.y + VELOCITY
          )
        }
        break
      case 'left-up':
        if (
          mapOutSide !== 'up' &&
          mapOutSide !== 'left' &&
          obstacleCollisionSide !== 'down' &&
          obstacleCollisionSide !== 'right'
        ) {
          this.#player.position.set(
            this.#player.x - VELOCITY,
            this.#player.y - VELOCITY
          )
        }
        break
      case 'left-down':
        if (
          mapOutSide !== 'down' &&
          mapOutSide !== 'left' &&
          obstacleCollisionSide !== 'up' &&
          obstacleCollisionSide !== 'right'
        ) {
          this.#player.position.set(
            this.#player.x - VELOCITY,
            this.#player.y + VELOCITY
          )
        }
        break
      case 'up':
        if (mapOutSide !== 'up' && obstacleCollisionSide !== 'down')
          this.#player.y = this.#player.y - VELOCITY
        break
      case 'down':
        if (mapOutSide !== 'down' && obstacleCollisionSide !== 'up')
          this.#player.y = this.#player.y + VELOCITY
        break
      case 'right':
        if (mapOutSide !== 'right' && obstacleCollisionSide !== 'left')
          this.#player.x = this.#player.x + VELOCITY
        break
      case 'left':
        if (mapOutSide !== 'left' && obstacleCollisionSide !== 'right')
          this.#player.x = this.#player.x - VELOCITY
        break
    }
  }

  #rotate(e: MouseEvent) {
    const { x, y } = toGlobal(this.#player)
    const dx = e.x - x
    const dy = e.y - y
    this.#player.rotation = calculateAngle(dx, dy)
  }

  protected update() {
    if (KeyboardService.getInstance().isKeyPressed) {
      this.#move()
    }
  }
}
