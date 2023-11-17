export class CountingVowels {
  static count(word) {
    let vowels = 0;

    for (let i = 0; i < word.length ; i++ ) {
      if(word.charAt(i) === "a" ){
        vowels++
      }
    }


    return vowels;
  }
}
