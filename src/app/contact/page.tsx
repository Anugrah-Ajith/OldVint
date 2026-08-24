import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with OldVint. We're here to help with orders, returns, and questions.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-12">
                <div className="text-center space-y-3">
                    <h1 className="font-serif text-3xl sm:text-4xl font-medium text-text-primary">Contact Us</h1>
                    <p className="text-sm text-text-secondary max-w-md mx-auto">
                        Have a question about an order or need help finding the right product? We&apos;re here for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Mail, title: "Email", detail: "oldvintofficial@gmail.com", sub: "We reply within 24 hours" },
                        { icon: Phone, title: "Phone", detail: "+91 94824 59303", sub: "Mon-Sat, 10am-6pm IST" },
                        { icon: MapPin, title: "Address", detail: "OldVint HQ", sub: "Bangalore, India" },
                    ].map(({ icon: Icon, title, detail, sub }) => (
                        <div key={title} className="bg-bg-muted rounded-xl p-6 text-center space-y-2">
                            <Icon className="h-5 w-5 text-text-muted mx-auto" />
                            <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
                            <p className="text-sm text-text-primary">{detail}</p>
                            <p className="text-xs text-text-muted">{sub}</p>
                        </div>
                    ))}
                </div>

                <form className="space-y-5 max-w-xl mx-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Name" className="px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-text-primary transition-colors" />
                        <input type="email" placeholder="Email" className="px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-text-primary transition-colors" />
                    </div>
                    <input type="text" placeholder="Subject" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-text-primary transition-colors" />
                    <textarea placeholder="Your message" rows={5} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-text-primary transition-colors resize-none" />
                    <button type="submit" className="w-full py-3 bg-accent text-text-inverse text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
