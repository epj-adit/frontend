export class JwtToken {
    header: {
        alg: string
    };
    payload: {
        sub: string,
        permissions: string[],
        iss: string,
        exp: number
    };
    signature: string;
}