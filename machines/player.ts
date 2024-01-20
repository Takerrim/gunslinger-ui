import { assign } from 'xstate'

export default createMachine({
  id: 'player',
  initial: 'idle',
  context: {
    position: {
      x: 0,
      y: 0,
    },
    hp: 100,
    bonus: null as PlayerTypes.Bonus | null,
  },
  states: {
    moving: {
      on: {
        'move': {
          actions: assign({
            position: {
              x: 0,
              y: 0,
            },
          }),
        }
      }
    },
    shoot: {

    },
  }
})