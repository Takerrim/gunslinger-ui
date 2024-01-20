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
import { calculateAngle } from '~/game/game.helpers'
import { Shooting } from '../Shooting'
import { IntersectingService } from '~/game/services/IntersectingService'
import { KeyboardService } from '~/game/services/KeyboardService'

const VELOCITY = 5

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

  constructor(app: Application) {
    super(app)

    this.#init().then(() => {
      this.shooting = new Shooting(app)

      const keyboardService = KeyboardService.getInstance()
      keyboardService.move(this.#move.bind(this))
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

  #move(key: string) {
    if (!this.background) return

    const { isBoundaryReached } = IntersectingService.getInstance()
    const outboundType = isBoundaryReached(
      this.#player.getBounds(),
      this.background.getBounds()
    )

    this.#player.play()
    switch (key) {
      case 'up-right':
        this.#player.position.set(
          this.#player.x + VELOCITY,
          this.#player.y - VELOCITY
        )
        break
      case 'up-left':
        this.#player.position.set(
          this.#player.x - VELOCITY,
          this.#player.y - VELOCITY
        )
        break
      case 'down-right':
        this.#player.position.set(
          this.#player.x + VELOCITY,
          this.#player.y + VELOCITY
        )
        break
      case 'down-left':
        this.#player.position.set(
          this.#player.x - VELOCITY,
          this.#player.y + VELOCITY
        )
        break
      case 'right-up':
        this.#player.position.set(
          this.#player.x + VELOCITY,
          this.#player.y - VELOCITY
        )
        break
      case 'right-down':
        this.#player.position.set(
          this.#player.x + VELOCITY,
          this.#player.y + VELOCITY
        )
        break
      case 'left-up':
        this.#player.position.set(
          this.#player.x - VELOCITY,
          this.#player.y - VELOCITY
        )
        break
      case 'left-down':
        this.#player.position.set(
          this.#player.x - VELOCITY,
          this.#player.y + VELOCITY
        )
        break
      case 'up':
        if (outboundType !== 'up') this.#player.y = this.#player.y - VELOCITY
        break
      case 'down':
        if (outboundType !== 'down') this.#player.y = this.#player.y + VELOCITY
        break
      case 'right':
        if (outboundType !== 'right') this.#player.x = this.#player.x + VELOCITY
        break
      case 'left':
        if (outboundType !== 'left') this.#player.x = this.#player.x - VELOCITY
        break
    }
  }

  #rotate(e: MouseEvent) {
    const dx = e.x - this.#player.worldTransform.tx
    const dy = e.y - this.#player.worldTransform.ty
    this.#player.rotation = calculateAngle(dx, dy)
  }

  protected update(): void {}
}
