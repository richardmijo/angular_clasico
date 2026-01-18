import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOCK_SONGS } from '../mock-data';

@Component({
    selector: 'app-fast-side',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="border-4 border-green-500 p-4 h-full flex flex-col bg-green-50">
      <h2 class="text-xl font-bold text-green-700 mb-4">LADO RÁPIDO (Signals)</h2>
      <p class="text-sm text-gray-600 mb-2">Instantáneo y fluido.</p>
      
      <input 
        type="text" 
        [value]="filterTerm()"
        (input)="onSearch($event)"
        placeholder="Filtrar 3000 canciones..."
        class="w-full p-2 border border-green-300 rounded mb-4 focus:ring-2 focus:ring-green-500 outline-none"
      >

      <div class="overflow-y-auto flex-1 space-y-2">
        @for (song of filteredSongs(); track song.id) {
          <div class="bg-white p-3 rounded shadow flex items-center gap-3">
            <img [src]="song.cover" class="w-10 h-10 rounded bg-gray-200">
            <div>
              <h3 class="font-semibold text-gray-800">{{ song.title }}</h3>
              <p class="text-xs text-gray-500">{{ song.artist }}</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class FastSideComponent {
    songs = signal(MOCK_SONGS);
    filterTerm = signal('');

    filteredSongs = computed(() => {
        const term = this.filterTerm().toLowerCase();
        const list = this.songs();

        // Computation is only re-evaluated when signals change, and Memoized!
        return list.filter(s =>
            s.title.toLowerCase().includes(term) ||
            s.artist.toLowerCase().includes(term)
        );
    });

    onSearch(event: Event) {
        const input = event.target as HTMLInputElement;
        this.filterTerm.set(input.value);
    }

    constructor() {
        // Only logs when constructed
        console.log('🟢 FastSide: Inicializado');
    }
}
