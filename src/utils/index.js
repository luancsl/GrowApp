import _penmanMonteith from './penman-monteith';
import _hargreavesSamani from './hargreaves-samani';


export default (equation) => {
    switch (equation) {
        case 'penman-monteith':
            return [_penmanMonteith, equation];
        case 'hargreaves-samani':
            return [_hargreavesSamani, equation];
        default:
            return [_penmanMonteith, 'penman-monteith'];
    }
} 