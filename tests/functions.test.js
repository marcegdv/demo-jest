import { factorial, asincronia, calcular } from "../src/functions";

describe('tests de functions.js', () => {
    describe('tests factorial', () => {
        test('3! = 6', () => {
            const num = 3;
            const res = 6;
            expect(factorial(num)).toEqual(res);
        });
        test('0! = 1', () => {
            const num = 0;
            const res = 1;
            expect(factorial(num)).toEqual(res);
        });
        test('-2! = 0', () => {
            const num = -2;
            const res = 0;
            expect(factorial(num)).toEqual(res);
        });
    });
    describe ('tests asincronia', () => {
        test('con usuario Juan retorna el mail de Juan', async () => {
            const usuario = 'Juan';
            const respuesta = 'juan@email.com';
            const response = await asincronia(usuario);
            expect(response).toEqual(respuesta);
        });
        test('con usuario distinto de Juan lanza un error', async () => {
            expect.assertions(1);
            const usuario = 'John Doe';
            const respuesta = '';
            try {
                const response = await asincronia(usuario);
                expect(response).toEqual(respuesta);
            } catch (error) {
                const err = new Error('Usuario ' + usuario + ' no existe.');
                expect(error).toEqual(err);
            }
        });
    });
    describe('tests calcular', () => {
        const calcs = calcular();
        test('metodo suma', () => {
            expect(calcs.suma(1,2,3,4)).toEqual(10);
        });
        test('metodo multiplica', () => {
            expect(calcs.multiplica(1,2,3,4)).toEqual(24);
        });
        test('metodo resta', () => {
            expect(calcs.resta(1,2,3,4)).toEqual(-10);
        });
    });
});



describe('tests de functions.js con mocks', () => {
    describe('tests factorial con mock', () => {
        /*----[ Mock de una función ]----
        Creamos un mock de la función factorial llamada factorialMock, a la cual
        se le pasan tres valores distintos y se esperan tres resultados distintos.
        Los resultados que retornará la función mock son asignados mediante el
        método .mockReturnValueOnce() y esos retornos serán únicos para las tres
        veces que se llame a la función, y serán en el orden en que fueron
        asignados. El orden de los resultados es importante o el test fallará.
        - Ejercicio: ¿Qué corurrirá si la función se llama en un cuarto test?   */
        const factorialMock = jest.fn()
            .mockReturnValueOnce(6) //1er valor a retornar en la 1er llamada
            .mockReturnValueOnce(1) //2dp valor a retornar en la 2da llamada
            .mockReturnValue(0);    //valor default a partir del 3er llamado
        test.each([[3,6],[0,1],[-1,0]])('3! = 6', (num, res) => {
            /*Como vemos, este test esta mejor escrito que los test de las
            líneas 4 a la 20. Se pueden resumir todas esas líneas de código para
            tests en un solo test, ya que los test se repiten pero solo cambian
            los datos que se le envían a la función. Es útil para realizar test
            en los "límites" de que está manejando un algoritmo. */
            expect(factorialMock(num)).toEqual(res);
        });
    });
    describe ('tests asincronia con mock', () => {
        /*----[ Mock una función asuncrónica ]----
        La función asincrona simula ser una API que retornará una respuesta luego
        de un tiempo, por lo que hay que esperar cierto tiempo. Además, puede
        retornar un error/excepción.
        Y como la función es un mock, no es necesario usar await.  */
        const asincroniaMock = jest.fn()
            .mockReturnValueOnce('juan@email.com')
            .mockReturnValueOnce(new Error('No existe'))
        test('con usuario Juan retorna el mail de Juan', () => {
            const usuario = 'Juan';
            const respuesta = 'juan@email.com';
            const response = asincroniaMock(usuario);
            expect(response).toEqual(respuesta);
        });
        test('con usuario distinto de Juan lanza un error', () => {
            /*Como vemos en este test, no necesita de un try/catch para comprobar
            que la funcion lanza un error.  */
            const usuario = 'John Doe';
            const err = new Error('No existe');
            expect(asincroniaMock(usuario)).toEqual(err);
        });
    });
    describe('tests calcular', () => {
        const calcs = calcular();
        test('metodo suma', () => {
            expect(calcs.suma(1,2,3,4)).toEqual(10);
        });
        test('metodo multiplica', () => {
            expect(calcs.multiplica(1,2,3,4)).toEqual(24);
        });
        test('metodo resta', () => {
            expect(calcs.resta(1,2,3,4)).toEqual(-10);
        });
    });
});