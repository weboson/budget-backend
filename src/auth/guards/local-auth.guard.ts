// отдельный класс AuthGuard - импортируется в server\src\auth\auth.controller.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}