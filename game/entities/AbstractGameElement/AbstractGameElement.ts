import type { Viewport } from 'pixi-viewport'
import type { Application, IPointData } from 'pixi.js'
import { KeyboardService } from '~/game/services/KeyboardService'

export abstract class AbstractGameElement {
  protected app!: Application

  constructor(app: Application) {
    this.app = app
    this.app.ticker.add(this.update.bind(this))
  }

  get viewport() {
    return this.app.stage.getChildByName('viewport') as Viewport
  }

  protected stageBoundaryReached(position: IPointData) {}

  /** @description update logic for render tick  */
  protected abstract update(): void
}
