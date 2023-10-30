export default class FizzBuzz {
  DIVISOR_FIZZ = 3;
  DIVISOR_BUZZ = 5;
  DIVISOR_FIZZBUZZ = this.DIVISOR_FIZZ * this.DIVISOR_BUZZ;

  solve(numero) {

    if (!Number.isInteger(numero)) return null;
    if (numero % this.DIVISOR_FIZZBUZZ == 0) return 'FizzBuzz';
    if (numero % this.DIVISOR_FIZZ == 0) return 'Fizz';
    if (numero % this.DIVISOR_BUZZ == 0) return 'Buzz';

    return numero;
  }
}
