import * as Joi from 'joi'
import {NumberUtil} from 'klg-number'

export class FinancialCalculations {

  /**
   * 等额本息, 每一期收到的本息
   * TODO 重新命名
   * @param {number} principal  初始本金
   * @param {number} rateYear   年化
   * @param {number} period     总期数
   * @returns {number}
   */
  static calAMPerAmount (principal: number, rateYear: number, period: number): number {
    const {error} = Joi.validate(
      {principal, rateYear, period},
      {
        principal: Joi.number().greater(0).strict(),
        rateYear: Joi.number().min(0).required().strict(),
        period: Joi.number().greater(0).integer().required().strict()
      },
      {noDefaults: true, abortEarly: false, allowUnknown: true})
    if (error) throw error

    if (rateYear === 0) return NumberUtil.fixedNum(principal / period)

    const ratePerPeriod = rateYear / 12
    const numerator = Math.pow((1 + ratePerPeriod), period)
    return NumberUtil.fixedNum(numerator * principal * ratePerPeriod / (numerator - 1))
  }
}
