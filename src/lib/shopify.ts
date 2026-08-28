import { PRODUCTS, COLLECTIONS, Product, Collection } from "./products-data";

// Shopify Storefront API Configuration
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "c2335bc8efbfbfd9a89333c7a94fbd0a";
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "shopoldvint.myshopify.com";
const API_VERSION = "2024-01";

// Helper check to determine if Shopify is active
const isShopifyConfigured = () => {
  return (
    SHOPIFY_STORE_DOMAIN.trim() !== "" &&
    SHOPIFY_STOREFRONT_ACCESS_TOKEN.trim() !== ""
  );
};

// Generic Shopify Fetch client
async function shopifyFetch<T>({
  query,
  variables = {},
  cache: useCache = true,
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: boolean;
}): Promise<{ data: T; errors?: any[] } | null> {
  if (!isShopifyConfigured()) {
    console.warn("Shopify is not configured. Domain:", SHOPIFY_STORE_DOMAIN, "Token present:", !!SHOPIFY_STOREFRONT_ACCESS_TOKEN);
    return null;
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

  try {
    // Build fetch options - only include `next` revalidation in server-side contexts
    const isServer = typeof window === "undefined";
    const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    };

    if (isServer && useCache) {
      fetchOptions.next = { revalidate: 60 };
    }

    const response = await fetch(endpoint, fetchOptions);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Shopify API error ${response.status}: ${response.statusText}`, errorBody);
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error("Shopify GraphQL errors:", JSON.stringify(json.errors, null, 2));
    }

    return json;
  } catch (error) {
    console.error("Failed to query Shopify Storefront API:", error);
    return null;
  }
}

// Client Export Object
export const shopifyClient = {
  // Get collections
  async getCollections(): Promise<Collection[]> {
    if (isShopifyConfigured()) {
      const query = `
        query getCollections {
          collections(first: 10) {
            edges {
              node {
                id
                title
                handle
                description
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      `;
      const res = await shopifyFetch<{ collections: { edges: any[] } }>({ query });
      if (res && res.data && res.data.collections) {
        return res.data.collections.edges.map((edge) => ({
          id: edge.node.id,
          title: edge.node.title,
          handle: edge.node.handle,
          description: edge.node.description || "",
          imageUrl: edge.node.image?.url || "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop",
        }));
      }
    }
    // Fallback Mock data
    return COLLECTIONS;
  },

  // Get collections details
  async getCollection(handle: string): Promise<Collection | null> {
    if (isShopifyConfigured()) {
      const query = `
        query getCollection($handle: String!) {
          collection(handle: $handle) {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      `;
      const res = await shopifyFetch<{ collection: any }>({
        query,
        variables: { handle },
      });
      if (res && res.data && res.data.collection) {
        const c = res.data.collection;
        return {
          id: c.id,
          title: c.title,
          handle: c.handle,
          description: c.description || "",
          imageUrl: c.image?.url || "",
        };
      }
    }
    return COLLECTIONS.find((c) => c.handle === handle) || null;
  },

  // Get list of products with filters
  async getProducts({
    query = "",
    sortKey = "BEST_SELLING",
    reverse = false,
    collectionHandle = "",
  }: {
    query?: string;
    sortKey?: string;
    reverse?: boolean;
    collectionHandle?: string;
  } = {}): Promise<Product[]> {
    if (isShopifyConfigured()) {
      // Query filter structure
      let filterQuery = "";
      if (collectionHandle) filterQuery += `collection:${collectionHandle} `;
      if (query) filterQuery += `${query}`;

      const graphqlQuery = `
        query getProducts($query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
          products(first: 20, query: $query, sortKey: $sortKey, reverse: $reverse) {
            edges {
              node {
                id
                title
                handle
                description
                descriptionHtml
                availableForSale
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 5) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                options {
                  name
                  values
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const res = await shopifyFetch<{ products: { edges: any[] } }>({
        query: graphqlQuery,
        variables: {
          query: filterQuery.trim() || undefined,
          sortKey: sortKey === "PRICE" ? "PRICE" : sortKey === "REVELANCE" ? "RELEVANCE" : sortKey === "CREATED_AT" ? "CREATED_AT" : "BEST_SELLING",
          reverse,
        },
      });

      if (res && res.data && res.data.products) {
        return res.data.products.edges.map((edge) => {
          const node = edge.node;
          return {
            id: node.id,
            title: node.title,
            handle: node.handle,
            description: node.description || "",
            descriptionHtml: node.descriptionHtml || "",
            availableForSale: node.availableForSale,
            images: node.images.edges.map((img: any) => ({
              url: img.node.url,
              altText: img.node.altText || node.title,
            })),
            priceRange: {
              minVariantPrice: {
                amount: node.priceRange.minVariantPrice.amount,
                currencyCode: node.priceRange.minVariantPrice.currencyCode,
              },
            },
            compareAtPriceRange: node.compareAtPriceRange?.minVariantPrice ? {
              minVariantPrice: {
                amount: node.compareAtPriceRange.minVariantPrice.amount,
                currencyCode: node.compareAtPriceRange.minVariantPrice.currencyCode,
              },
            } : undefined,
            variants: node.variants.edges.map((v: any) => ({
              id: v.node.id,
              title: v.node.title,
              price: {
                amount: v.node.price.amount,
                currencyCode: v.node.price.currencyCode,
              },
              compareAtPrice: v.node.compareAtPrice ? {
                amount: v.node.compareAtPrice.amount,
                currencyCode: v.node.compareAtPrice.currencyCode,
              } : undefined,
              availableForSale: v.node.availableForSale,
              selectedOptions: v.node.selectedOptions,
            })),
            options: node.options,
            collections: [], // dynamic connection doesn't strictly need details populated for listings
            rating: 4.8, // Fallback Shopify meta field rating
            condition: "Excellent (Grade A)",
            year: 1980,
            specs: [],
          };
        });
      }
    }

    // --- Dynamic Fallback Mock Filters & Sorting ---
    let items = [...PRODUCTS];

    // Filter by Collection
    if (collectionHandle) {
      items = items.filter((p) => p.collections.includes(collectionHandle));
    }

    // Filter by Search Query
    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.specs.some((spec) => spec.value.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortKey === "PRICE") {
      items.sort((a, b) => {
        const valA = parseFloat(a.priceRange.minVariantPrice.amount);
        const valB = parseFloat(b.priceRange.minVariantPrice.amount);
        return reverse ? valB - valA : valA - valB;
      });
    } else if (sortKey === "REVERSE_TITLE") {
      items.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortKey === "TITLE") {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortKey === "NEWEST") {
      items.sort((a, b) => b.year - a.year);
    }
    // Default best selling / relevance keeps items in base order

    return items;
  },

  // Get individual product details
  async getProduct(handle: string): Promise<Product | null> {
    if (isShopifyConfigured()) {
      const query = `
        query getProduct($handle: String!) {
          product(handle: $handle) {
            id
            title
            handle
            description
            descriptionHtml
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            options {
              name
              values
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      `;
      const res = await shopifyFetch<{ product: any }>({
        query,
        variables: { handle },
      });
      if (res && res.data && res.data.product) {
        const p = res.data.product;
        return {
          id: p.id,
          title: p.title,
          handle: p.handle,
          description: p.description || "",
          descriptionHtml: p.descriptionHtml || "",
          availableForSale: p.availableForSale,
          images: p.images.edges.map((img: any) => ({
            url: img.node.url,
            altText: img.node.altText || p.title,
          })),
          priceRange: {
            minVariantPrice: {
              amount: p.priceRange.minVariantPrice.amount,
              currencyCode: p.priceRange.minVariantPrice.currencyCode,
            },
          },
          compareAtPriceRange: p.compareAtPriceRange?.minVariantPrice ? {
            minVariantPrice: {
              amount: p.compareAtPriceRange.minVariantPrice.amount,
              currencyCode: p.compareAtPriceRange.minVariantPrice.currencyCode,
            },
          } : undefined,
          variants: p.variants.edges.map((v: any) => ({
            id: v.node.id,
            title: v.node.title,
            price: {
              amount: v.node.price.amount,
              currencyCode: v.node.price.currencyCode,
            },
            compareAtPrice: v.node.compareAtPrice ? {
              amount: v.node.compareAtPrice.amount,
              currencyCode: v.node.compareAtPrice.currencyCode,
            } : undefined,
            availableForSale: v.node.availableForSale,
            selectedOptions: v.node.selectedOptions,
          })),
          options: p.options,
          collections: [],
          rating: 4.8,
          condition: "Excellent (Grade A)",
          year: 1980,
          specs: [],
        };
      }
    }

    return PRODUCTS.find((p) => p.handle === handle) || null;
  },

  // Get recommendations
  async getRecommendedProducts(productId: string): Promise<Product[]> {
    if (isShopifyConfigured()) {
      const query = `
        query getRecommendations($productId: ID!) {
          productRecommendations(productId: $productId) {
            id
            title
            handle
            description
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      `;
      const res = await shopifyFetch<{ productRecommendations: any[] }>({
        query,
        variables: { productId },
      });
      if (res && res.data && res.data.productRecommendations) {
        return res.data.productRecommendations.map((p) => ({
          id: p.id,
          title: p.title,
          handle: p.handle,
          description: p.description || "",
          availableForSale: p.availableForSale,
          images: p.images.edges.map((img: any) => ({
            url: img.node.url,
            altText: img.node.altText || p.title,
          })),
          priceRange: {
            minVariantPrice: {
              amount: p.priceRange.minVariantPrice.amount,
              currencyCode: p.priceRange.minVariantPrice.currencyCode,
            },
          },
          compareAtPriceRange: p.compareAtPriceRange?.minVariantPrice ? {
            minVariantPrice: {
              amount: p.compareAtPriceRange.minVariantPrice.amount,
              currencyCode: p.compareAtPriceRange.minVariantPrice.currencyCode,
            },
          } : undefined,
          variants: [],
          collections: [],
          rating: 4.8,
          condition: "Excellent",
          year: 1980,
          specs: [],
        }));
      }
    }

    // Default mock behavior - recommend items from the same collections, skipping direct match
    const currentProduct = PRODUCTS.find((p) => p.id === productId);
    if (!currentProduct) return PRODUCTS.slice(0, 3);
    const related = PRODUCTS.filter(
      (p) =>
        p.id !== productId &&
        p.collections.some((col) => currentProduct.collections.includes(col))
    );
    return related.length > 0 ? related.slice(0, 4) : PRODUCTS.slice(0, 4);
  },

  // Create a checkout session utilizing Storefront API cartCreate
  async createCheckout(lineItems: { variantId: string; quantity: number }[]): Promise<string> {
    if (!isShopifyConfigured()) {
      console.warn("Shopify not configured, cannot create checkout");
      return "#";
    }

    console.log("Creating Shopify checkout with line items:", JSON.stringify(lineItems));

    const mutation = `
            mutation cartCreate($input: CartInput!) {
                cartCreate(input: $input) {
                    cart {
                        checkoutUrl
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
        `;

    const input = {
      lines: lineItems.map((item) => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      }))
    };

    const res = await shopifyFetch<{ cartCreate: any }>({
      query: mutation,
      variables: { input },
      cache: false, // Never cache mutations
    });

    console.log("Shopify cartCreate response:", JSON.stringify(res, null, 2));

    if (res?.data?.cartCreate?.cart?.checkoutUrl) {
      return res.data.cartCreate.cart.checkoutUrl;
    }

    if (res?.data?.cartCreate?.userErrors?.length) {
      console.error("Cart creation failed:", res.data.cartCreate.userErrors);
      throw new Error(res.data.cartCreate.userErrors.map((e: any) => e.message).join(", "));
    }

    if (!res) {
      throw new Error("No response from Shopify API - check network and credentials");
    }
    return "#";
  }
};
