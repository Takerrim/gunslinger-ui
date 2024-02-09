import type { Sprite } from 'pixi.js'
import { toGlobal } from '~/game/game.helpers'
import { KeyboardService } from '../KeyboardService'

let instance: IntersectionManager | null = null

export class IntersectionManager {
  targets: Sprite[] = []

  static getInstance() {
    if (!instance) {
      instance = new IntersectionManager()
    }

    return instance
  }

  private constructor() {}

  addTarget(target: Sprite) {
    this.targets.push(target)
  }

  testMapCollision(target: Sprite, container: Sprite) {
    const containerGlobalPosition = toGlobal(container)
    const targetGlobalPosition = toGlobal(target)
    if (targetGlobalPosition.x <= containerGlobalPosition.x) return 'left'
    if (targetGlobalPosition.x >= containerGlobalPosition.x + container.width)
      return 'right'
    if (targetGlobalPosition.y <= containerGlobalPosition.y) return 'up'
    if (targetGlobalPosition.y >= containerGlobalPosition.y + container.height)
      return 'down'
  }

  /** @description Check whether target has reached boundary with obstacle */
  testObstacleCollisionSide(target: Sprite) {
    const { movingDirection } = KeyboardService.getInstance()

    if (
      (movingDirection === 'right' ||
        movingDirection === 'right-up' ||
        movingDirection === 'right-down') &&
      this.isIntersectedWithObstacles(target)
    )
      return 'left'
    if (
      (movingDirection === 'left' ||
        movingDirection === 'left-up' ||
        movingDirection === 'left-down') &&
      this.isIntersectedWithObstacles(target)
    )
      return 'right'
    if (movingDirection === 'down' && this.isIntersectedWithObstacles(target))
      return 'up'
    if (movingDirection === 'up' && this.isIntersectedWithObstacles(target))
      return 'down'
  }

  isOverlappedWithObstacles = (target: Sprite) => {
    const { x, y } = toGlobal(target)
    return this.targets.some((intersectionTarget) => {
      return intersectionTarget.getBounds().contains(x, y)
    })
  }

  isIntersectedWithObstacles = (target: Sprite) => {
    return this.targets.some((intersectionTarget) => {
      return intersectionTarget.getBounds().intersects(target.getBounds())
    })
  }
}
