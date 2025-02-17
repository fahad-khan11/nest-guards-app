import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./guards/auth.guards";

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController{
    constructor(private readonly appService:AppService){}

    @Get()
    someProtectedRoute(@Req() req){
        return {message : 'Accessed Resource',userId:req.userId};
    }
}