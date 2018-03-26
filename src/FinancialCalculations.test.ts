import * as assert from 'power-assert'
import {FinancialCalculations} from './FinancialCalculations'

describe('FinancialCalculations test', async function () {
  it(' calAMTotalAmount ', async () => {
    assert.equal(FinancialCalculations.calAMPerAmount(6000, 0.085, 6), 1024.94)
    assert.equal(FinancialCalculations.calAMPerAmount(6000, 0, 6), 1000)

    // 期数只能是正整数
    assert.throws(() => FinancialCalculations.calAMPerAmount(6000, 0.085, 0))
    assert.throws(() => FinancialCalculations.calAMPerAmount(6000, 0.085, 0.23))

    // 本金只能是正整数
    assert.throws(() => FinancialCalculations.calAMPerAmount(0, 0.085, 12))
    assert.throws(() => FinancialCalculations.calAMPerAmount(-270, 0.085, 12))

    // 利率要大于0
    assert.throws(() => FinancialCalculations.calAMPerAmount(6000, -0.1, 12))
  })
})
