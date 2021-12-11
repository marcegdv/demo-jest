export const factorial = (numero) => {
    return numero < 1 ? 1 : numero * factorial(numero - 1);
}

export const api = async (usuario) => {
    const email = usuario === 'Juan' ? 'juan@email.com' : ''
    return new Promise(res => {
        setTimeout(() => {
            res(email);
        }, 2000);
    });
}

export const calcular = function() {
    return {
        suma: function() {
            const args = [...arguments];
            return args.reduce((a, b) => a + b, 0);
        },
        resta: function () {
            const args = [...arguments];
            return args.reduce((a, b) => a - b, 0);
        }
    }
}
