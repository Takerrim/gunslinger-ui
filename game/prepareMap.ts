import { Viewport } from 'pixi-viewport'
import type { Application } from 'pixi.js'
import { Background } from './entities/Background'
import { HpBar } from './entities/HpBar'
import { Player } from './entities/Player'
import { Wall } from './entities/Wall'
import { IntersectionManager } from './services/IntersectionManager'

type TWallData = {
  x: number
  y: number
  width: number
  height: number
  placement: CommonTypes.Placement
}

const WALLS_CONFIG: TWallData[] = [
  {
    x: 1000,
    y: 0,
    width: 15,
    height: 500,
    placement: 'vertical',
  },
  {
    x: 1000,
    y: 700,
    width: 15,
    height: 572,
    placement: 'vertical',
  },
]

const buildWalls = (app: Application) => {
  WALLS_CONFIG.forEach((wallData) => {
    const wall = new Wall(app)
    wall.setCoords({ x: wallData.x, y: wallData.y })
    wall.setDimensions({ width: wallData.width, height: wallData.height })
    wall.setPlacement(wallData.placement)
    IntersectionManager.getInstance().addTarget(wall.wallSprite)
  })
}

export const prepareMap = (app: Application) => {
  const viewport = new Viewport({
    worldWidth: window.document.body.clientWidth,
    worldHeight: window.document.body.clientHeight,
    events: app.renderer.events,
  })

  viewport.name = 'viewport'

  app.stage.addChild(viewport)

  new Background(app)
  new HpBar(app)
  const player = new Player(app)

  buildWalls(app)
}
