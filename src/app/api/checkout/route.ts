import { NextResponse } from 'next/server';
import { shopifyClient } from '@/lib/shopify';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { lineItems } = body;

        if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
            return NextResponse.json(
                { error: 'Invalid or empty lineItems provided' },
                { status: 400 }
            );
        }

        // Call Shopify API through the shopifyClient helper
        const checkoutUrl = await shopifyClient.createCheckout(lineItems);

        if (checkoutUrl && checkoutUrl !== '#') {
            return NextResponse.json({ url: checkoutUrl });
        } else {
            return NextResponse.json(
                { error: 'Failed to create checkout session' },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('API checkout error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error during checkout' },
            { status: 500 }
        );
    }
}
