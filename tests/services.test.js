/*

    En este archivo de test verifica el correcto funcionamiento de una API pública
    que actualmente esta en funcionamiento, mediante las funciones contenidas en
    el archivo src/services/services.js. Dicha API contiene información sobre los
    días feriados de ciertos países, y también cierta información de cada país.

*/
import * as services from '../src/services/services';

describe('test de los servicios de la api de feriados', () => {

    describe('servicio de obtención de países', () => {
        test('obtiene la lista de países', async () => {
            const paises = await services.getCountries();
            expect(Array.isArray(paises));
            expect(paises.lenght).not.toEqual(0);
        });
    })

    describe('servicio de información de país', () => {
        test('obtiene información sobre un país, mediante un código de país válido', async () => {
            const code = 'AR';
            const info = await services.getCountryInfo(code);
            expect(info).toBeTruthy();
            expect(info).toHaveProperty('countryCode', code);
            const { borders } = info;
            expect(borders).toHaveLength(5);
        });
        test('retorna error con códigos de país inválidos', async () => {
            expect.assertions(2);
            const code1 = 999;
            try {
                await services.getCountryInfo(code1)
            } catch (error) {
                expect(error).toEqual(Error(`Country code ${code1} invalid.`));
            };
            const code2 = 'no existe';
            try {
                await services.getCountryInfo(code2)
            } catch (error) {
                expect(error).toEqual(Error('Request failed with status code 404'));
            };
        });
    })

    describe('servicio de obtención de feriados de un país', () => {
        test('obtiene los feriados de un país, mediante un año y código de país válido', async () => {
            const year = 2022;
            const code = 'AR';
            const days = await services.getCountryHolyDays(year, code);
            expect(days[0]).toHaveProperty('date', `${year}-01-01`);
        })
        test('retorna error con códigos inválidos de país', async () => {
            try {
                const year = 2022;
                const code = 'ARN';
                await services.getCountryHolyDays(year, code);
            } catch (error) {
                expect(error.response.status).toEqual(404);
                expect(error.isAxiosError).toBe(true);
            }
            try {
                const year = 2022;
                const code = { pais: 'AR' };
                await services.getCountryHolyDays(year, code);
            } catch (error) {
                expect(error).toEqual(Error('Country code [object Object] invalid.'));
            }
        })
        test('retorna error con años inválidos', async () => {
            const year1 = '2022';
            const code1 = 'AR';
            try {
                await services.getCountryHolyDays(year1, code1);
            } catch (error) {
                expect(error).toEqual(Error(`Year ${year1} invalid.`));
            }
            const year2 = 22222;
            const code2 = 'US';
            try {
                await services.getCountryHolyDays(year2, code2);
            } catch (error) {
                expect(error.response.status).toEqual(404);
                expect(error.isAxiosError).toEqual(true);
            }
        })
    })
});

// Continua observando el archivo: servicesWithMocks.test.js