import { Component } from '@angular/core';
import { OracleService } from './oracle.service';

type OffchainWorkerType = 'local' | 'acurast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'acurast-mina-zkoracle';

  public selectedOffchainWorkerType: OffchainWorkerType = 'local';

  constructor(public readonly oracle: OracleService) {
    this.oracle.fetchData();
  }

  public setSelectedOffchainWorkerType(type: OffchainWorkerType) {
    this.selectedOffchainWorkerType = type;
  }
}
