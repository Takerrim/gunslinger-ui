import { Application } from 'pixi.js'
import { Player } from './entities/Player/Player'
import { HpBar } from './entities/HpBar'
import { Cull } from '@pixi-essentials/cull'

const initGame = () => {
  const app = new Application({
    width: window.document.body.clientWidth,
    height: window.document.body.clientHeight,
    resizeTo: window,
    backgroundColor: '#3559E0',
    eventMode: 'static',
    // eventFeatures: {
    //   move: true,
    //   /** disables the global move events which can be very expensive in large scenes */
    //   globalMove: false,
    //   click: true,
    //   wheel: true,
    // },
  })
  app.stage.eventMode = 'static'
  document.body.appendChild(app.view as any)
  app.renderer.events.cursorStyles.default = 'url(/img/sprCursor.png), auto'

  const cull = new Cull({ toggle: 'visible', recursive: true }).addAll(
    app.stage.children
  )
  app.renderer.on('prerender', () => {
    cull.cull(app.renderer.screen, true)
  })

  new Player(app)
  new HpBar(app)
  ;(globalThis as any).__PIXI_APP__ = app
}

initGame()
