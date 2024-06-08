import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Dice, range } from '@/models/addedDice'

export type Dis_AdvantageRoll = "NORMAL" | "ADVANTAGE" | "DISADVANTAGE"

export const useDiceSettingsStore = defineStore('DiceSettings', () => {
  const dis_advantageRoll = ref<Dis_AdvantageRoll>("NORMAL")

  function setAdvantageRoll(_advantageRoll: Dis_AdvantageRoll) {
    dis_advantageRoll.value = _advantageRoll
  }

  const normalDiceCount = ref(1)

  function setNormalDiceCount(count: number) {
    normalDiceCount.value = count
  }

  const dices = ref<{ [key: string]: Dice }>({
    "D6": Dice.FromSides(6),
    "D10": Dice.FromSides(10),
    "D12": Dice.FromSides(12),
    "D20": Dice.FromSides(20),
    "TheOneRing_D6_Bad": new Dice([0, 0, 0, 4, 5, 6]),
    "TheOneRingHero": new Dice([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20]),
    "TheOneRingHeroMiserable": new Dice([-20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20])
  })

  const doesDiceNameExists = (name: string) => Object.prototype.hasOwnProperty.call(dices.value, name)

  // Must be in keyof dices
  const normalDiceKind = ref<string>("D6")

  // Must be in keyof dices
  const heroDiceKind = ref<string>("TheOneRingHero")

  const selectedTargetValue = ref<number>(0)

  const getNormalDice = computed<Dice>(() => dices.value[normalDiceKind.value])
  const getHeroDice = computed<Dice>(() => dices.value[heroDiceKind.value])

  const getNormalDiceSides = computed<number[]>(() => getNormalDice.value.sides)
  const getHeroDiceSides = computed<number[]>(() => getHeroDice.value.sides)

  const getMinNormalDice = computed<number>(() => getNormalDiceSides.value[0])
  const getMaxNormalDice = computed<number>(() => getNormalDiceSides.value.slice(-1)[0])
  const getMinHeroDice = computed<number>(() => getHeroDiceSides.value[0])
  const getMaxHeroDice = computed<number>(() => getHeroDiceSides.value.slice(-1)[0])

  const totalPossibilities = computed(() => {
    if (dis_advantageRoll.value == 'NORMAL') {
      return getHeroDiceSides.value.length
        * Math.pow(getNormalDiceSides.value.length, normalDiceCount.value)
    }
    else {
      return getHeroDiceSides.value.length * getHeroDiceSides.value.length
        * Math.pow(getNormalDiceSides.value.length, normalDiceCount.value)
    }
  })

  const getPossibleRangeValues = computed<number[]>(() => {
    const minimum = getMinHeroDice.value + (normalDiceCount.value * getMinNormalDice.value)
    const maximum = getMaxHeroDice.value + (normalDiceCount.value * getMaxNormalDice.value)

    return range(maximum + 1 - minimum, minimum)
  })

  const getNormalDiceCombinationNextUp = (perviousCombinations: Map<number, number>) => {
    const nextCombinations = new Map<number, number>()

    for (const currentDie of getNormalDiceSides.value) {
      for (const [previousDices, timesPossible] of perviousCombinations) {
        const totalRolled = currentDie + previousDices
        nextCombinations.set(totalRolled, (nextCombinations.get(totalRolled) || 0) + timesPossible)
      }
    }

    return nextCombinations
  }

  const getNormalDiceCombinations = computed(() => {
    getNormalDice.value;// Calculate also, if selected Die Kind changes

    let diceCombinations = new Map<number, number>()
    diceCombinations.set(0, 1)//One Possibility to throw 0 dices and add 0


    for (let diceCount = 1; diceCount <= normalDiceCount.value; diceCount++) {
      diceCombinations = getNormalDiceCombinationNextUp(diceCombinations)
    }

    return diceCombinations
  })

  const getCombinedDiceCombinations = computed(() => {
    const diceCombinations = new Map<number, number>(
      getPossibleRangeValues.value.map((possibleValue) => [possibleValue, 0]))

    for (let heroSideIndex = 0; heroSideIndex < getHeroDiceSides.value.length; heroSideIndex++) {
      const heroDie = getHeroDiceSides.value[heroSideIndex];

      for (const [normalDices, _timesPossible] of getNormalDiceCombinations.value) {
        const totalRolled = heroDie + normalDices
        let timesPossible = _timesPossible

        if (dis_advantageRoll.value == 'ADVANTAGE') {
          timesPossible *= (2 * heroSideIndex) + 1 // any smaller value on the other die or a double
        } else if (dis_advantageRoll.value == 'DISADVANTAGE') {
          timesPossible *= (2 * (getHeroDiceSides.value.length - 1 - heroSideIndex)) + 1 // any larger value on the other die or a double
        }

        diceCombinations.set(totalRolled, (diceCombinations.get(totalRolled) || 0) + timesPossible)
      }
    }

    return diceCombinations
  })

  const getCombinedDiceCombinationsAccumulatedOver = computed(() => {
    const diceCombinationsOver = new Map<number, number>(
      getPossibleRangeValues.value.map((possibleValue) => [possibleValue, 0]))

    let accumulated = 0

    for (const [normalDices, timesPossible] of [...getCombinedDiceCombinations.value].sort((a, b) => b[0] - a[0])) {
      accumulated += timesPossible
      diceCombinationsOver.set(normalDices, + accumulated)
    }

    return diceCombinationsOver
  })

  return {
    dis_advantageRoll, setAdvantageRoll,
    normalDiceCount, setNormalDiceCount,
    dices, doesDiceNameExists,
    selectedTargetValue,
    normalDiceKind, getNormalDice, getNormalDiceSides, getMinNormalDice, getMaxNormalDice,
    heroDiceKind, getHeroDice, getHeroDiceSides, getMinHeroDice, getMaxHeroDice,
    totalPossibilities, getPossibleRangeValues, getNormalDiceCombinations, combinationsTargetValue: getCombinedDiceCombinations, getCombinedDiceCombinationsAccumulatedOver
  }
})
