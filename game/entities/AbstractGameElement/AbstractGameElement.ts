import type { Application, IPointData } from "pixi.js"
import { KeyboardService } from "~/game/services/KeyboardService"

export abstract class AbstractGameElement {
  protected app!: Application

  protected keyboardService!: KeyboardService

  constructor(app: Application) {
    this.app = app
    this.keyboardService = new KeyboardService()
    this.app.ticker.add(this.update.bind(this))
  }

  protected stageBoundaryReached(position: IPointData) {
  }

  /** @description update logic for render tick  */
  protected abstract update(): void
}
