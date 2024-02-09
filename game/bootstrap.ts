import { Application } from 'pixi.js'
import { prepareMap } from './prepareMap'

export const initGame = () => {
  const app = new Application({
    width: window.document.body.clientWidth,
    height: window.document.body.clientHeight,
    resizeTo: window,
    eventMode: 'static',
  })

  document.body.appendChild(app.view as HTMLCanvasElement)
  app.renderer.events.cursorStyles.default = 'url(/img/sprCursor.png), auto'

  prepareMap(app)
  ;(globalThis as any).__PIXI_APP__ = app
}
