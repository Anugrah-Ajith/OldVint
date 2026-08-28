const SHOPIFY_STORE_DOMAIN = 'shopoldvint.myshopify.com';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'c2335bc8efbfbfd9a89333c7a94fbd0a';
const API_VERSION = '2024-01';

async function testCheckout(variantId) {
  const query = `mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { checkoutUrl }
      userErrors { field message }
    }
  }`;

  const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
    },
    body: JSON.stringify({ query, variables: { input: { lines: [{ merchandiseId: variantId, quantity: 1 }] } } })
  });
  console.log(JSON.stringify(await res.json(), null, 2));
}

testCheckout("gid://shopify/ProductVariant/101").catch(console.error);
