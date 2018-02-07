/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { BrandComponent } from './brand/brand.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { SummaryComponent } from './summary/summary.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: 'consumption', pathMatch: 'full'},
    {path: 'brand', component: BrandComponent},
    {path: 'consumption', component: ConsumptionComponent},
    {path: 'summary', component: SummaryComponent},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
