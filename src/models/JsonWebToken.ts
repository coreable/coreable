export class JsonWebToken {
  public token?: unknown;
  public userID?: number;
  public exp?: number;
  public iat?: number;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}