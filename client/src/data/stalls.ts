export interface Stall {
    id: string;
    name: string;
    type: string;
    description: string;
    owner: string;
    booth: string;
    location: string;
    items: string[];
    priceRange: string;
    openingHours: { day: string; open: string; close: string }[];
    contact: { phone: string; email: string };
    image: string;
}

export const stalls: Stall[] = [
    {
        id: "stall-001",
        name: "Retro Bites — Food Court",
        type: "food",
        description: "Pixel-perfect snacks and neon-colored drinks. The main food hub of the festival.",
        owner: "Gourmet Pixels",
        booth: "F1-F5",
        location: "main-grounds",
        items: ["Glitch Burger", "Neon Soda", "8-bit Fries", "Cyber Cake"],
        priceRange: "₹50 - ₹250",
        openingHours: [
            { day: "2026-01-23", open: "10:00", close: "22:00" },
            { day: "2026-01-24", open: "10:00", close: "22:00" }
        ],
        contact: { phone: "+91-90000-11111", email: "food@usharama.edu" },
        image: "/assets/stalls/retro-bites.png"
    },
    {
        id: "stall-002",
        name: "VR Experience Zone",
        type: "gaming",
        description: "Immerse yourself in virtual worlds with the latest VR tech.",
        owner: "Virtual Reality India",
        booth: "G1",
        location: "gaming-hut",
        items: ["VR Quest", "Haptic Experience", "Metaverse Tour"],
        priceRange: "₹100/session",
        openingHours: [
            { day: "2026-01-23", open: "10:00", close: "18:00" },
            { day: "2026-01-24", open: "10:00", close: "18:00" }
        ],
        contact: { phone: "+91-90000-22222", email: "vr@gmail.com" },
        image: "/assets/stalls/vr-zone.png"
    },
    {
        id: "stall-003",
        name: "Custom PC Builders",
        type: "merchandise",
        description: "Get custom-built high-performance PC parts and expert advice.",
        owner: "Rig Master",
        booth: "M1-M3",
        location: "tech-lab",
        items: ["Custom Keyboards", "GPU Cooling Kits", "RGB Accessories"],
        priceRange: "Custom",
        openingHours: [
            { day: "2026-01-23", open: "09:00", close: "17:00" },
            { day: "2026-01-24", open: "09:00", close: "17:00" }
        ],
        contact: { phone: "+91-90000-33333", email: "rigmaster@gmail.com" },
        image: "/assets/stalls/custom-pc.png"
    },
    {
        id: "stall-004",
        name: "The Tech Thrift Store",
        type: "merchandise",
        description: "Second-hand gadgets, rare parts, and tech souvenirs at great prices.",
        owner: "Tech Recycle",
        booth: "T1",
        location: "open-ground",
        items: ["Rare Cables", "Old Consoles", "Tech Tees"],
        priceRange: "₹20 - ₹2000",
        openingHours: [
            { day: "2026-01-23", open: "09:00", close: "19:00" },
            { day: "2026-01-24", open: "09:00", close: "19:00" }
        ],
        contact: { phone: "+91-90000-44444", email: "thrift@gmail.com" },
        image: "/assets/stalls/tech-thrift.png"
    }
];
