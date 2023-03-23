import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { NEVER, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { SnackbarService } from '@pp-core/snackbar';
import { LogService } from '@pp-core/logging';

@Injectable()
export class AuthCookieExpiredInterceptor implements HttpInterceptor {
  private className: string = "AuthCookieExpiredInterceptor";
  constructor(private authenticationService: AuthenticationService, 
    private snackBarService: SnackbarService, 
    private logger: LogService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => this.handleErrorResponse(errorResponse))
    );
  }

  private handleErrorResponse(errorResponse: HttpErrorResponse): Observable<never> {
    if(this.isUnauthorizedResponse(errorResponse)) {
      this.logger.error(this.className, "handleErrorResponse", "Unauthentication error retreived", errorResponse);
      this.authenticationService.logOut();
      this.snackBarService.openWarn("Your user session is expired. Please, login again");
      return NEVER;
    }
    else {
      return throwError(errorResponse);
    }
  }

  private isUnauthorizedResponse(errorResponse: HttpErrorResponse): boolean {
    return errorResponse.url.includes("Account/Login?ReturnUrl");
  }
}
