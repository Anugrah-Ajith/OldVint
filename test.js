const domain = 'shopoldvint.myshopify.com';
const token = 'c2335bc8efbfbfd9a89333c7a94fbd0a';

fetch(`https://${domain}/api/2024-01/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token
  },
  body: JSON.stringify({
    query: `
      query {
        products(first: 1) {
          edges {
            node {
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
      }
    `
  })
}).then(res => res.json()).then(data => {
  if (data.errors) {
      console.error(data.errors);
      return;
  }
  const variantId = data.data.products.edges[0].node.variants.edges[0].node.id;
  console.log('Variant ID:', variantId);
  return fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token
    },
    body: JSON.stringify({
      query: `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart { checkoutUrl }
            userErrors { field message }
          }
        }
      `,
      variables: {
        input: { lines: [{ merchandiseId: variantId, quantity: 1 }] }
      }
    })
  });
}).then(res => res ? res.json() : null).then(data => console.log('CartCreate:', JSON.stringify(data, null, 2))).catch(err => console.error(err));
