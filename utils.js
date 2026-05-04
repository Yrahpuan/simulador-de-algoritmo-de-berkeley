function criarCliente(nome, horarioDeEntrada){
	const horas = parseInt(horarioDeEntrada.split(":")[0])
	if(horas > 25 && horas < 0) return "formato de horas inválido"

	const minutos = parseInt(horarioDeEntrada.split(":")[1])
	if(minutos > 60 && minutos < 0) return "formato de minutos inválido"

	return {
		nome: nome,
		horarioDeEntrada: horarioDeEntrada,
		horarioDeEnvio: null,
		enviar: function(horarioDeEnvio){
			this.horarioDeEnvio = horarioDeEnvio
			return this.horarioDeEnvio
		},
	}
}

function converterHorarioParaSegundos(horario){
	const horas = parseInt(horario.split(":")[0])
	const minutos = parseInt(horario.split(":")[1])

	return (horas * 3600) + (minutos * 60)
}


// versão que trata o sinal
function converterSegundosParaHorario(segundos) {
    const sinal = segundos < 0 ? "-" : "";
    const segundosAbs = Math.abs(segundos);
    const h = Math.floor(segundosAbs / 3600);
    const m = Math.floor((segundosAbs % 3600) / 60);
        
    return `${sinal}${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// versão antiga sem converter o sinal
function converterSegundosParaHorario1(segundos){
	const horas = parseInt(segundos / 3600)
	const minutos = ((segundos / 3600) - horas) * 60
	//const minutos = (segundos % 3600) / 60

	let resultado = `${horas}:${Math.floor(minutos)}`

	if(minutos < 10 && minutos > 0) resultado = `${horas}:0${Math.floor(minutos)}`

	if(horas < 10 && horas > 0) return "0" + resultado

	return resultado
}