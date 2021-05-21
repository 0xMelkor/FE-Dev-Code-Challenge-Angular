import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Conversation, ConversationService } from './application';
import { BoardRepository, BoardRepositoryService } from './infrastructure';
import { AdvancedNotesComponent } from './presentation/advanced-notes/advanced-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    AdvancedNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: Conversation,
      useClass: ConversationService
    },
    {
      provide: BoardRepository,
      useClass: BoardRepositoryService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
