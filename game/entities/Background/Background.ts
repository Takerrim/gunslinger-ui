import { TilingSprite, type Application, Texture } from 'pixi.js'
import { AbstractGameElement } from '../AbstractGameElement'

export class Background extends AbstractGameElement {
  #background = new TilingSprite(Texture.from('/img/background2.png'))

  constructor(app: Application) {
    super(app)

    this.#background.width = app.view.width * 2
    this.#background.height = app.view.height * 1.2
    this.#background.position.set(
      -(this.app.view.width / 2),
      -(this.app.view.height / 2)
    )

    this.#background.name = 'background'
    this.viewport.addChild(this.#background)
  }

  protected update() {}
}
