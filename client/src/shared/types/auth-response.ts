import { Account } from "@modules/settings/models/Account";

export type AuthResponse = {
    user: Account;
    access_token?: string;
    refresh_token?: string;
}
