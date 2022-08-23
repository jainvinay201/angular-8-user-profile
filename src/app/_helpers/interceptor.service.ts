import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable(
    { providedIn: "root" }
)
export class InterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('exclude') !== undefined && req.headers.get('exclude') !== null) {
            const newHeaders = req.headers.delete('exclude')
            const newRequest = req.clone({ headers: newHeaders });
            return next.handle(newRequest);
        }
        else {
            req = req.clone({
                headers: req.headers.set(
                    "Authorization",
                    "Bearer " + localStorage.getItem("token")
                ),
                // url: reqUrl + "" + req.url
            });
            return next.handle(req);
        }
    }

}