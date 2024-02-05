import { Application } from 'pixi.js'
// import { Cull } from '@pixi-essentials/cull'
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

  // const cull = new Cull({ toggle: 'visible', recursive: true }).addAll(
  //   viewport.children
  // )

  // app.ticker.add(() => {

  // })

  // viewport.on('frame-end', function () {
  //   if (viewport.dirty) {
  //     cull.cull(app.renderer.screen, true)

  //     viewport.dirty = false
  //   }
  // })
  ;(globalThis as any).__PIXI_APP__ = app
}
