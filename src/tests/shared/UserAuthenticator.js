import localStorage from 'localStorage';
import cookies from 'js-cookie';

export default class UserAuthenticator {
    static loginCaptain() {
        const user = {
            "nickname": "test4",
            "name": "test4@gmail.com",
            "picture": "https://s.gravatar.com/avatar/58090ea9184cf410bac8ee57bc5f985f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            "updated_at": "2019-06-20T14:22:39.083Z",
            "email": "test4@gmail.com",
            "email_verified": false,
            "iss": "https://bethewave.auth0.com/",
            "sub": "auth0|5d0b8e286ae4f900040c1983",
            "aud": "Rqye0D70khKhE1LVQrsA6rRSugk24KxK",
            "iat": 1561040559,
            "exp": 1561076559,
            "at_hash": "i6WtRllPTAz7wp-pF7w6zQ",
            "nonce": "YsnF81PS9V_gTOw-ArfV38etcEgPrLxh",
            "role": "captain"
        };

        const tokenInfo = {
            "token": "_S_VrhAL--zwXq6iNgmIy4V8Jo9qbKwt",
            "idToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5UTTBPVU5FTXpkRk16aEZPVEEwUlVNeU5UZ3pOalZCUWpkRE1EQXdRakkwTkVFeU56WXdSQSJ9.eyJuaWNrbmFtZSI6InRlc3Q0IiwibmFtZSI6InRlc3Q0QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci81ODA5MGVhOTE4NGNmNDEwYmFjOGVlNTdiYzVmOTg1Zj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnRlLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE5LTA2LTIwVDE0OjIyOjM5LjA4M1oiLCJlbWFpbCI6InRlc3Q0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9iZXRoZXdhdmUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVkMGI4ZTI4NmFlNGY5MDAwNDBjMTk4MyIsImF1ZCI6IlJxeWUwRDcwa2hLaEUxTFZRcnNBNnJSU3VnazI0S3hLIiwiaWF0IjoxNTYxMDQwNTU5LCJleHAiOjE1NjEwNzY1NTksImF0X2hhc2giOiJpNld0UmxsUFRBejd3cC1wRjd3NnpRIiwibm9uY2UiOiJZc25GODFQUzlWX2dUT3ctQXJmVjM4ZXRjRWdQckx4aCJ9.E6gV-FwDuN7gI3LoqvGoh98hAEb3Yz47e9EwIav-1Fs5mzVkh_7WD0f9kbPfBGDTuW1Ean-rh5IImz37k2G3SRiwdI2BBjlKYJvP2u2bHGVm5YW867DfyBGSx2eifS6oqoUZP8OS63T6Pa8ZkIFHEICW4FJOyNINHebe36I7PzpJRyAIP5RNts3V06F6nQ_29e6Oos-saZiqRCDCbngJY3MC4JmAuuEKoc6ibr4bCHEM4LC2DF2l-zegBoAjVY_foVLlaO97GtVi7KQh8S4UIl9RAUmaoOAa3TpskPE18MXFYhYrp21RsabM6aqsd_MJXQvWrcmnlUhDp9_tQ5iMuA",
            "expiresIn": 7200,
            "startTime": 1561040560782
        };

        localStorage.setItem('user', JSON.stringify(user));
        cookies.set('tokenInfo', JSON.stringify(tokenInfo));
    }
}