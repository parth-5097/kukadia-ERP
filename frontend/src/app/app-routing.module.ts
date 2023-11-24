import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminGuard } from './guard/super-admin.guard';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyPasswordComponent } from './pages/verify-password/verify-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./lazy/dashboard.module')
            .then((m) => m.DashboardModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./lazy/users.module')
            .then((m) => m.UsersModule)
            .catch((e) => console.error(e)),
        canActivate: [SuperAdminGuard],
      },
      {
        path: 'branch',
        loadChildren: () =>
          import('./lazy/branch.module')
            .then((m) => m.BranchModule)
            .catch((e) => console.error(e)),
        canActivate: [SuperAdminGuard],
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./lazy/inventory.module')
            .then((m) => m.InventoryModule)
            .catch((e) => console.error(e)),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./lazy/invoice.module')
            .then((m) => m.InvoiceModule)
            .catch((e) => console.error(e)),
      },
      {
        path: 'purchase',
        loadChildren: () =>
          import('./lazy/purchase.module')
            .then((m) => m.PurchaseModule)
            .catch((e) => console.error(e)),
      },
      {
        path: 'transaction',
        loadChildren: () =>
          import('./lazy/transaction.module')
            .then((m) => m.TransactionModule)
            .catch((e) => console.error(e)),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./lazy/account.module')
            .then((m) => m.AccountModule)
            .catch((e) => console.error(e)),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./lazy/settings.module')
            .then((m) => m.SettingsModule)
            .catch((e) => console.error(e)),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./lazy/profile.module')
            .then((m) => m.ProfileModule)
            .catch((e) => console.error(e)),
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('./lazy/notification.module')
            .then((m) => m.NotificationModule)
            .catch((e) => console.error(e)),
      },
      {
        path: 'ship',
        loadChildren: () =>
          import('./lazy/ship.module')
            .then((m) => m.ShipModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'track',
        loadChildren: () =>
          import('./lazy/track.module')
            .then((m) => m.TrackModule)
            .catch((err) => console.error(err)),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgotpass',
    component: ForgotPasswordComponent,
  },
  {
    path: 'setpassword/:token',
    component: VerifyPasswordComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
