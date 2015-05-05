import { expect } from 'tc-test/support'

import Scheduler from 'tc/core/combat/scheduler'

describe('Scheduler', () => {
  beforeEach(function(){
    this.attackers = [
      { attackMspa: 3000, initiative: 1 },
      { attackMspa: 2000, initiative: 0 },
      { attackMspa: 1000, initiative: 0 },
    ]
  })

  describe('startTime = 0', () => {
    beforeEach(function(){
      this.scheduler = new Scheduler(0, this.attackers)
    })

    it('returns actions for initiative', function(){
      // time < 0
      let attackers = this.scheduler.initiative()
      expect(attackers).to.have.properties({
        '-1': [0],
      })
    })

    it('returns actions between 0 and 3000', function(){
      // 0 <= time < 3000
      let attackers = this.scheduler.between(0, 3000)
      expect(attackers).to.have.properties({
            '0': [1, 2],
         '1000': [2],
         '2000': [1, 2],
         '2999': [0],
      })
    })

    it('returns actions between 1000 and 4000', function(){
      // 1000 <= time < 5000
      let attackers = this.scheduler.between(1000, 5000)
      expect(attackers).to.have.properties({
         '1000': [2],
         '2000': [1, 2],
         '2999': [0],
         '3000': [2],
         '4000': [1, 2],
      })
    })
  })

  describe('startTime = 1', () => {
    beforeEach(function(){
      this.scheduler = new Scheduler(1, this.attackers)
    })

    it('returns actions for initiative', function(){
      // time < 1
      let attackers = this.scheduler.initiative()
      expect(attackers).to.have.properties({
        '0': [0],
      })
    })

    it('returns actions between 1 and 3001', function(){
      // 1 <= time < 3001
      let attackers = this.scheduler.between(1, 3001)
      expect(attackers).to.have.properties({
            '1': [1, 2],
         '1001': [2],
         '2001': [1, 2],
         '3000': [0],
      })
    })

    it('returns actions between 1001 and 3001', function(){
      // 1001 <= time < 4001
      let attackers = this.scheduler.between(1001, 4001)
      expect(attackers).to.have.properties({
         '1001': [2],
         '2001': [1, 2],
         '3000': [0],
         '3001': [2],
      })
    })
  })
})
