import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConversationService } from './application';
import {Conversation} from './application'
import { ProcessRepository, ProcessRepositoryService } from './infrastructure';
import { AdvancedNotesComponent } from './presentation/advanced-notes.component';
import { MessageComponent } from './presentation/message/message.component';
import { ResponsiveTextComponent } from './presentation/message/responsive-text/responsive-text.component';
import { FilterComponent } from './presentation/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    AdvancedNotesComponent,
    MessageComponent,
    ResponsiveTextComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConversationService
    /*{
      provide: Conversation,
      useClass: ConversationService
    },*/,
    {
      provide: ProcessRepository,
      useClass: ProcessRepositoryService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
