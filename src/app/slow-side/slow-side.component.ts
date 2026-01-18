import { Component, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_SONGS, Song } from '../mock-data';

@Component({
    selector: 'app-slow-side',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="border-4 border-red-500 p-4 h-full flex flex-col bg-red-50">
      <h2 class="text-xl font-bold text-red-700 mb-4">LADO LENTO (Zone.js)</h2>
      <p class="text-sm text-gray-600 mb-2">Escribe para sentir el lag...</p>
      
      <input 
        type="text" 
        [(ngModel)]="filterTerm"
        placeholder="Filtrar 3000 canciones..."
        class="w-full p-2 border border-red-300 rounded mb-4 focus:ring-2 focus:ring-red-500 outline-none"
      >

      <div class="overflow-y-auto flex-1 space-y-2">
        <div *ngFor="let song of filteredSongs" class="bg-white p-3 rounded shadow flex items-center gap-3">
          <img [src]="song.cover" class="w-10 h-10 rounded bg-gray-200">
          <div>
            <!-- CALLING HEAVY FUNCTION HERE -->
            <h3 class="font-semibold">{{ getHeavyTitle(song) }}</h3>
            <p class="text-xs text-gray-500">{{ song.artist }}</p>
          </div>
        </div>
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
export class SlowSideComponent implements DoCheck {
    filterTerm = '';
    songs = MOCK_SONGS;

    // Bad practice: Filtering in a getter (runs on every cycle checks potentially)
    get filteredSongs() {
        return this.songs.filter(s =>
            s.title.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
            s.artist.toLowerCase().includes(this.filterTerm.toLowerCase())
        );
    }

    getHeavyTitle(song: Song): string {
        // Math usage to simulate heavy work
        const start = performance.now();
        while (performance.now() - start < 0.2) {
            // Busy wait for 0.2ms per item -> 3000 items = 600ms lag per frame!
            // This might be TOO slow (freezing browser completely).
            // Let's try the loop suggestion: "ciclo for de 500 iteraciones"
        }

        // Following the user prompt exactly:
        // "ciclo for de 500 iteraciones o una secuencia Fibonacci"
        // 500 iterations is very fast usually.
        // Let's do something noticeable but not infinite freeze.
        let result = 0;
        for (let i = 0; i < 500; i++) {
            result += Math.sqrt(i) * Math.sin(i);
        }

        return song.title;
    }

    ngDoCheck() {
        console.log('🔴 SlowSide: Detectando cambios...');
    }
}
