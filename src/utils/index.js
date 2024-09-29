export function getRandomNumbers(totalNumbers = 6, range = 49) {
  const selectedNumbers = new Set();
  while (selectedNumbers.size < totalNumbers) {
    const randomNumber = Math.floor(Math.random() * range) + 1;
    selectedNumbers.add(randomNumber);
  }
  return Array.from(selectedNumbers).sort((a, b) => a - b);
}

export function randomBonusNumber(winningNumbers) {
  let bonusNumber;
  do {
    bonusNumber = Math.floor(Math.random() * 49) + 1;
  } while (winningNumbers.includes(bonusNumber)); // Ensure no duplicate
  return bonusNumber;
}

export function compareNumbers(buyerNumbers, winningNumbers, bonusNumber) {
  const buyerSet = new Set(buyerNumbers);
  const winningSet = new Set(winningNumbers);

  // Find the matching main numbers
  const matchingNumbers = [...winningSet].filter((number) => buyerSet.has(number));

  // Check if buyer has the bonus number
  const hasBonusNumber = buyerSet.has(bonusNumber);

  return {
    matchingCount: matchingNumbers.length,
    matchingNumbers: matchingNumbers,
    hasBonusNumber: hasBonusNumber,
  };
}

export function determinePrizeGroup(matchingCount, hasBonusNumber) {
  if (matchingCount === 6) {
    return 'Group 1 (Jackpot)';
  } else if (matchingCount === 5 && hasBonusNumber) {
    return 'Group 2 with the additional number';
  } else if (matchingCount === 5) {
    return 'Group 3';
  } else if (matchingCount === 4 && hasBonusNumber) {
    return 'Group 4: with the additional number';
  } else if (matchingCount === 4) {
    return 'Group 5: $50';
  } else if (matchingCount === 3 && hasBonusNumber) {
    return 'Group 6: with the additional number $25';
  } else if (matchingCount === 3) {
    return 'Group 7: $10';
  } else {
    return 'You numbers do not match any 3 numbers';
  }
}
