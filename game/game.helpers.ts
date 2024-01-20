import { Graphics } from 'pixi.js'

export const drawRect = ({
  params,
  anchor,
  fillColor,
  radius,
  outline,
}: HelpersTypes.DrawRectParams) => {
  const graphics = new Graphics()
  if (fillColor) {
    graphics.beginFill(fillColor)
  }

  if (outline) {
    graphics.lineStyle({ width: outline.width, color: outline.color })
  }

  if (radius) {
    graphics.drawRoundedRect(...params, radius)
  } else {
    graphics.drawRect(...params)
  }

  anchor.addChild(graphics)
}

// export const degreeToRadian = (degree: number) =>  degree * (Math.PI / 180)

export const calculateAngle = (dx: number, dy: number) => Math.atan2(dy, dx)
