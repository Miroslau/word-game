const getMinimalLettersSet = (words: string[]): string[] => {
  const letterCounts = words.reduce<{ [key: string]: number }>((acc, word) => {
    const tempCounts: { [key: string]: number } = {};
    for (const char of word) {
      tempCounts[char] = (tempCounts[char] || 0) + 1;
    }
    for (const char in tempCounts) {
      acc[char] = Math.max(acc[char] || 0, tempCounts[char]);
    }
    return acc;
  }, {});

  const minimalSet: string[] = [];

  for (const char in letterCounts) {
    for (let index = 0; index < letterCounts[char]; index++) {
      minimalSet.push(char);
    }
  }

  return minimalSet;
};

export default getMinimalLettersSet;
