/*

    Este archivo contiene tests que aseguran el correcto funcionamiento de las
    fuciones contenidas en el archivo src/functions/functions.js.

*/
import { factorial, asincronia, calcular } from "../src/functions/functions";

/* Una característica de jest, es que puede agrupar test utilizando
la función describe(), con la que se pueden ejecutar grupos de test.
La idea es tener test relacionados por algún criterio agrupados y
poder ejecutarlos "todos juntos".
*/

describe('tests de functions.js', () => {

    /* También se pueden realizar subgrupos anidando varias funciones describe() */
    describe('tests función factorial()', () => {
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

    describe('tests función asincronia()', () => {
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
            } catch (error) {
                const err = new Error('Usuario ' + usuario + ' no existe.');
                expect(error).toEqual(err);
            }
        });
    });

    describe('tests de la función calcular()', () => {
        const calcs = calcular();
        test('metodo suma', () => {
            expect(calcs.suma(1, 2, 3, 4)).toEqual(10);
        });
        test('metodo multiplica', () => {
            expect(calcs.multiplica(1, 2, 3, 4)).toEqual(24);
        });
        test('metodo resta', () => {
            expect(calcs.resta(1, 2, 3, 4)).toEqual(-10);
        });
    });

});

// Continua observando el archivo: functionsWithMocks.test.js