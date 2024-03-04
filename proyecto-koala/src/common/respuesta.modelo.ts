
class Respuesta {

    Datos: any;
    Success: boolean | string;
    Message: string;
    ValidationErrors: any[];

    constructor(datos?:any, message?: string, success?: boolean, validationErrors?: any[]) {

        this.Datos = datos;
        this.Message = message
        this.Success = success
        this.ValidationErrors = validationErrors
        
    }

}

export default Respuesta;