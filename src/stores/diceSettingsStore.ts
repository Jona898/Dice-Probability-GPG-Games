import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Dice, range } from '@/models/addedDice'

export type Dis_AdvantageRoll = "NORMAL" | "ADVANTAGE" | "DISADVANTAGE"

export const useDiceSettingsStore = defineStore('DiceSettings', () => {
  const dis_advantageRoll = ref<Dis_AdvantageRoll>("NORMAL")


  function setAdvantageRoll(_advantageRoll: Dis_AdvantageRoll) {
    dis_advantageRoll.value = _advantageRoll
  }

  const d6Count = ref(1)

  function setD6Count(count: number) {
    d6Count.value = count
  }

  const dices = ref<{ [key: string]: Dice }>({
    "D6": Dice.FromSides(6),
    "D10": Dice.FromSides(10),
    "D12": Dice.FromSides(12),
    "TheOneRing": new Dice([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20]),
    "TheOneRingMiserable": new Dice([-20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20])
  })

  // Must be in keyof dices
  const normalDiceKind = ref<string>("D6")

  // Must be in keyof dices
  const heroDiceKind = ref<string>("TheOneRing")

  const getNormalDice = computed<Dice>(() => dices.value[normalDiceKind.value])
  const getHeroDice = computed<Dice>(() => dices.value[heroDiceKind.value])

  const getNormalDiceSides = computed<number[]>(() => getNormalDice.value.sides)
  const getHeroDiceSides = computed<number[]>(() => getHeroDice.value.sides)

  const getMinNormalDice = computed<number>(() => getNormalDice.value.sides[0])
  const getMaxNormalDice = computed<number>(() => getNormalDice.value.sides.slice(-1)[0])
  const getMinHeroDice = computed<number>(() => getHeroDice.value.sides[0])
  const getMaxHeroDice = computed<number>(() => getHeroDice.value.sides.slice(-1)[0])

  const totalPossibilities = computed(() => {
    return getHeroDice.value.sides.length
      * Math.pow(getNormalDice.value.sides.length, d6Count.value)
  })

  const getPossibleRangeValues = computed<number[]>(() => {
    console.log({
      d6Count: d6Count.value,
      getMinHeroDice: getMinHeroDice.value,
      getMaxHeroDice: getMaxHeroDice.value,
      getMinNormalDice: getMinNormalDice.value,
      getMaxNormalDice: getMaxNormalDice.value,
    })

    const minimum = getMinHeroDice.value + (d6Count.value * getMinNormalDice.value)
    const maximum = getMaxHeroDice.value + (d6Count.value * getMaxNormalDice.value)

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


    for (let diceCount = 1; diceCount <= d6Count.value; diceCount++) {
      diceCombinations = getNormalDiceCombinationNextUp(diceCombinations)
    }

    return diceCombinations
  })

  const getCombinedDiceCombinations = computed(() => {
    const diceCombinations = new Map<number, number>(
      getPossibleRangeValues.value.map((possibleValue) => [possibleValue, 0]))



    //ToDo add (dis)advantage



    for (const heroDie of getHeroDiceSides.value) {
      for (const [normalDices, timesPossible] of getNormalDiceCombinations.value) {
        const totalRolled = heroDie + normalDices
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
    d6Count, setD6Count,
    dices,
    normalDiceKind, getNormalDice, getNormalDiceSides, getMinNormalDice, getMaxNormalDice,
    heroDiceKind, getHeroDice, getHeroDiceSides, getMinHeroDice, getMaxHeroDice,
    totalPossibilities, getPossibleRangeValues, getNormalDiceCombinations, combinationsTargetValue: getCombinedDiceCombinations, getCombinedDiceCombinationsAccumulatedOver
  }
})
