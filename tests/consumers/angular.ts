import '@angular/compiler';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { DgarzButton } from 'dgarz-design-angular';
import 'dgarz-design/tokens';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DgarzButton],
  template: `
    <dgarz-button variant="secondary" [disabled]="disabled" [loading]="loading" (dgarz-click)="count = count + 1">Guardar</dgarz-button>
    <button (click)="disabled = !disabled">Alternar deshabilitado</button>
    <button (click)="loading = !loading">Alternar carga</button>
    <output id="count">{{ count }}</output>
  `,
})
class App {
  disabled = false;
  loading = false;
  count = 0;
}
bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] });
