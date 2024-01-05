import {
  Sprite,
  type Application,
  Spritesheet,
  DisplayObject,
  BaseTexture,
} from 'pixi.js'
import { AbstractGameElement } from '../AbstractGameElement'
import bulletsSpritesheetJson from './bullets.spritesheet.json'
import { Culling } from '~/game/services/Culling'

const BULLET_SPEED_FACTOR = 20

export class Shooting extends AbstractGameElement {
  spritesheet!: Spritesheet

  timerId: NodeJS.Timeout | null = null

  bullets: Sprite[] = []

  constructor(app: Application) {
    super(app)

    this.spritesheet = new Spritesheet(
      BaseTexture.from(bulletsSpritesheetJson.meta.image),
      bulletsSpritesheetJson
    )
    this.spritesheet.parse()
  }

  #changeBulletPosition(bullet: DisplayObject) {
    bullet.position.set(
      bullet.position.x + Math.cos(bullet.rotation) * BULLET_SPEED_FACTOR,
      bullet.position.y + Math.sin(bullet.rotation) * BULLET_SPEED_FACTOR
    )
  }

  get player() {
    return this.app.stage.getChildByName('player')
  }

  fire() {
    if (this.player) {
      const { player } = this

      this.timerId = setInterval(() => {
        const bullet = Sprite.from(this.spritesheet.textures.bullet1)
        bullet.position.set(player.position.x, player.position.y)
        bullet.rotation = player.rotation
        bullet.cullable = true
        this.bullets.push(bullet)
        this.app.stage.addChild(bullet)
      }, 100)
    }
  }

  get isShooting() {
    return Boolean(this.timerId)
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
  }

  protected update() {
    if (this.bullets.length) {
      this.bullets.forEach(this.#changeBulletPosition)
      console.log(this.bullets[0].visible)
      // Culling.cull(this.bullets, this.app.view)
    }
  }
}
