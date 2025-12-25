// Test script to check Figma API rate limit headers
// Run with: node test-figma-api.js

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || "YOUR_FIGMA_TOKEN_HERE";
const FILE_KEY = "GYUA6X0kSPC5Y4nnRb1SfQ";
const NODE_ID = "230:847";

async function testFigmaAPI() {
  const url = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${NODE_ID}`;

  console.log("Making request to Figma API...");
  console.log("URL:", url);
  console.log("");

  try {
    const response = await fetch(url, {
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
      },
    });

    console.log("=== Response Status ===");
    console.log("Status:", response.status, response.statusText);
    console.log("");

    console.log("=== Response Headers ===");
    for (const [key, value] of response.headers.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log("");

    // Specifically check for rate limit headers
    console.log("=== Rate Limit Info ===");
    console.log(
      "Retry-After:",
      response.headers.get("retry-after") || "Not present"
    );
    console.log(
      "X-Figma-Plan-Tier:",
      response.headers.get("x-figma-plan-tier") || "Not present"
    );
    console.log(
      "X-Figma-Rate-Limit-Type:",
      response.headers.get("x-figma-rate-limit-type") || "Not present"
    );
    console.log(
      "X-Figma-Upgrade-Link:",
      response.headers.get("x-figma-upgrade-link") || "Not present"
    );
    console.log("");

    if (response.ok) {
      const data = await response.json();
      console.log("=== Success! ===");
      console.log(
        "Response data:",
        JSON.stringify(data, null, 2).substring(0, 500) + "..."
      );
    } else {
      const errorText = await response.text();
      console.log("=== Error Response ===");
      console.log(errorText);
    }
  } catch (error) {
    console.error("=== Fetch Error ===");
    console.error(error.message);
  }
}

testFigmaAPI();
