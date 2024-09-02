import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { LetrasLiveSQLService } from "./letras-live-sql.service";
import { CrearLetraLive } from "./dto-SQL/crear-letra-live-dto";

@Controller('letras-live')
export class LetraLiveController {

    constructor(private readonly letraliveSQLService: LetrasLiveSQLService) { }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string){
        return this.letraliveSQLService.findByUsuarioId( id )
    }

    @Post()
    create(@Body() crearLetraLive: CrearLetraLive) {
        return this.letraliveSQLService.create( crearLetraLive )
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) usuarioId: string) {
        return this.letraliveSQLService.delete( usuarioId );
    }
}