import { CountingVowels } from './counting-vowels';

describe('CountingVowels', () => {

    it('Validate that the word has no vowels', () => {
        const word = 'TDD';
        expect(CountingVowels.count(word)).toBe(0);
    });

  it('Validate that the word has only one vowel', () => {
    const word = 'paz';
    expect(CountingVowels.count(word)).toBe(1);
  });

  it('Validate word with all vowels', () => {
    const word = 'amenizou';
    expect(CountingVowels.count(word)).toBe(5);
  });
});
