import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.events.list.path, async (req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get(api.events.get.path, async (req, res) => {
    const event = await storage.getEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  });

  app.get(api.stalls.list.path, async (req, res) => {
    const stalls = await storage.getStalls();
    res.json(stalls);
  });

  app.get(api.stalls.get.path, async (req, res) => {
    const stall = await storage.getStall(req.params.id);
    if (!stall) {
      return res.status(404).json({ message: 'Stall not found' });
    }
    res.json(stall);
  });

  app.post(api.registrations.create.path, async (req, res) => {
    try {
      const input = api.registrations.create.input.parse(req.body);
      const registration = await storage.createRegistration(input);
      res.status(201).json({ message: 'Registration successful', id: registration.id });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data
  await seedDatabase(storage);

  return httpServer;
}

async function seedDatabase(storage: IStorage) {
  // Clear existing events to force re-seed with new list
  await storage.clearEvents();
  const existingEvents = await storage.getEvents();
  if (existingEvents.length === 0) {
    const events = [
      // MECH
      {
        id: "evt-mech-001",
        title: "Tech Olympics",
        type: "tech",
        shortDescription: "Mechanical engineering challenges and contests.",
        fullDescription: "A series of hands-on technical challenges designed for mechanical engineering enthusiasts.",
        date: "2026-01-23",
        startTime: "09:00",
        endTime: "13:00",
        venueArea: "Block C",
        teamSize: 2,
        registrationFee: 100,
        prize: "Trophies & Certificates",
        rules: ["Standard safety gear required", "Participants must bring college ID"],
        tags: ["mechanical", "competition"],
        image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-mech-002",
        title: "Go Karting",
        type: "tech",
        shortDescription: "Race your way to victory.",
        fullDescription: "Experience the thrill of high-speed racing in our custom-designed karting track.",
        date: "2026-01-23",
        startTime: "14:00",
        endTime: "17:00",
        venueArea: "Main Grounds",
        teamSize: 1,
        registrationFee: 100,
        prize: "Cash Prize & Medals",
        rules: ["Helmets mandatory", "Strict adherence to track signals"],
        tags: ["racing", "mechanical"],
        image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      // CSE, AIML & DS
      {
        id: "evt-cse-001",
        title: "Tech Talks",
        type: "tech",
        shortDescription: "Insightful sessions on emerging technologies.",
        fullDescription: "Expert talks on AI, Machine Learning, and the future of Computing.",
        date: "2026-01-23",
        startTime: "10:00",
        endTime: "12:00",
        venueArea: "Seminar Hall A",
        teamSize: 1,
        registrationFee: 100,
        prize: "Learning Materials & Certificates",
        rules: ["No recording without permission"],
        tags: ["AI", "ML", "Computer Science"],
        image: "https://images.unsplash.com/photo-1540575861501-7cf05a4112fb?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cse-002",
        title: "Cryptic Crosswords",
        type: "tech",
        shortDescription: "Solve the code, win the game.",
        fullDescription: "A tech-themed crossword competition to test your vocabulary and knowledge.",
        date: "2026-01-23",
        startTime: "13:00",
        endTime: "14:30",
        venueArea: "Block A",
        teamSize: 1,
        registrationFee: 100,
        prize: "Surprise Gifts",
        rules: ["No mobile phones during the contest"],
        tags: ["puzzles", "logic"],
        image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cse-003",
        title: "Prompt AI",
        type: "tech",
        shortDescription: "Master the art of prompt engineering.",
        fullDescription: "Competitions focused on generating the best outputs from AI models using creative prompts.",
        date: "2026-01-23",
        startTime: "15:00",
        endTime: "17:00",
        venueArea: "AI Lab",
        teamSize: 1,
        registrationFee: 100,
        prize: "AI Tool Subs",
        rules: ["Use of specific AI models only", "Ethical guidelines apply"],
        tags: ["AI", "Prompting"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cse-004",
        title: "Rapid Coders",
        type: "tech",
        shortDescription: "Speed coding challenge.",
        fullDescription: "Solve programming problems as fast as you can in this high-intensity coding sprint.",
        date: "2026-01-23",
        startTime: "10:00",
        endTime: "13:00",
        venueArea: "Block A Labs",
        teamSize: 1,
        registrationFee: 100,
        prize: "Cash Prize & Internships",
        rules: ["Standard competitive programming rules apply"],
        tags: ["coding", "programming"],
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cse-005",
        title: "Beat The Clock",
        type: "tech",
        shortDescription: "Time-bound technical tasks.",
        fullDescription: "A series of quick-fire technical tasks where you race against the timer.",
        date: "2026-01-23",
        startTime: "14:00",
        endTime: "16:00",
        venueArea: "Open Area",
        teamSize: 1,
        registrationFee: 100,
        prize: "Tech Gadgets",
        rules: ["Completion within time is key"],
        tags: ["stamina", "logic"],
        image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      // All Departments
      {
        id: "evt-all-001",
        title: "Technical Quiz",
        type: "tech",
        shortDescription: "General technical quiz across disciplines.",
        fullDescription: "Test your knowledge of the latest developments across all engineering fields.",
        date: "2026-01-23",
        startTime: "11:00",
        endTime: "13:00",
        venueArea: "Main Hall",
        teamSize: 2,
        registrationFee: 100,
        prize: "Vouchers & Certificates",
        rules: ["Multiple rounds", "Rapid fire final"],
        tags: ["quiz", "general"],
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-all-002",
        title: "Project Exhibition",
        type: "tech",
        shortDescription: "Showcase your innovative prototypes.",
        fullDescription: "An opportunity for students to demonstrate their final year projects and innovations.",
        date: "2026-01-23",
        startTime: "09:00",
        endTime: "17:00",
        venueArea: "Exhibition Center",
        teamSize: 4,
        registrationFee: 100,
        prize: "Best Project Award",
        rules: ["Functional models required", "Poster mandatory"],
        tags: ["innovation", "creative"],
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-all-003",
        title: "Poster Presentation",
        type: "tech",
        shortDescription: "Visual presentation of research ideas.",
        fullDescription: "Design and present a poster summarizing a technical research topic.",
        date: "2026-01-23",
        startTime: "10:00",
        endTime: "15:00",
        venueArea: "Hallway A",
        teamSize: 2,
        registrationFee: 100,
        prize: "Certificates",
        rules: ["Standard poster size", "Oral summary required"],
        tags: ["research", "design"],
        image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-all-004",
        title: "Paper Presentation",
        type: "tech",
        shortDescription: "Present your technical papers.",
        fullDescription: "Submit and present research papers to a panel of expert judges.",
        date: "2026-01-23",
        startTime: "09:30",
        endTime: "16:30",
        venueArea: "Conference Room",
        teamSize: 2,
        registrationFee: 100,
        prize: "Best Paper Publication Merit",
        rules: ["Standard format guidelines", "PPT required"],
        tags: ["academic", "paper"],
        image: "https://images.unsplash.com/photo-1454165833744-119520427847?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      // IT
      {
        id: "evt-it-001",
        title: "Hackathon",
        type: "tech",
        shortDescription: "Build a solution in one day.",
        fullDescription: "Intensive design and development event to solve real-world problems.",
        date: "2026-01-23",
        startTime: "09:00",
        endTime: "18:00",
        venueArea: "IT Lab 1",
        teamSize: 3,
        registrationFee: 100,
        prize: "Cash & Swag",
        rules: ["Bring your own laptops"],
        tags: ["hacking", "development"],
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-it-002",
        title: "Innovation Ideas",
        type: "tech",
        shortDescription: "Pitch your startup concepts.",
        fullDescription: "Pitch decks and business plans for new tech-driven business ideas.",
        date: "2026-01-23",
        startTime: "14:00",
        endTime: "17:00",
        venueArea: "Incubation Center",
        teamSize: 2,
        registrationFee: 100,
        prize: "Mentorship opportunity",
        rules: ["Limit to 5 min pitch"],
        tags: ["startup", "ideas"],
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      // ECE & EEE
      {
        id: "evt-ece-001",
        title: "Circuitrix",
        type: "tech",
        shortDescription: "Test your circuit debugging skills.",
        fullDescription: "A hands-on challenge to debug and complete missing parts of a complex circuit board.",
        date: "2026-01-23",
        startTime: "10:00",
        endTime: "13:00",
        venueArea: "Circuits Lab",
        teamSize: 2,
        registrationFee: 100,
        prize: "Electronic Kits",
        rules: ["Safety first", "Components provided"],
        tags: ["electronics", "hardware"],
        image: "https://images.unsplash.com/photo-1518770660439-46361a0af8bb?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-ece-002",
        title: "Stress Burst",
        type: "tech",
        shortDescription: "Fast-paced technical trivia.",
        fullDescription: "Rapid response technical challenges specifically for ECE & EEE concepts.",
        date: "2026-01-23",
        startTime: "14:00",
        endTime: "16:00",
        venueArea: "Block D Area",
        teamSize: 1,
        registrationFee: 100,
        prize: "Gift Cards",
        rules: ["Speed and accuracy"],
        tags: ["quiz", "fast-paced"],
        image: "https://images.unsplash.com/photo-1512428559083-abd60b38646b?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-ece-003",
        title: "Mystery Busters",
        type: "tech",
        shortDescription: "Sherlock-style technical hunt.",
        fullDescription: "Solve clues hidden in circuits and component data sheets to reach the goal.",
        date: "2026-01-23",
        startTime: "13:00",
        endTime: "17:00",
        venueArea: "Campus-wide",
        teamSize: 3,
        registrationFee: 100,
        prize: "Surprise Mega Prize",
        rules: ["Mobile tracking mandatory"],
        tags: ["treasure-hunt", "clues"],
        image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-ece-004",
        title: "Techno Parady",
        type: "tech",
        shortDescription: "Creative tech reimagining.",
        fullDescription: "A contest involving re-designing or paradying everyday tech objects for comical or alternate uses.",
        date: "2026-01-23",
        startTime: "11:00",
        endTime: "14:00",
        venueArea: "Design Lab",
        teamSize: 2,
        registrationFee: 100,
        prize: "Creative Award",
        rules: ["Humor allowed but respectful"],
        tags: ["humor", "creative"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      // Cultural Events (24-01-2026)
      {
        id: "evt-cul-001",
        title: "Telugu Ammai",
        type: "cultural",
        shortDescription: "Traditional beauty and talent contest.",
        fullDescription: "Celebrating Telugu aesthetic, oratory, and cultural knowledge.",
        date: "2026-01-24",
        startTime: "10:00",
        endTime: "13:00",
        venueArea: "Main Stage",
        teamSize: 1,
        registrationFee: 100,
        prize: "Title & Crown",
        rules: ["Traditional attire mandatory"],
        tags: ["tradition", "talent"],
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cul-002",
        title: "Best Dancer",
        type: "cultural",
        shortDescription: "Dance solo competition.",
        fullDescription: "Street, classical, or contemporary—show us your best moves.",
        date: "2026-01-24",
        startTime: "14:00",
        endTime: "18:00",
        venueArea: "Main Stage",
        teamSize: 1,
        registrationFee: 100,
        prize: "Cash Prize & Trophy",
        rules: ["Max 3 minute performance"],
        tags: ["dance", "performance"],
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cul-003",
        title: "Best Singer",
        type: "cultural",
        shortDescription: "Vocal and karaoke challenge.",
        fullDescription: "Solo singing competition across various genres.",
        date: "2026-01-24",
        startTime: "10:00",
        endTime: "13:00",
        venueArea: "Auditorium",
        teamSize: 1,
        registrationFee: 100,
        prize: "Trophies",
        rules: ["Minus-one tracks allowed"],
        tags: ["music", "voice"],
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cul-004",
        title: "Best Reels",
        type: "cultural",
        shortDescription: "Content creation contest.",
        fullDescription: "Submit short reels capturing the essence of the fest.",
        date: "2026-01-24",
        startTime: "09:00",
        endTime: "20:00",
        venueArea: "Online/Campus",
        teamSize: 1,
        registrationFee: 100,
        prize: "Growth Kit",
        rules: ["Event hashtags required"],
        tags: ["social-media", "creative"],
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cul-005",
        title: "Spot Photography",
        type: "cultural",
        shortDescription: "Capture moments on the fly.",
        fullDescription: "Photograph a given theme within the campus on the day of the fest.",
        date: "2026-01-24",
        startTime: "11:00",
        endTime: "17:00",
        venueArea: "Campus-wide",
        teamSize: 1,
        registrationFee: 100,
        prize: "Lens kit",
        rules: ["Raw files required on demand"],
        tags: ["photography", "art"],
        image: "https://images.unsplash.com/photo-1452784444945-3f422708fe5e?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cul-006",
        title: "Science Fair",
        type: "cultural",
        shortDescription: "Exhibiting the wonders of science.",
        fullDescription: "Demonstrate scientific principles through creative experiments.",
        date: "2026-01-24",
        startTime: "10:00",
        endTime: "15:00",
        venueArea: "Science Lobby",
        teamSize: 3,
        registrationFee: 100,
        prize: "Science sets",
        rules: ["No hazardous materials"],
        tags: ["science", "learning"],
        image: "https://images.unsplash.com/photo-1564325724739-bae0bd08fc21?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cul-007",
        title: "Flower Arrangement",
        type: "cultural",
        shortDescription: "Art with petals.",
        fullDescription: "Creating beautiful floral displays within a time limit.",
        date: "2026-01-24",
        startTime: "14:00",
        endTime: "16:00",
        venueArea: "Garden Area",
        teamSize: 2,
        registrationFee: 100,
        prize: "Home decor vouchers",
        rules: ["Bring your flowers if needed"],
        tags: ["art", "natural"],
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cul-008",
        title: "Talkathon",
        type: "cultural",
        shortDescription: "Declamations and speeches.",
        fullDescription: "Speaking competition focused on persuasive and informative topics.",
        date: "2026-01-24",
        startTime: "11:00",
        endTime: "13:00",
        venueArea: "Debate Room",
        teamSize: 1,
        registrationFee: 100,
        prize: "Public speaking books",
        rules: ["Language: English/Telugu"],
        tags: ["speaking", "debate"],
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cul-009",
        title: "Painting/Art",
        type: "cultural",
        shortDescription: "Canvas and colors.",
        fullDescription: "On-the-spot painting based on a provided mysterious prompt.",
        date: "2026-01-24",
        startTime: "10:00",
        endTime: "14:00",
        venueArea: "Art Studio",
        teamSize: 1,
        registrationFee: 100,
        prize: "Art kits",
        rules: ["Bring your own brushes"],
        tags: ["painting", "creative"],
        image: "https://images.unsplash.com/photo-1460518451285-cd7ba7122700?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cul-010",
        title: "Literary Maze",
        type: "cultural",
        shortDescription: "Puzzles and literature.",
        fullDescription: "Word-based puzzles, scavenger hunts involving famous book quotes and authors.",
        date: "2026-01-24",
        startTime: "14:00",
        endTime: "16:00",
        venueArea: "Library Lawn",
        teamSize: 2,
        registrationFee: 100,
        prize: "Books & Novelties",
        rules: ["Fastest solvers win"],
        tags: ["literature", "maze"],
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      },
      {
        id: "evt-cul-011",
        title: "Mr. Perfect",
        type: "cultural",
        shortDescription: "Personality and talent contest for boys.",
        fullDescription: "Judged on fitness, general knowledge, and artistic talent.",
        date: "2026-01-24",
        startTime: "15:00",
        endTime: "18:00",
        venueArea: "Main Stage",
        teamSize: 1,
        registrationFee: 100,
        prize: "Title & Trophy",
        rules: ["Semi-formal attire required"],
        tags: ["personality", "talent"],
        image: "https://images.unsplash.com/photo-1546519638-68e10940435a?w=800&q=80",
        facultyCoordinator: "TBD",
        studentCoordinator: "TBD"
      }
    ];


    for (const event of events) {
      await storage.createEvent(event);
    }
  }

  const existingStalls = await storage.getStalls();
  if (existingStalls.length === 0) {
    await storage.clearStalls();
    const stalls = [
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
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
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
        image: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?w=800&q=80"
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
        image: "https://images.unsplash.com/photo-1587202372775-e0631921a418?w=800&q=80"
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
        image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&q=80"
      }
    ];

    for (const stall of stalls) {
      await storage.createStall(stall);
    }
  }
}
