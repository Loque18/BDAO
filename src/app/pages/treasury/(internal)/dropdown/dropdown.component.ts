import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DropdownItem } from 'src/app/shared/models/dropdown-item';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
	@Input() items: Readonly<DropdownItem>[] = [];
	@Input() selected: DropdownItem = { id: '', value: '', label: '' };

	@Output() changeSelected: EventEmitter<DropdownItem> = new EventEmitter<DropdownItem>();

	// emit event
	select(item: DropdownItem): void {
		this.changeSelected.emit(item);

		this.close();
	}

	// *~~*~~*~~ Internal operations ~~*~~*~~* //

	protected open: boolean = false;

	toggle(): void {
		this.open = !this.open;
	}

	close(): void {
		this.open = false;
	}
}
