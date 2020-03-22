export class Session {
  public sessionID?: string;
  public expiresAt!: Date | string;
  public token!: string | null;
  public userID!: number;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}