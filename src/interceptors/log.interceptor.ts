import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - now;
        console.log(`${req.method} ${req.url} ${time}ms`);
      }),
    );
  }
}
