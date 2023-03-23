import { HttpParams } from '@angular/common/http';

export interface ToHttpParam {
    toHttpParams(): HttpParams;
}