import { Component, HostListener, OnInit } from '@angular/core';

import { ModalCoreService } from './services/modal-core.service';

import { IOnModalClose } from './on-modal-close.interface';
import { IAppModal } from './app-modal.interface';

@Component({
	template: '',
})
export abstract class AbstractModalComponent implements IAppModal, OnInit {
	abstract id: string;
	show: boolean = false;

	constructor(protected modalService: ModalCoreService) {}

	ngOnInit() {
		// subscribe to modal events
		this.modalService.modalSubject$.subscribe((modal: IAppModal) => {
			if (this.id === modal.id) {
				if (modal.show) this.open();
				else this.close();
			}
		});
	}

	// *~~*~~*~~ MODAL LOGIC ~~*~~*~~* //
	private open(): void {
		this.show = true;
	}

	private close(): void {
		this.show = false;

		// if the modal implements IOnModalClose, call the onClose method
		if ('onClose' in this) {
			(this as IOnModalClose).onClose();
		}
	}

	protected closeModal(): void {
		this.modalService.closeModal(this.id);
	}

	@HostListener('document:keydown.escape', ['$event'])
	onKeydownHandler() {
		this.closeModal();
	}
}
