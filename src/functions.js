export const factorial = (numero) => {
    return numero < 0 ? 0 : numero === 0 ? 1 : numero * factorial(numero - 1);
};

export const asincronia = async (usuario) => {
    const asincroniaMensajeError = (usuario) => {
        throw new Error('Usuario ' + usuario + ' no existe.');
    }
    const email = (usuario === 'Juan' ? 'juan@email.com' : asincroniaMensajeError(usuario));
    return new Promise(res => {
        setTimeout(() => res(email), 2000);
    });
};

export const calcular = function() {
    return {
        suma: function() {
            const args = [...arguments];
            return args.reduce((a, b) => a + b, 0);
        },
        multiplica: function () {
            const args = [...arguments];
            return args.reduce((a, b) => a * b, 1);
        },
        resta: function () {
            const args = [...arguments];
            return args.reduce((a, b) => a - b, 0);
        }
    };
};
