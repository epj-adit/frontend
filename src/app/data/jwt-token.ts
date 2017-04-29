export class JwtToken {
    sub: string;
    permissions: string[];
    iss: string;
    exp: number;
}