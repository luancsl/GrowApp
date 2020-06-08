import { Constants } from "@common";

export default {
    climate: async (lat, long, dataInicial, dataFinal, distancia) => {

        const request = await fetch(`http://${Constants.SIA_API_Address}:3000/service/currentEto?lat=${lat}&lon=${long}&distance=${distancia}&startDate=${dataInicial}&endDate=${dataFinal}`)
        const resposta = await request.json();

        return resposta;
    },
    eto: (lat, long, dataInicial, dataFinal, distance = 100, service = 'inmet', type = 'station', equation = 'penman-monteith') => {

        const request = fetch(`http://${Constants.SIA_API_Address}:3000/service/currentEto?lat=${lat}&lon=${long}&distance=${distance}&startDate=${dataInicial}&endDate=${dataFinal}&service=${service}&type=${type}&equation=${equation}`).then((value) => (value.json()));

        return request;
    },
    kc: () => {
        const request = fetch(`http://${Constants.SIA_API_Address}:3000/kc?`).then((value) => value.json());
        return request;
    },
    etc: async (lat, long, dataInicial, dataFinal, distancia, kc) => {

        const request = await fetch(`http://${Constants.SIA_API_Address}:3000/service/etc?lat=${lat}&lon=${long}&distance=${distancia}&startDate=${dataInicial}&endDate=${dataFinal}&kc=${kc}`)
        const resposta = await request.json();

        return resposta;
    },
    station: async (lat, long, distancia) => {
        const request = await fetch(`http://${Constants.SIA_API_Address}:3000/station/stationsDistance?lat=${lat}&lon=${long}&distance=${distancia}`)
        const resposta = await request.json();

        return resposta;
    }
}