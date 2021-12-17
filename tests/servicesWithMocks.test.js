/*

    En este archivo de test se realiza un mock completo de un módulo, el cual será "axios".
    Ya que la función services consume una API pública y gratuira que actualmente está
    funcionando, y la vamos a utilizar para realizar ejemplos de como mockear las
    respuestas de la API, ya que si la API que queremos testear es crítica para un negocio
    o tarda demasiado en respnder, lo mas práctico es hacer un mock de sus respuestas.

*/
import axios from 'axios';
import * as services from '../src/services/services';
import * as mockResponses from './mocks/servicesResponsesMocks';

/* De desta manera, jest va a mockear axios, y nos
permitirá decirle a axios que tiene que responder. */
jest.mock('axios');

describe('test de los servicios de la api de feriados con moks', () => {

    describe('servicio de obtención de países', () => {
        test('obtiene la lista de países (mock response en este test)', async () => {
            //Mock de una response reducida de la API.
            const responseMock = {
                data: [
                    { "countryCode": "AR", "name": "Argentina" },
                    { "countryCode": "US", "name": "United States" }
                ]
            };
            /*El método .mockResolvedValue() es el valor que retornará axios como si
            la response fuese status 200. */
            axios.get.mockResolvedValue(responseMock);

            const paises = await services.getCountries();
            expect(Array.isArray(paises));
            expect(paises).toHaveLength(2);
        });
        test('obtiene la lista de países (mock response importado)', async () => {
            /*En este caso, el mock lo importamos desde otro archivo, para limpiar
            el código de los test y utilizar una respuesta mockeada que es idéntica
            a la de la API. */
            axios.get.mockResolvedValue(mockResponses.countries);
            const paises = await services.getCountries();
            expect(Array.isArray(paises));
            expect(paises).toHaveLength(110);
        });
    });

    describe('servicio de información de país', () => {
        /* beforeAll() - Setup para un grupo de tests:
        El código incluido en la función beforeAll() se ejecutara antes de que comiencen
        los test. En este caso, se ejecutará antes que los dos test que le siguen, ya
        que solo abarca los test que contiene la función describe() que se encuentra
        justo encima de este comentario. Por lo tanto, es muy importante tener en cuenta
        el scope de las funciones, constantes y variables, que también aplica para jest.
        */
        beforeAll(() => {
            axios.get.mockResolvedValueOnce(mockResponses.countryInfo);
            axios.get.mockRejectedValueOnce({
                config: {},   // no es necesario agregar este atributo, solo ejeplifica que
                request: {},  // el mock puede conener lo mínimo necesario para testear...
                response: {
                    status: 404,
                    statusText: 'Not found',
                    headers: {},  // ...que estamos mockeando una response 404 de axios.
                    data: {  //json con información que brinda la API
                        "type": "mocked_type",
                        "title": "Not Found",
                        "status": 404,
                        "traceId": "mockedId",
                    },
                },
                isAxiosError: true,
            });
        })
        /* Tambien existen otras funciones para realizar el Setup y Teardown:
        Setup:
            beforeAll(): ya explicada.
            beforeEach(): se ejecutará antes de cada test.
        Teardown:
            afterAll(): se ejecuta una sola vez luego de finalizados los tests.
            afterEach(): se ejecutará luego de cada test.
        
        Importante: Recordar el scope al momento de utilizar estas funciones.
        */
        test('obtiene información sobre un país válido (mock response importado)', async () => {
            const code = 'AR';
            const info = await services.getCountryInfo(code);
            expect(info).toBeTruthy();
            expect(info).toHaveProperty('countryCode', code);
            const { borders } = info;
            expect(borders).toHaveLength(5);
        });
        test('retorna error con código de país inválido', async () => {
            const code = 'código inválido';
            try {
                await services.getCountryInfo(code)
            } catch (error) {
                expect(error.isAxiosError).toBe(true);
                expect(error.response.status).toEqual(404);
            };
        });
    });

    /* Observa el siguiente grupo de test, teniendo en cuenta el scope
    de todo este archivo de tests, ya que hay un ejercicio en las siguientes
    líneas...
    */
    describe('servicio de obtención de feriados de un país', () => {
        test('obtiene los feriados de un país', async () => {
            axios.get.mockResolvedValue({
                data: [
                    {
                        "date": "2022-01-01",
                        "localName": "Año Nuevo",
                        "countryCode": "AR",
                    },
                ],
            });
            const year = 2022;
            const code = 'AR';
            const days = await services.getCountryHolyDays(year, code);
            expect(days[0]).toHaveProperty('date', `${year}-01-01`);
            expect(days[0]).toHaveProperty('countryCode', code);
        });
        test('retorna error con códigos inválidos de país', async () => {
            axios.get.mockRejectedValue({
                response: {
                    status: 404,
                    statusText: 'Not found',
                    data: {
                        traceId: 'mockedId',
                    }
                },
                isAxiosError: true,
            });
            try {
                const year = 2022;
                const code = 'ARN';
                await services.getCountryHolyDays(year, code);
            } catch (error) {
                expect(error.response.status).toEqual(404);
                expect(error.isAxiosError).toBe(true);
                expect(error.response.data).toHaveProperty('traceId');
            };
        });
        /* Ejercicio:
        Con los ejemplos vistos, y los comentarios anteriores, tal vez puedas
        responder los siguientes enunciados:
        a) ¿Por qué el siguiente test falla si aislamos su ejecución, pero se
        resuelve bien si ejecutamos los tres test a partir de la función
        describe() que los contiene?
        b) Escribe el código que falta para que el test pueda ser ejecutado
        aisladamente y se resuelva.
        */
        test('retorna error con años inválidos', async () => {
            const year1 = '2022';
            const code1 = 'AR';
            try {
                await services.getCountryHolyDays(year1, code1);
            } catch (error) {
                expect(error).toEqual(Error(`Year ${year1} invalid.`));
            };
            const year2 = 22222;
            const code2 = 'US';
            try {
                await services.getCountryHolyDays(year2, code2);
            } catch (error) {
                expect(error.response.status).toEqual(404);
                expect(error.isAxiosError).toEqual(true);
            };
        });
    });
});