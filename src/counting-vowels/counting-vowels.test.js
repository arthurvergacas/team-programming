import

describe('CountingVowels', () => {
  it('Validate that the word has only one vowel', () => {
    const word = 'paz';
    expect(CountingVowels.count(word)).toBe(1);
  });
});
