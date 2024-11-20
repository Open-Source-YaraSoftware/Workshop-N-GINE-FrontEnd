export class SignInResponse {
  constructor(public id: number, public username: string, public roleId: number, public workshopId: number, public token: string) {}
}
