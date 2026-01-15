
const url = process.env.STRAPI_URL + "/api/modules";
console.log(`DEBUG: Attempting to fetch ${url} using Node fetch...`);

async function check() {
    try {
        const res = await fetch(url);
        console.log(`DEBUG: Status: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.log(`DEBUG: Response start: ${text.substring(0, 100)}`);
    } catch (e) {
        console.error("DEBUG: FETCH FAILED WITH ERROR:");
        console.error(e);
        if (e.cause) console.error("DEBUG: Cause:", e.cause);
    }
}

check();
