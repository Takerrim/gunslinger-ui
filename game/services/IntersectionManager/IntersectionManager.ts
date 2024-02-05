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
  testObstacleCollision(target: Sprite) {
    // const { movingDirection } = KeyboardService.getInstance()
    // // for (let i = 0; i < this.targets.length; ++i) {
    // if (
    //   (movingDirection === 'right' ||
    //     movingDirection === 'right-up' ||
    //     movingDirection === 'right-down') &&
    //   this.isIntersected(target)
    // )
    //   return 'left'
    // if (
    //   (movingDirection === 'left' ||
    //     movingDirection === 'left-up' ||
    //     movingDirection === 'left-down') &&
    //   this.isIntersected(target)
    // )
    //   return 'right'
    // if (movingDirection === 'down' || this.isIntersected(target)) return 'up'
    // if (movingDirection === 'up' || this.isIntersected(target)) return 'down'
    // }
  }

  isIntersected = (target: Sprite) => {
    const targetGlobalPosition = toGlobal(target)
    return this.targets.some((intersectionTarget) => {
      const globalPosition = toGlobal(intersectionTarget)
      return (
        targetGlobalPosition.x >= globalPosition.x &&
        targetGlobalPosition.x <= globalPosition.x + intersectionTarget.width &&
        targetGlobalPosition.y >= globalPosition.y &&
        targetGlobalPosition.y <= globalPosition.y + intersectionTarget.height
      )
    })
  }
}
