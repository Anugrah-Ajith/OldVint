"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { shopifyClient } from "@/lib/shopify";

interface CustomerAddress {
    id: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
}

interface CustomerOrder {
    id: string;
    orderNumber: number;
    processedAt: string;
    financialStatus: string;
    fulfillmentStatus: string;
    totalPrice: { amount: string; currencyCode: string };
    lineItems: {
        title: string;
        quantity: number;
        variant?: {
            image?: { url: string; altText: string };
            price: { amount: string; currencyCode: string };
        };
    }[];
}

interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    defaultAddress?: CustomerAddress;
    addresses: CustomerAddress[];
    orders: CustomerOrder[];
}

interface CustomerContextType {
    customer: Customer | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (input: { email: string; password: string; firstName?: string; lastName?: string }) => Promise<void>;
    logout: () => void;
    recoverPassword: (email: string) => Promise<void>;
    refreshCustomer: () => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

const TOKEN_KEY = "oldvint_customer_token";
const TOKEN_EXPIRY_KEY = "oldvint_customer_token_expiry";

function getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!token || !expiry) return null;
    if (new Date(expiry) <= new Date()) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
        return null;
    }
    return token;
}

function storeToken(accessToken: string, expiresAt: string) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt);
}

function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

function mapCustomerData(raw: any): Customer {
    return {
        id: raw.id,
        firstName: raw.firstName || "",
        lastName: raw.lastName || "",
        email: raw.email,
        phone: raw.phone || undefined,
        defaultAddress: raw.defaultAddress || undefined,
        addresses: raw.addresses?.edges?.map((e: any) => e.node) || [],
        orders: raw.orders?.edges?.map((e: any) => ({
            id: e.node.id,
            orderNumber: e.node.orderNumber,
            processedAt: e.node.processedAt,
            financialStatus: e.node.financialStatus,
            fulfillmentStatus: e.node.fulfillmentStatus,
            totalPrice: e.node.totalPrice,
            lineItems: e.node.lineItems?.edges?.map((li: any) => ({
                title: li.node.title,
                quantity: li.node.quantity,
                variant: li.node.variant
                    ? {
                        image: li.node.variant.image || undefined,
                        price: li.node.variant.price,
                    }
                    : undefined,
            })) || [],
        })) || [],
    };
}

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshCustomer = useCallback(async () => {
        const token = getStoredToken();
        if (!token) {
            setCustomer(null);
            setIsLoading(false);
            return;
        }
        try {
            const raw = await shopifyClient.getCustomer(token);
            if (raw) {
                setCustomer(mapCustomerData(raw));
            } else {
                clearToken();
                setCustomer(null);
            }
        } catch {
            clearToken();
            setCustomer(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Validate stored token on mount
    useEffect(() => {
        refreshCustomer();
    }, [refreshCustomer]);

    const login = useCallback(async (email: string, password: string) => {
        const { accessToken, expiresAt } = await shopifyClient.customerAccessTokenCreate(email, password);
        storeToken(accessToken, expiresAt);
        const raw = await shopifyClient.getCustomer(accessToken);
        if (raw) {
            setCustomer(mapCustomerData(raw));
        }
    }, []);

    const register = useCallback(async (input: { email: string; password: string; firstName?: string; lastName?: string }) => {
        const result = await shopifyClient.customerCreate(input);
        if (result.customerUserErrors?.length > 0) {
            throw new Error(result.customerUserErrors.map((e: any) => e.message).join(", "));
        }
        // Auto-login after successful registration
        await login(input.email, input.password);
    }, [login]);

    const logout = useCallback(() => {
        clearToken();
        setCustomer(null);
    }, []);

    const recoverPassword = useCallback(async (email: string) => {
        const result = await shopifyClient.customerRecover(email);
        if (result.customerUserErrors?.length > 0) {
            throw new Error(result.customerUserErrors.map((e: any) => e.message).join(", "));
        }
    }, []);

    return (
        <CustomerContext.Provider
            value={{
                customer,
                isAuthenticated: !!customer,
                isLoading,
                login,
                register,
                logout,
                recoverPassword,
                refreshCustomer,
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomer = () => {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error("useCustomer must be used within a CustomerProvider");
    }
    return context;
};
