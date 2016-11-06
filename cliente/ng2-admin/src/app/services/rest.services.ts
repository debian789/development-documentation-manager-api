import {Injectable, Inject} from "@angular/core";
import {Http, Response} from "@angular/http";

@Injectable()
export class ResetServices {

  constructor(private http:Http, @Inject('constansGlobal') private constansGlobal) {
    console.log(constansGlobal.urlConection)
  }

  public getData(url,callback) {
    this.http.request(this.constansGlobal.urlConection, url)  // 'http://localhost:3000/api/command-public/all')
      .subscribe((res: Response) => {
        callback(res.json())
      });
  }

  postData() {}

  putData() {}

  deleteData() {}

}
