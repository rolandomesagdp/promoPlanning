import { of } from "rxjs";

export class RouteMock {
    snapshot = {
        params: {
            id: "1"
        }
    };
    
    queryParams = of({});

    navigate(routes: string[], params: any): void {
        
    }
}