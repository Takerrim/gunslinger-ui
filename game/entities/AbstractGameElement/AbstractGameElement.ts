import type { Viewport } from 'pixi-viewport'
import type { Application, Sprite } from 'pixi.js'
import { IntersectionManager } from '~/game/services/IntersectionManager'

export abstract class AbstractGameElement {
  protected app!: Application

  constructor(app: Application) {
    this.app = app
    this.app.ticker.add(this.update.bind(this))
  }

  get viewport() {
    return this.app.stage.getChildByName('viewport') as Viewport
  }

  protected isOutOfMap(target: Sprite) {
    const map = this.viewport.getChildByName('background')
    return Boolean(
      map &&
        IntersectionManager.getInstance().testMapCollision(
          target,
          map as Sprite
        )
    )
  }

  protected isIntersected(target: Sprite) {
    return IntersectionManager.getInstance().isIntersected(target)
  }

  /** @description update logic for render tick  */
  protected abstract update(): void
}
