import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  // Base API, mọi request - response đều sẽ thông qua service này để quản lí
  // Thích hợp để quản lí loader, token, hoặc lỗi response như 401, 4o3
  constructor(
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    // const token = this.globalService.getToken();
    // request = token ? request.clone(
    //   {
    //     reportProgress: true,
    //     setHeaders: {
    //       authorization: `Bearer ${JSON.stringify(token)}`,
    //     },
    //   }
    // ) : request.clone({ reportProgress: true });
    request = request.clone({ reportProgress: true });
    return next.handle(request).pipe(tap(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          if (err.status === 401) {
            this.router.navigate(['auth/login']);
          }
        }
      }
    ), finalize(() => {
      this.onEnd();
    })
    );
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    // this.loaderService.show();
  }
  private hideLoader(): void {
    // this.loaderService.hide();
  }
}
