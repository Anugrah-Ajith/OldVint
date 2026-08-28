const SHOPIFY_STORE_DOMAIN = 'shopoldvint.myshopify.com';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'c2335bc8efbfbfd9a89333c7a94fbd0a';
const API_VERSION = '2024-01';

async function fetchProducts() {
  const query = `query getProducts {
    products(first: 5) {
      edges {
        node {
          id
          title
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }`;

  const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
    },
    body: JSON.stringify({ query })
  });

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));

  if (data?.data?.products?.edges?.[0]) {
    const variantId = data.data.products.edges[0].node.variants.edges[0].node.id;
    console.log("Found variant:", variantId);
    await testCheckout(variantId);
  }
}

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

fetchProducts().catch(console.error);
