import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetUsuario = createParamDecorator( 
    ( data: string, ctx: ExecutionContext ) => {

        console.log( data )
        const req = ctx.switchToHttp().getRequest()
        
        const usuario = req.user

        if( !usuario ) throw new InternalServerErrorException('Usuario no encontrado (request)')
        
        return ( !data ) ? usuario : usuario[data]
    return usuario
})