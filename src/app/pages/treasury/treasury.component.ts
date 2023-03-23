import { Component, OnInit } from '@angular/core';
import { Itreasury } from 'src/app/constants/brick-treasury';
import { TreasuryService } from './s/treasury.service';

import { assetTypes } from 'src/app/shared/constants/asset-types';

import { DropdownItem } from 'src/app/shared/models/dropdown-item';

import { type TreasuryResponse } from 'src/app/shared/api/responses';

function genItems(): Itreasury[] {
	const items: Itreasury[] = [];

	for (let i = 0; i < 10; i++) {
		items.push({
			id: i.toString(),
			amount: Math.round(Math.random() * 4000) + 1000,
			name: 'Property',
			quantity: Math.round(Math.random() * 5) + 5,
		});
	}

	return items;
}

@Component({
	selector: 'app-treasury',
	templateUrl: './treasury.component.html',
	styleUrls: ['./treasury.component.scss'],
})
export class TreasuryComponent implements OnInit {
	items2: Itreasury[] = genItems();
	protected _assetTypes: DropdownItem[] = assetTypes;
	protected _selectedAssetType: DropdownItem = this._assetTypes[0];

	constructor(protected treasurySvc: TreasuryService) {}

	ngOnInit(): void {
		this.treasurySvc.fetchAssets();
	}

	changeAssetType(assetType: DropdownItem): void {
		this.treasurySvc.changeSelected(assetType.value);
		this._selectedAssetType = assetType;
	}
}
