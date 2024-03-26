
export const cuantoElementosVerdaderosTieneElArreglo = (boolArrelgo: boolean[]) => {
    
    let elementosVerdaderos = 0;

    boolArrelgo.forEach(bool => {
        if(bool) elementosVerdaderos++;
    })

    return elementosVerdaderos
}