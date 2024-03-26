import { CreateCancioneLinkDto } from "src/canciones/dto/crear-cancion-link.dto"

export const validarQueUnArregloDeStringNoTengaElementosRepetidos = (stringArrelgo: string[]) => {
    
    for (let index = 0; index < stringArrelgo.length; index++) {
        let A = stringArrelgo[index];
        for (let subIndex = 0; subIndex < stringArrelgo.length; subIndex++) {
            let B = stringArrelgo[subIndex];
            
            if(index !== subIndex)
            //console.log( `${ stringArrelgo[index] } : ${ stringArrelgo[subIndex] }; index: ${ index }, subIndice: ${ subIndex }`)
            // Si encuentra un elemento repetido, retorna false
                if (A === B) return {
                    hayElementosRepetidos: true,
                    elementosRepetidos: `${ A } : ${ B }`
                } 
        }
    }

    return {
        hayElementosRepetidos: false
    } 
}