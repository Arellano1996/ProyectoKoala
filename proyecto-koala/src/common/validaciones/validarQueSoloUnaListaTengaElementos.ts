import { ValidationArguments, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ async: false })
export class validarQueSoloUnaListaTengaElementos {
  validate(value: any, args: ValidationArguments) {
    //En object tenemos las propiedades de nuestro DTO con sus respectivos valores
    //En constraints se refiere a los parámetros adicionales que puedes proporcionar al utilizar el decorador @Validate
    const { object, constraints } = args;

    const arregloA: number = object[constraints[0]].length;
    const arregloB: number = object[constraints[1]].length;

    if (arregloA > 0 && arregloB > 0) return false;
    else return true;
  }

  defaultMessage(args: ValidationArguments) {
    const { object, constraints } = args;

    return `No se pueden proporcionar tanto ${constraints[0]} como ${constraints[1]} simultáneamente`;
  }
}
