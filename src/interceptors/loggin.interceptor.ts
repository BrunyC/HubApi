import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  
    const now = Date.now();
    console.log('Antes....'+ now + 'ms');
    return next.handle().pipe(
      tap(() => {
        console.log('Depois...' + (Date.now() - now) + 'ms');
      }),
    );
  }
}
