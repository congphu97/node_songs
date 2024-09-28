import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabMenuMobile } from './components/tab-bottom/tab-menu.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(
      // routes
      [
        {
          path: '',
          component: TabMenuMobile,
          children: [
            {
              path: '',
              pathMatch: 'full',
              redirectTo: 'home',
            },
            // {
            //   path: 'dash-board',
            //   loadChildren: () =>
            //     import('./dash-board/dash-board.module').then(
            //       (m) => m.DashBoardModule
            //     ),
            // },
            {
              path: 'new-track',
              loadChildren: () =>
                import('./components/new-track/new-track.module').then(
                  (m) => m.NewTrackModule
                ),
            },
          ],
        },
      ]
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
