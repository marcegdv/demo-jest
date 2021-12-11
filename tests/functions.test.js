import { factorial, api, calcular } from "../src/functions";

describe('tests factorial', () => {
    test('suma(3,5) retorna 8', () => {
        const num = 3;
        const res = 6;
        expect(factorial(num)).toEqual(res);
    });
});

describe ('tests api', () => {
    test('con usuario Juan retorna el mail de Juan', async () => {
        const usuario = 'Juan';
        const res = 'juan@email.com';
        const ret = await api(usuario);
        expect(ret).toEqual(res);
    });

    test('con usuario Nadie retorna una cadena vacía', async () => {
        const usuario = 'Nadie';
        const res = '';
        const ret = await api(usuario);
        expect(ret).toEqual(res);
    });
});

describe('test calcular', () => {
    const calcs = calcular();
    test('metodo suma', () => {
        expect(calcs.suma(1,2,3)).toEqual(6);
    });
});