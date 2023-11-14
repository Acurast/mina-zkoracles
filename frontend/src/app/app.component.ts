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

  btcPrice: string = '0';
  ethPrice: string = '0';
  minaPrice: string = '0';

  public selectedOffchainWorkerType: OffchainWorkerType = 'local';

  constructor(public readonly oracle: OracleService) {
    this.oracle.getPrices().then((prices) => {
      this.btcPrice = (Number(prices.btc) / 1000).toString();
      this.ethPrice = (Number(prices.eth) / 1000).toString();
      this.minaPrice = (Number(prices.mina) / 1000).toString();
    });
  }

  public setSelectedOffchainWorkerType(type: OffchainWorkerType) {
    this.selectedOffchainWorkerType = type;
  }
}