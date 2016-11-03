import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ListCommands {
  constructor(private http:Http) {
  }
  data: Object;

  title = 'hola mundo !!!! ';

  getCommands(callback): void {
    this.http.request('http://localhost:3000/api/command-public/all')
      .subscribe((res: Response) => {
        callback(res.json())
        //this.data = res.json();
      });
  }
}
