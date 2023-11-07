import { Component } from '@angular/core';

type OffchainWorkerType = 'local' | 'acurast'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'acurast-mina-zkoracle';

  public selectedOffchainWorkerType: OffchainWorkerType = 'local'

  public setSelectedOffchainWorkerType(type: OffchainWorkerType) {
    this.selectedOffchainWorkerType = type
  }
}
