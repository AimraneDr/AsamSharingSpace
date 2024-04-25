import Echo from "laravel-echo";
import Pusher from "pusher-js";

console.log("exho file is called");
// NOTE: Enable pusher logging - don't include this in production
Pusher.logToConsole = true;
window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true, // Enable TLS for secure connections
    authEndpoint: "/broadcasting/auth",
    // authEndpoint: "/pusher/auth",
    // auth: {
    //     headers: {
    //         "X-CSRF-TOKEN": window.Laravel.csrfToken,
    //     },
    // },
});