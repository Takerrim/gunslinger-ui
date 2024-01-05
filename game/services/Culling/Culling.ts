import type { Application, Container, DisplayObject, ICanvas } from 'pixi.js'

export class Culling {
  static cull(objects: DisplayObject[], view: ICanvas) {
    const arr = [...objects]
    arr.forEach((obj, i) => {
      if (Culling.#isObjectReachedBounds(obj, view)) {
        obj.destroy()
        objects.splice(i, 1)
      }
    })
  }

  static #isObjectReachedBounds(obj: DisplayObject, view: ICanvas): boolean {
    return obj.x < 0 || obj.x > view.width || obj.y < 0 || obj.y > view.height
  }
}
