import prisma from "@/lib/prisma";

export async function SeedRules(){
    console.log("Seeding rules...");
    await BasketballPutraRules();
    await BasketballPutriRules();
    await FutsalRules();
    await BilliardRules();
    await BadmintonRules();
    await PingPongRules();
    await TaekwondoRules();
    await MobileLegendsRules();
    await PUBGRules();
    await FIFARules();
    console.log("Rules seeded.");
}

// Yang kamu ganti yang bawah ini ya!!!

async function BasketballPutraRules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "basketball-putra" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("Basketball competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. masukan bola ke ring",
            },
            {
                competition_id: c.id,
                description: "2. masukan bola ke lawan",
            },
        ],  
    })
}

async function BasketballPutriRules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "basketball-putri" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("Basketball competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. masukan bola ke ring",
            },
            {
                competition_id: c.id,
                description: "2. masukan bola ke lawan",
            },
        ],  
    })
}

async function FutsalRules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "futsal" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("Futsal competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. masukan bola ke ring",
            },
            {
                competition_id: c.id,
                description: "2. masukan bola ke lawan",
            },
        ],  
    })
}

async function BilliardRules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "billiard" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("Billiard competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. masukan bola ke ring",
            },
            {
                competition_id: c.id,
                description: "2. masukan bola ke lawan",
            },
        ],  
    })
}

async function BadmintonRules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "badminton" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("Badminton competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. masukan bola ke ring",
            },
            {
                competition_id: c.id,
                description: "2. masukan bola ke lawan",
            },
        ],  
    })
}

async function PingPongRules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "ping-pong" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("Pingpong competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. masukan bola ke ring",
            },
            {
                competition_id: c.id,
                description: "2. masukan bola ke lawan",
            },
        ],  
    })
}

async function TaekwondoRules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "taekwondo" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("Taekwondo competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. masukan bola ke ring",
            },
            {
                competition_id: c.id,
                description: "2. masukan bola ke lawan",
            },
        ],  
    })
}

async function MobileLegendsRules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "mobile-legends" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("Mobile Legends competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. masukan bola ke ring",
            },
            {
                competition_id: c.id,
                description: "2. masukan bola ke lawan",
            },
        ],  
    })
}

async function PUBGRules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "pubg" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("PUBG competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. masukan bola ke ring",
            },
            {
                competition_id: c.id,
                description: "2. masukan bola ke lawan",
            },
        ],  
    })
}

async function FIFARules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "fifa-2v2" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("FIFA 2v2 competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. masukan bola ke ring",
            },
            {
                competition_id: c.id,
                description: "2. masukan bola ke lawan",
            },
        ],  
    })
}