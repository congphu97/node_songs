import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabMenuMobile } from './components/tab-bottom/tab-menu.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DashBoardComponent },
  { path: 'user-detail', component: UserDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // [
      //   {
      //     path: '',
      //     component: TabMenuMobile,
      //     children: [
      //       {
      //         path: '',
      //         pathMatch: 'full',
      //         redirectTo: 'home',
      //       },
      //     ],
      //   },
      // ]
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
