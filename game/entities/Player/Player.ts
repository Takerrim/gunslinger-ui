import {
  AnimatedSprite,
  Application,
  BaseTexture,
  FederatedPointerEvent,
  Sprite,
  Spritesheet,
} from 'pixi.js'
import playerSpritesheetJson from './player.spritesheet.json'
import { AbstractGameElement } from '../AbstractGameElement'
import { calculateAngle } from '~/game/game.helpers'
import { Shooting } from '../Shooting'

const VELOCITY = 4

const ANIMATION_SPEED = 0.1666

// TODO: Стейт перенести в state machine
export class Player extends AbstractGameElement {
  spritesheet!: Spritesheet

  player!: AnimatedSprite

  bonus: PlayerTypes.Bonus | null = null

  hp = 100

  bullets: Sprite[] = []

  shooting!: Shooting

  constructor(app: Application) {
    super(app)
    this.#init()

    this.shooting = new Shooting(app)

    this.keyboardService.move(this.#move.bind(this))
    this.keyboardService.removePressedKey()

    // this.app.stage.addEventListener('mousemove', (e) => this.#rotate(e))
    document.addEventListener('mousemove', (e) => this.#rotate(e))

    document.addEventListener('mousedown', () => {
      this.player.play()
      this.shooting.fire()
    })

    document.addEventListener('mouseup', () => {
      this.player.gotoAndStop(2)
      this.shooting.stop()
    })
  }

  async #init() {
    this.spritesheet = new Spritesheet(
      BaseTexture.from(playerSpritesheetJson.meta.image),
      playerSpritesheetJson
    )
    await this.spritesheet.parse()

    this.player = new AnimatedSprite(this.spritesheet.animations.player)
    this.player.name = 'player'
    this.player.scale.set(1.2, 1.2)
    this.player.anchor.set(0.15, 0.5)
    this.player.animationSpeed = ANIMATION_SPEED
    this.app.stage.addChild(this.player)
  }

  #move(key: string) {
    switch (key) {
      case 'up-right':
        this.player.position.set(
          this.player.x + VELOCITY,
          this.player.y - VELOCITY
        )
        break
      case 'up-left':
        this.player.position.set(
          this.player.x - VELOCITY,
          this.player.y - VELOCITY
        )
        break
      case 'down-right':
        this.player.position.set(
          this.player.x + VELOCITY,
          this.player.y + VELOCITY
        )
        break
      case 'down-left':
        this.player.position.set(
          this.player.x - VELOCITY,
          this.player.y + VELOCITY
        )
        break
      case 'right-up':
        this.player.position.set(
          this.player.x + VELOCITY,
          this.player.y - VELOCITY
        )
        break
      case 'right-down':
        this.player.position.set(
          this.player.x + VELOCITY,
          this.player.y + VELOCITY
        )
        break
      case 'left-up':
        this.player.position.set(
          this.player.x - VELOCITY,
          this.player.y - VELOCITY
        )
        break
      case 'left-down':
        this.player.position.set(
          this.player.x - VELOCITY,
          this.player.y + VELOCITY
        )
        break
      case 'up':
        this.player.y = this.player.y - VELOCITY
        break
      case 'down':
        this.player.y = this.player.y + VELOCITY
        break
      case 'right':
        this.player.x = this.player.x + VELOCITY
        break
      case 'left':
        this.player.x = this.player.x - VELOCITY
        break
    }
  }

  #rotate(e: MouseEvent) {
    const catetX = e.x - this.player.x
    const catetY = e.y - this.player.y
    this.player.rotation = calculateAngle(catetX, catetY)
  }

  protected update(): void {}
}
