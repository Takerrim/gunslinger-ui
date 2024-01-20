import type { Rectangle } from 'pixi.js'

let instance: IntersectingService | null = null

export class IntersectingService {
  static getInstance() {
    if (!instance) {
      instance = new IntersectingService()
    }

    return instance
  }

  private constructor() {}

  isBoundaryReached(target: Rectangle, container: Rectangle) {
    if (target.x < container.x) return 'left'
    if (target.x > container.x + container.width) return 'right'
    if (target.y < container.y) return 'up'
    if (target.y > container.y + container.height) return 'down'
  }
}
