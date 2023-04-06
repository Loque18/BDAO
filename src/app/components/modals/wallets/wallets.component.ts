import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ProviderType } from 'src/app/shared/celeste/celeste-types';
import { AbstractModalComponent } from 'src/app/shared/modal/abstract-modal.component';
import { IOnModalClose } from 'src/app/shared/modal/on-modal-close.interface';
import { ModalCoreService } from 'src/app/shared/modal/services/modal-core.service';
import { Web3Service } from 'src/app/shared/services/web3.service';
import { APP_MODALS } from 'src/app/shared/static/app.modals';

@Component({
	selector: 'app-wallets',
	templateUrl: './wallets.component.html',
	styleUrls: ['./wallets.component.scss'],
})
export class WalletsComponent extends AbstractModalComponent implements OnInit {
	// *~~*~~*~~ Injections ~~*~~*~~* //
	constructor(private _modalService: ModalCoreService, private w3svc: Web3Service) {
		super(_modalService);
	}

	override id: string = APP_MODALS.WALLETS;


	protected loading: boolean = false;


	protected connect(providerType: ProviderType): void {

		this.loading = true;

		from(this.w3svc.requestConnection(providerType)).subscribe({
			next: () => {
				this.loading = false;
				this.closeModal();
			},
			error: () => {
				this.loading = false;
			}
		})
	}
}
