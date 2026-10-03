const { BASE, EMAIL, PASS } = process.env;

if (!BASE || !EMAIL || !PASS) {
  console.error("Missing BASE, EMAIL, or PASS.");
  process.exit(1);
}

const N = [1, 10, 25, 50];

console.log("Backend:", BASE);
console.log("Email:", EMAIL);

const login = await fetch(`${BASE}/users/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: EMAIL,
    password: PASS
  })
});

console.log("Login status:", login.status);

const loginText = await login.text();

console.log("Login response:", loginText);

if (!login.ok) {
  console.error("❌ Login failed. Stopping test.");
  process.exit(1);
}

let loginData;

try {
  loginData = JSON.parse(loginText);
} catch {
  console.error("❌ Login response is not valid JSON.");
  process.exit(1);
}

const { token } = loginData;

if (!token) {
  console.error("❌ No token received from login.");
  console.log(loginData);
  process.exit(1);
}

console.log("✅ Login successful\n");

const url =
  `${BASE}/rides/get-fare?pickup=` +
  `${encodeURIComponent("Amrita Vishwa Vidyapeetham Chennai")}` +
  `&destination=` +
  `${encodeURIComponent("Kodambakkam Chennai")}`;

for (const n of N) {
  const results = await Promise.all(
    Array.from({ length: n }, async () => {
      const start = performance.now();

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const ms = performance.now() - start;

        return {
          ms,
          ok: response.ok,
          status: response.status
        };
      } catch (error) {
        return {
          ms: performance.now() - start,
          ok: false,
          status: "NETWORK_ERROR",
          error: error.message
        };
      }
    })
  );

  const latencies = results
    .map(x => x.ms)
    .sort((a, b) => a - b);

  const successful = results.filter(x => x.ok).length;

  const average =
    latencies.reduce((a, b) => a + b, 0) / n;

  const p95Index = Math.min(
    n - 1,
    Math.ceil(n * 0.95) - 1
  );

  console.log(
    `${n} concurrent | ` +
    `ok ${successful}/${n} | ` +
    `avg ${average.toFixed(0)} ms | ` +
    `p95 ${latencies[p95Index].toFixed(0)} ms`
  );

  if (successful !== n) {
    const statusCounts = {};

    for (const result of results) {
      if (!result.ok) {
        statusCounts[result.status] =
          (statusCounts[result.status] || 0) + 1;
      }
    }

    console.log("   Failed status codes:", statusCounts);
  }
}