export default async (lat, long) => {

    const request = await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${long}&key=AIzaSyA4qk-2c3Maa4iVFa3in9yg7MK5LBV5pfE`);
    const resposta = await request.json();
    const elevacao = resposta.results[0].elevation;

    return Math.round(elevacao);
}
