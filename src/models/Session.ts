export class Session {
  public token!: string | null;
  public userID!: number;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}