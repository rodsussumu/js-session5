class ValidaCPF {
    // Definindo cpfLimpo e limpando
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }

    // Analisa se os numeros do cpf estao em sequencia 1111111
    éSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    // Gera armazena os dois ultimos digitos e devolve o cpf inteiro
    geraNovoCpf() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = this.geraDigito(cpfSemDigitos);
        const digito2 = this.geraDigito(cpfSemDigitos + digito1);
        this.novoCPF = cpfSemDigitos + digito1 + digito2
    }


    // Realiza conta dos 2 ultimos digitos
    geraDigito(cpfSemDigitos) {
        let total = 0;
        let reverso = Number(cpfSemDigitos.length) + 1;
        for(let stringNumerica of cpfSemDigitos) {
            total += reverso * Number(stringNumerica);
            reverso--;
        }
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    // Validaçao se é string, numero minimo, sequencia etc
    valida() {
       if(!this.cpfLimpo) return false;
       if(typeof this.cpfLimpo !== 'string') return false;
       if(this.cpfLimpo.length !== 11) return false;
       if(this.éSequencia()) return false;
       this.geraNovoCpf();
       return this.cpfLimpo === this.novoCPF;
    }
}

// instanciando novo cpf
// const validacpf = new ValidaCPF('070.987.720-03');
// console.log(validacpf.valida());
// if(validacpf.valida()) {
//     console.log('CPF Válido')
// } else {
//     console.log('CPF Invalido')
// }