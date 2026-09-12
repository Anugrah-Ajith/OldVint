import { NextResponse } from 'next/server';
import { shopifyClient } from '@/lib/shopify';

export async function POST(request: Request) {
  try {
    const { lineItems } = await request.json();
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ error: 'No line items provided' }, { status: 400 });
    }
    // Expect lineItems shape: [{ variantId: string, quantity: number }]
    const url = await shopifyClient.createCheckout(lineItems);
    if (!url || url === '#') {
      return NextResponse.json({ error: 'Failed to create checkout URL' }, { status: 500 });
    }
    return NextResponse.json({ url }, { status: 200 });
  } catch (error: any) {
    console.error('Checkout API error:', error);
    const message = error?.message || 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
