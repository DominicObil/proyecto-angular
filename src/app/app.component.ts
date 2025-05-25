import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent], // Agrega aquí HeaderComponent y FooterComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corregido a styleUrls
})
export class AppComponent {
  title = 'dwese-app-logger-angular';
}
