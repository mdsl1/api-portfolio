import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {

  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest();

    const requestSecret = request.headers['x-api-key'];
    const serverSecret = this.configService.get<string>('API_SECRET');

    if( !requestSecret || requestSecret !== serverSecret ) {
      throw new ForbiddenException( 'Acesso negado. Por segurança, tente novamente.' )
    }
    
    return true;
  }
}
