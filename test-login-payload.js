process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function run() {
  console.log("=== TESTING DAKSHAM ADMIN LOGIN ===");
  try {
    const res = await fetch("https://daksham.vercel.app/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "dakshambuilders@gmail.com",
        password: "daksham@2027"
      })
    });

    const data = await res.json();
    console.log("Login API Status:", res.status);
    console.log("Login Response Body:", JSON.stringify(data, null, 2));

    const cookie = res.headers.get("set-cookie");
    if (cookie) {
      console.log("Received auth cookie!");
      const manageRes = await fetch("https://daksham.vercel.app/manage", {
        headers: { Cookie: cookie },
        redirect: "manual"
      });
      console.log("Manage Page Access Status:", manageRes.status);
      console.log("Manage Page Location Header:", manageRes.headers.get("location"));
    }
  } catch (err) {
    console.error("Login test failed:", err);
  }
}

run();
