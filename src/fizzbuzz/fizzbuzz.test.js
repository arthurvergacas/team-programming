import FizzBuzz from "./FizzBuzz";

// retornar Fizz para nro divisivel por 3, Buzz para nro divisivel por 5, FizzBuzz quando é divisivel por 5 e 3 e o numero quando não é divisivel

describe('FizzBuzz', () => {

    test('Deve validar entrada', () => {

        expect(new FizzBuzz().solve("carro")).toBe(null)
    });

    test('Verificar se é divisivel por 3', () => {

        expect(new FizzBuzz().solve(3)).toBe('Fizz')
    });

    test('Verificar se é divisivel por 5', () => {

        expect(new FizzBuzz().solve(5)).toBe('Buzz')
    });

    test('Verificar se é divisivel por 3 e por 5', () => {

        expect(new FizzBuzz().solve(15)).toBe('FizzBuzz')
    });

    test('Retornar número se não é divisível por 3 ou por 5', () => {

        expect(new FizzBuzz().solve(4)).toBe(4)
    })
});



