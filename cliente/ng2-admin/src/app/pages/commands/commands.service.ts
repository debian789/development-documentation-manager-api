import {Injectable, Inject} from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class CommandsService {
  constructor( @Inject('serviceData') private serviceData) {
  }
  data: Object;

  title = 'hola mundo !!!! ';

  getCommands(callback): void {
    this.serviceData.getData('command-public/all',(data) => {
      callback(data)
    })
  }

  getCommand(id,callback): void {
    this.serviceData.getData('command-public/command/' + id, (data) => {
      callback(data)
    })
  }
}
