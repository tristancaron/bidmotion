import { RouterConfig } from "@angular/router";

import { SearchComponent } from "./+search/search.component";

export const routes: RouterConfig = [
  {path: '', redirectTo: 'search'},
  {path: 'search', component: SearchComponent}
];