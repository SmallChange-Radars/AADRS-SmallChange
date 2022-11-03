export class Token {

    constructor(
        public email: String,
        public roles: String[],
        public tokenType: String,
        public accessToken: String
    ){}
}
