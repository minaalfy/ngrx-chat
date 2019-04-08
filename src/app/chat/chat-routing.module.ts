import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { extract } from "@app/core";
import { ChatComponent } from "./chat.component";

const routes: Routes = [
  { path: "", redirectTo: "/chat", pathMatch: "full" },
  { path: "chat", component: ChatComponent, data: { title: extract("Chat") } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ChatRoutingModule {}
