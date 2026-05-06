function somarHorariosDosClientes(filaDeClientes){
	let soma = 0
	filaDeClientes.forEach((cliente) => {
		soma += converterHorarioParaSegundos(cliente.horarioDeEntrada)
	})

	return soma
}

function calcularHorarioSincronizado(horarioDoServidor, filaDeClientes){
	const somaDosHorarios = somarHorariosDosClientes(filaDeClientes) + converterHorarioParaSegundos(horarioDoServidor)
	
	return somaDosHorarios / (filaDeClientes.length + 1)
}

function calcularDelaysDosClientes(horarioDoServidor, filaDeClientes){
	filaDeClientes.forEach((cliente) => {
		delaysDeHorarioDosClientes.push(
			{
				nome: cliente.nome,
				delay: calcularHorarioSincronizado(horarioDoServidor, filaDeClientes)
				-
				converterHorarioParaSegundos(cliente.horarioDeEntrada)
			}
		)
	})
}

function enviarRequisicao(cliente, horarioDeEnvio){

	let respectivoDelay = 0
	delaysDeHorarioDosClientes.forEach((delay) => {
		if(delay.nome === cliente.nome) respectivoDelay = delay.delay
	})

	const horarioDeEnvioLocal = cliente.enviar(horarioDeEnvio)
	filaDeRequisicoes.push({
		nome: cliente.nome,
		horarioDeEnvioSincronizado: converterHorarioParaSegundos(horarioDeEnvioLocal) + respectivoDelay
	})

	return horarioDeEnvioLocal
}

function organizarFilaDeRequisicoesOriginal(){
	let i = 0
	while(true){
		if(i >= filaDeRequisicoes.length - 1) break

		if(filaDeRequisicoes[i].horarioDeEnvioSincronizado > filaDeRequisicoes[i+1].horarioDeEnvioSincronizado){
			const _ = filaDeRequisicoes[i].horarioDeEnvioSincronizado
			filaDeRequisicoes[i].horarioDeEnvioSincronizado = filaDeRequisicoes[i+1].horarioDeEnvioSincronizado
			filaDeRequisicoes[i+1].horarioDeEnvioSincronizado = _
			i = 0
		}else{
			i++
		}
	}
}

function organizarFilaDeRequisicoes() {
	const filaDeEnviosOg = filaDeRequisicoes
    for (let i = 0; i < filaDeRequisicoes.length; i++) {
        for (let j = 0; j < filaDeRequisicoes.length - i - 1; j++) {
            if (filaDeRequisicoes[j].horarioDeEnvioSincronizado > filaDeRequisicoes[j + 1].horarioDeEnvioSincronizado) {
         		let temp = filaDeRequisicoes[j];
                filaDeRequisicoes[j] = filaDeRequisicoes[j + 1];
                filaDeRequisicoes[j + 1] = temp;
            }
        }
    }

    for(let i = 0; i < filaDeEnviosOg.length; i++){
    	for(let j = 0; j < filaDeEnviosOg.length - i - 1; j++){
    		if(converterHorarioParaSegundos(filaDeEnviosOg[j].envioOriginal) > converterHorarioParaSegundos(filaDeEnviosOg[j + 1].envioOriginal)){
    			let temp = filaDeEnviosOg[j].envioOriginal
    			filaDeEnviosOg[j].envioOriginal = filaDeEnviosOg[j + 1].envioOriginal
    			filaDeEnviosOg[j + 1].envioOriginal = temp
    		}
    	}
    }

    return filaDeEnviosOg
}

let filaDeClientes = [];
let delaysDeHorarioDosClientes = [];
let filaDeRequisicoes = [];

/*
const horarioDoServidor = "1:00"

const filaDeClientes = [
	criarCliente("c1", "2:00"),
	criarCliente("c2", "3:00"),
	criarCliente("c3", "4:00"),
]

const delaysDeHorarioDosClientes = []

const filaDeRequisicoes = []

const horarioSincronizado = calcularHorarioSincronizado(horarioDoServidor, filaDeClientes)

console.log(horarioSincronizado, converterSegundosParaHorario(horarioSincronizado))

calcularDelaysDosClientes(filaDeClientes)

enviarRequisicao(filaDeClientes[0], "2:15")
enviarRequisicao(filaDeClientes[1], "3:15")
enviarRequisicao(filaDeClientes[2], "4:15")

filaDeRequisicoes.forEach((requisicao) => {
	console.log(requisicao.nome, converterSegundosParaHorario(requisicao.horarioDeEnvioSincronizado))
})

*/