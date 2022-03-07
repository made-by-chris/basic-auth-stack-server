const secret = process.env.JWT_SECRET;

function destroyWord(password) {
  return password + secret;
}

console.log(destroyWord(123));
console.log(destroyWord(123));

hashing;

// {
//     username: "chris",
//     password: 15253
// }

// more server memory
// const sessions = {
//     "127192981273": {
//         loggedIn: false,
//         sessionStartedAt: 12361827612,
//         shoppingCartProducts: [12,1,232,424,644,1,4,9]
//     },
//     "91289731273": {
//         loggedIn: true,
//         user_id: "12oi3j12d8qqwd",
//         sessionStartedAt: 12361827612
//     }
// }
// vs nothing!

// more internets
// "127192981273" vs
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
