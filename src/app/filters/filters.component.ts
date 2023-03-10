import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FiltersData } from '../shared/interfaces';
import { FiltersService } from '../shared/services/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() public onFiltersChange: EventEmitter<void> = new EventEmitter<void>();

  public filtersForm: FormGroup;

  public get hasRecentSearches(): boolean {
    return !!this._filtersService.recentSearches.length;
  }

  public get recentSearches(): FiltersData[] {
    return this._filtersService.recentSearches;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _filtersService: FiltersService,
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  public ngOnDestroy(): void {
    this._filtersService.saveFiltersForm(this.filtersForm);
  }

  public searchByFilters(): void {
    const filtersData: FiltersData = this.filtersForm.value;
    
    this._filtersService.saveLastFilter(this.filtersForm.value);
    this._filtersService.parseFilters(filtersData);
    this.onFiltersChange.emit();
  }

  public searchFromRecent(recentSearch: FiltersData): void {
    this.filtersForm.setValue(recentSearch);
    this.searchByFilters();
  }

  private _initForm(): void {
    const hasFiltersForm: boolean = !!this._filtersService.filtersForm;

    if (hasFiltersForm) {
      this.filtersForm = this._filtersService.filtersForm;
      return;
    }

    this.filtersForm = this._formBuilder.group({
      search: [''],
      status: [''],
      season: [''],
    });
  }
}
