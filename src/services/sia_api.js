const source = 'http://ec2-18-228-5-158.sa-east-1.compute.amazonaws.com:3000/';

const sia = {
    climate: async (lat, long, dataInicial, dataFinal, distancia) => {

        const request = await fetch(`${source}service/eto?lat=${lat}&lon=${long}&distance=${distancia}&startDate=${dataInicial}&endDate=${dataFinal}`)
        const resposta = await request.json();
        console.log('aqui', resposta);
        return resposta;
    },
    eto: async (lat, long, dataInicial, dataFinal, distancia) => {

        const request = await fetch(`${source}service/eto?lat=${lat}&lon=${long}&distance=${distancia}&startDate=${dataInicial}&endDate=${dataFinal}`)
        const resposta = await request.json();
        console.log('aqui', resposta);
        return resposta;
    },
    kc: async () => {

        const request = await fetch(`${source}kc?`)
        const resposta = await request.json();
        console.log('aqui', resposta);
        return resposta;
    },
    etc: async (lat, long, dataInicial, dataFinal, distancia, kc) => {

        const request = await fetch(`${source}service/etc?lat=${lat}&lon=${long}&distance=${distancia}&startDate=${dataInicial}&endDate=${dataFinal}&kc=${kc}`)
        const resposta = await request.json();
        console.log('aqui', resposta);
        return resposta;
    }
}

const requestElevation = async (lat, long) => {

    const request = await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${long}&key=AIzaSyA4qk-2c3Maa4iVFa3in9yg7MK5LBV5pfE`);
    const resposta = await request.json();
    const elevacao = resposta.results[0].elevation;

    return Math.round(elevacao);
}


module.exports = { sia, requestElevation };