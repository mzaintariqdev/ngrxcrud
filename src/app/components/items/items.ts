import { Component, OnInit, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { selectAllItems } from '../../store/item/selectors/item.selectors';
import { addItem, deleteItem, loadItems, updateItem } from '../../store/item/actions/item.actions';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './items.html',
  styleUrls: ['./items.css'],
})
export class ItemsComponent implements OnInit {
  private store = inject(Store);

  items$ = this.store.select(selectAllItems);

  newTitle = signal('');
  editingId = signal<number | null>(null);

  ngOnInit() {
    this.store.dispatch(loadItems());
  }

  add() {
    if (!this.newTitle()) return;

    this.store.dispatch(
      addItem({
        item: {
          id: Date.now(),
          title: this.newTitle(),
        },
      }),
    );

    this.newTitle.set('');
  }

  edit(item: any) {
    this.newTitle.set(item.title);
    this.editingId.set(item.id);
  }

  update() {
    if (this.editingId() === null) return;

    this.store.dispatch(
      updateItem({
        item: {
          id: this.editingId()!,
          title: this.newTitle(),
        },
      }),
    );

    this.cancelEdit();
  }

  cancelEdit() {
    this.editingId.set(null);
    this.newTitle.set('');
  }

  delete(id: number) {
    this.store.dispatch(deleteItem({ id }));
  }
}
