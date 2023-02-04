import { RestApiService } from './../shared/services/rest-api.service';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _filtersService: FiltersService,
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  public ngOnDestroy(): void {
    this._filtersService.saveFiltresForm(this.form);
  }

  public search(): void {
    const formValue: FiltersData = this.form.value;
    
    this._filtersService.parseFilters(formValue);

    this.onFiltersChange.emit();
  }

  private _initForm(): void {
    const isFormSaved: boolean = !!this._filtersService.filtresForm;

    if (isFormSaved) {
      this.form = this._filtersService.filtresForm;
      return;
    }

    this.form = this._formBuilder.group({
      search: [''],
      select: [''],
      radio: [''],
    });
  }
}
