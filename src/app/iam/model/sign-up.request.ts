export class SignUpRequest {
  constructor(public username: string, public password: string, public roleId: number, public workshopId: number) {}
}
