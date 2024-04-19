import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true, // Enable TLS for secure connections
    authEndpoint: "/broadcasting/auth", // Laravel Echo auth endpoint
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Send authentication token
            // "X-CSRF-TOKEN": csrf_token,
            // Authorization: "Bearer " + cookies.get("access_token"),
            Accept: "application/json",
        },
    },
});

// export default pusher;
