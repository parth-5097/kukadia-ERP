import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class HttpinterceptInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let errorMsg = '';
          if (event.body.success === false) {
            errorMsg = `${event.body.field_msg}`;
            this.toastr.error(
              event.body.field_msg ? event.body.field_msg : event.body.message
            );
            if (
              event.body.statusCode === 499 ||
              event.body.statusCode === 498 ||
              event.body.statusCode === 401
            ) {
              this.router.navigate(['/login']);
            }
          } else {
            return event;
          }
        }
      })
    );
  }
}
