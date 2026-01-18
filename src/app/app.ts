import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlowSideComponent } from './slow-side/slow-side.component';
import { FastSideComponent } from './fast-side/fast-side.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SlowSideComponent, FastSideComponent],
  template: `
    <div class="h-screen w-screen flex flex-col p-4 gap-4 bg-gray-100">
      <header class="text-center mb-4">
        <h1 class="text-3xl font-bold mb-2">Angular Performance: Zone.js vs Signals</h1>
        <p class="text-gray-600">Left: Bad Practices + Heavy Computation. Right: Signals + OnPush + Optimized.</p>
      </header>
      
      <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
        <app-slow-side class="h-full overflow-hidden"></app-slow-side>
        <app-fast-side class="h-full overflow-hidden"></app-fast-side>
      </div>
    </div>
  `,
})
export class App {
  title = 'angular-performance-demo';
}
