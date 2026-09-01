"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCustomer } from "@/context/CustomerContext";
import {
    User as UserIcon,
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogOut,
    Package,
    MapPin,
    ArrowRight,
    Loader2,
    ChevronDown,
    AlertCircle,
    CheckCircle,
} from "lucide-react";

// ─── Auth Forms (Login / Register / Recover) ───────────────────────────────

function AuthForms() {
    const { login, register, recoverPassword } = useCustomer();
    const [mode, setMode] = useState<"login" | "register" | "recover">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg(null);
        setIsSubmitting(true);

        try {
            if (mode === "login") {
                await login(email, password);
            } else if (mode === "register") {
                await register({ email, password, firstName, lastName });
            } else {
                await recoverPassword(email);
                setSuccessMsg("If an account exists for this email, a password reset link has been sent.");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const switchMode = (newMode: "login" | "register" | "recover") => {
        setMode(newMode);
        setError(null);
        setSuccessMsg(null);
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-md mx-auto px-4 sm:px-6 py-14 sm:py-20">
                <div className="text-center mb-8">
                    <div className="h-16 w-16 bg-bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserIcon className="h-7 w-7 text-text-muted" />
                    </div>
                    <h1 className="font-serif text-2xl font-medium text-text-primary">
                        {mode === "login" ? "Welcome Back" : mode === "register" ? "Create Account" : "Reset Password"}
                    </h1>
                    <p className="text-sm text-text-secondary mt-1">
                        {mode === "login"
                            ? "Sign in to your Old Vint account"
                            : mode === "register"
                                ? "Join Old Vint for a personalized shopping experience"
                                : "Enter your email and we'll send you a reset link"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === "register" && (
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg text-sm text-text-primary bg-white focus:outline-none focus:border-text-primary transition-colors"
                                    placeholder="First"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-4 py-3 border border-border rounded-lg text-sm text-text-primary bg-white focus:outline-none focus:border-text-primary transition-colors"
                                    placeholder="Last"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-border rounded-lg text-sm text-text-primary bg-white focus:outline-none focus:border-text-primary transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    {mode !== "recover" && (
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 border border-border rounded-lg text-sm text-text-primary bg-white focus:outline-none focus:border-text-primary transition-colors"
                                    placeholder="••••••••"
                                    minLength={5}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {mode === "login" && (
                                <button
                                    type="button"
                                    onClick={() => switchMode("recover")}
                                    className="text-xs text-text-muted hover:text-text-secondary mt-1.5 transition-colors"
                                >
                                    Forgot password?
                                </button>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="flex items-start gap-2.5 p-3 bg-sale/5 border border-sale/20 rounded-lg">
                            <AlertCircle className="h-4 w-4 text-sale mt-0.5 shrink-0" />
                            <p className="text-xs text-sale">{error}</p>
                        </div>
                    )}

                    {successMsg && (
                        <div className="flex items-start gap-2.5 p-3 bg-success/5 border border-success/20 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                            <p className="text-xs text-success">{successMsg}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-accent text-text-inverse text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : mode === "login" ? (
                            "Sign In"
                        ) : mode === "register" ? (
                            "Create Account"
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center space-y-2">
                    {mode === "login" ? (
                        <p className="text-sm text-text-secondary">
                            Don&apos;t have an account?{" "}
                            <button onClick={() => switchMode("register")} className="text-text-primary font-medium hover:underline">
                                Create one
                            </button>
                        </p>
                    ) : (
                        <p className="text-sm text-text-secondary">
                            Already have an account?{" "}
                            <button onClick={() => switchMode("login")} className="text-text-primary font-medium hover:underline">
                                Sign in
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Account Dashboard ──────────────────────────────────────────────────────

function AccountDashboard() {
    const { customer, logout, refreshCustomer } = useCustomer();
    const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses">("overview");
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    if (!customer) return null;

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refreshCustomer();
        setIsRefreshing(false);
    };

    const formatPrice = (amount: string, currencyCode: string) =>
        parseFloat(amount).toLocaleString("en-IN", {
            style: "currency",
            currency: currencyCode === "INR" ? "INR" : currencyCode,
            minimumFractionDigits: 0,
        });

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const statusBadge = (status: string) => {
        const s = status?.toUpperCase() || "UNKNOWN";
        const color =
            s === "PAID" || s === "FULFILLED"
                ? "bg-success/10 text-success"
                : s === "PENDING" || s === "UNFULFILLED"
                    ? "bg-accent-gold/15 text-accent-gold"
                    : "bg-bg-muted text-text-secondary";
        return (
            <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase rounded ${color}`}>
                {s.replace(/_/g, " ")}
            </span>
        );
    };

    const tabs = [
        { id: "overview" as const, label: "Overview", icon: UserIcon },
        { id: "orders" as const, label: "Orders", icon: Package },
        { id: "addresses" as const, label: "Addresses", icon: MapPin },
    ];

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary">
                            My Account
                        </h1>
                        <p className="text-sm text-text-secondary mt-1">
                            Welcome back, {customer.firstName || customer.email}
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-border-dark transition-colors self-start"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 border-b border-border mb-8 overflow-x-auto">
                    {tabs.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === id
                                ? "border-text-primary text-text-primary"
                                : "border-transparent text-text-muted hover:text-text-secondary"
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-bg-surface border border-border rounded-xl p-5 space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Personal Information</h3>
                                <div className="space-y-2">
                                    <p className="text-sm text-text-primary font-medium">
                                        {customer.firstName} {customer.lastName}
                                    </p>
                                    <p className="text-sm text-text-secondary">{customer.email}</p>
                                    {customer.phone && (
                                        <p className="text-sm text-text-secondary">{customer.phone}</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-bg-surface border border-border rounded-xl p-5 space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Default Address</h3>
                                {customer.defaultAddress ? (
                                    <div className="space-y-1 text-sm text-text-secondary">
                                        <p>{customer.defaultAddress.address1}</p>
                                        {customer.defaultAddress.address2 && <p>{customer.defaultAddress.address2}</p>}
                                        <p>
                                            {customer.defaultAddress.city}, {customer.defaultAddress.province} {customer.defaultAddress.zip}
                                        </p>
                                        <p>{customer.defaultAddress.country}</p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-text-muted">No default address saved</p>
                                )}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="bg-bg-surface border border-border rounded-xl p-5 text-center">
                                <p className="text-2xl font-semibold text-text-primary">{customer.orders.length}</p>
                                <p className="text-xs text-text-muted mt-1">Total Orders</p>
                            </div>
                            <div className="bg-bg-surface border border-border rounded-xl p-5 text-center">
                                <p className="text-2xl font-semibold text-text-primary">{customer.addresses.length}</p>
                                <p className="text-xs text-text-muted mt-1">Saved Addresses</p>
                            </div>
                            <div className="col-span-2 sm:col-span-1 bg-bg-surface border border-border rounded-xl p-5 text-center">
                                <button
                                    onClick={handleRefresh}
                                    disabled={isRefreshing}
                                    className="text-sm text-text-secondary hover:text-text-primary font-medium transition-colors flex items-center gap-2 mx-auto"
                                >
                                    {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                                    Refresh Account
                                </button>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        {customer.orders.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-text-primary">Recent Orders</h3>
                                    <button
                                        onClick={() => setActiveTab("orders")}
                                        className="text-xs text-text-muted hover:text-text-primary flex items-center gap-1 transition-colors"
                                    >
                                        View All <ArrowRight className="h-3 w-3" />
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {customer.orders.slice(0, 3).map((order) => (
                                        <div key={order.id} className="flex items-center justify-between bg-bg-surface border border-border rounded-lg px-4 py-3">
                                            <div>
                                                <p className="text-sm font-medium text-text-primary">Order #{order.orderNumber}</p>
                                                <p className="text-xs text-text-muted">{formatDate(order.processedAt)}</p>
                                            </div>
                                            <div className="text-right flex items-center gap-3">
                                                {statusBadge(order.fulfillmentStatus)}
                                                <p className="text-sm font-semibold text-text-primary">
                                                    {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                    <div className="space-y-3 animate-fade-in">
                        {customer.orders.length === 0 ? (
                            <div className="text-center py-16">
                                <Package className="h-12 w-12 text-text-muted mx-auto mb-3" />
                                <p className="text-sm text-text-secondary">You haven&apos;t placed any orders yet.</p>
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-accent text-text-inverse text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
                                >
                                    Start Shopping <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        ) : (
                            customer.orders.map((order) => (
                                <div key={order.id} className="bg-bg-surface border border-border rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                        className="w-full flex items-center justify-between px-5 py-4 hover:bg-bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-text-primary">
                                                    Order #{order.orderNumber}
                                                </p>
                                                <p className="text-xs text-text-muted">{formatDate(order.processedAt)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {statusBadge(order.financialStatus)}
                                            {statusBadge(order.fulfillmentStatus)}
                                            <p className="text-sm font-semibold text-text-primary ml-2">
                                                {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                                            </p>
                                            <ChevronDown
                                                className={`h-4 w-4 text-text-muted transition-transform ${expandedOrder === order.id ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </div>
                                    </button>

                                    {expandedOrder === order.id && (
                                        <div className="border-t border-border px-5 py-4 space-y-3 animate-fade-in">
                                            {order.lineItems.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    {item.variant?.image?.url ? (
                                                        <div className="relative h-14 w-14 bg-bg-muted rounded-lg overflow-hidden shrink-0">
                                                            <Image
                                                                src={item.variant.image.url}
                                                                alt={item.variant.image.altText || item.title}
                                                                fill
                                                                className="object-cover"
                                                                sizes="56px"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="h-14 w-14 bg-bg-muted rounded-lg flex items-center justify-center shrink-0">
                                                            <Package className="h-5 w-5 text-text-muted" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-text-primary truncate">{item.title}</p>
                                                        <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
                                                    </div>
                                                    {item.variant?.price && (
                                                        <p className="text-sm font-medium text-text-primary">
                                                            {formatPrice(item.variant.price.amount, item.variant.price.currencyCode)}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Addresses Tab */}
                {activeTab === "addresses" && (
                    <div className="animate-fade-in">
                        {customer.addresses.length === 0 ? (
                            <div className="text-center py-16">
                                <MapPin className="h-12 w-12 text-text-muted mx-auto mb-3" />
                                <p className="text-sm text-text-secondary">No saved addresses yet.</p>
                                <p className="text-xs text-text-muted mt-1">Addresses will appear here after your first order.</p>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 gap-4">
                                {customer.addresses.map((addr) => (
                                    <div
                                        key={addr.id}
                                        className={`bg-bg-surface border rounded-xl p-5 space-y-1 ${customer.defaultAddress?.id === addr.id
                                            ? "border-text-primary"
                                            : "border-border"
                                            }`}
                                    >
                                        {customer.defaultAddress?.id === addr.id && (
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                                                Default
                                            </span>
                                        )}
                                        <p className="text-sm text-text-primary">{addr.address1}</p>
                                        {addr.address2 && <p className="text-sm text-text-secondary">{addr.address2}</p>}
                                        <p className="text-sm text-text-secondary">
                                            {addr.city}, {addr.province} {addr.zip}
                                        </p>
                                        <p className="text-sm text-text-secondary">{addr.country}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main Account Page ──────────────────────────────────────────────────────

export default function AccountPage() {
    const { isAuthenticated, isLoading } = useCustomer();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-3">
                    <Loader2 className="h-8 w-8 animate-spin text-text-muted mx-auto" />
                    <p className="text-sm text-text-secondary">Loading account...</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? <AccountDashboard /> : <AuthForms />;
}
