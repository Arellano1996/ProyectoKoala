
class res {
    
    Datos: any;
    Success: boolean;
    Message: string;
    ValidationErrors: string[];

    /*
        Solo hay 3 escensarios posibles
        1.- El primer argumento es de tipo [any[], number] o object; consulta correcta
        2.- El primer argumento es de tipo string[]; validationError
        3.- El primer argumento es un string; No hubo resultados en alguna busqueda
    */

    constructor(datos?: any, message?: string) {

        this.Message = message
        this.Success = true

        //Caso 1 Todo se manda correctamente, datos es tipo [any[], number]
        if (Array.isArray(datos) && Array.isArray(datos[0]) && typeof datos[1] === 'number'
        || typeof datos === 'object') {
            //Si datos es de tipo [any[], number], significa que hay una respuesta correcta
            this.Datos = datos
        }
        
        //Caso 2 datos es tipo string[] 
        if (Array.isArray(datos) && datos.every(item => typeof item === 'string')) {
            //Si datos es un arreglo de strings, significa que se está mandando validationsErrors
            //this.ValidationErrors recibe datos y this.Datos no se inicializa
            this.ValidationErrors = datos
            this.Success = false
        }

        //Caso 3 datos es un string
        if(typeof datos === 'string' && !message){
            this.Message = datos
            this.Datos = []
        }
        
    }

}

export default res;