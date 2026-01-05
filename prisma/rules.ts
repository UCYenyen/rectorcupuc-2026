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
                description: "1. Each team must register a minimum of 5 players and a maximum of 12 players, including substitute players.",
            },
            {
                competition_id: c.id,
                description: "2. All players are only allowed to be registered with one team throughout the competition. Players found to be playing for two teams will result in both teams being disqualified.",
            },
            {
                competition_id: c.id,
                description: "3. Each player must show their student ID card (KTM) during registration before the match begins.",
            },
            {
                competition_id: c.id,
                description: "4. Players who do not bring their student ID card on the day of the match will be declared ineligible to play that day.",
            },
            {
                competition_id: c.id,
                description: "5. Teams using ineligible players will be penalized with disqualification from the entire tournament.",
            },
            {
                competition_id: c.id,
                description: "6. All participants and officials are required to maintain order and discipline while in the UC Sport Hall area.",
            },
            {
                competition_id: c.id,
                description: "7. Participants are required to bring their own tumblers to support the reduction of plastic waste.",
            },
            {
                competition_id: c.id,
                description: "8. Participants are not provided with bottled mineral water and are advised to fill water from the galon area in the lobby/venue.",
            },
            {
                competition_id: c.id,
                description: "9. All participants are required to follow the official Rector Cup Instagram account @rectorcup.uc as the central source of information for schedules, match results, and other publications.",
            },
            {
                competition_id: c.id,
                description: "10. Participants are required to upload a personal photo with the official Rector Cup twibbon as a form of event socialization.",
            },
            {
                competition_id: c.id,
                description: "11. Participants are required to attend the Opening Ceremony and Closing Ceremony. Unjustified absence may be subject to administrative sanctions by the committee.",
            },
            {
                competition_id: c.id,
                description: "12. Each team must have a team captain, who is responsible for being the official liaison between the team and the committee and referees.",
            },
            {
                competition_id: c.id,
                description: "13. Each team is allowed to have a maximum of 3 officials/managers (coach, assistant coach, and team manager).",
            },
            {
                competition_id: c.id,
                description: "14. All participants are required to sign the Compliance Statement before the competition begins.",
            }   
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
                description: "TBA",
            }
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
                description: "1. Participants must be active students from each faculty/study program at Ciputra University.",
            },
            {
                competition_id: c.id,
                description: "2. Each team is required to register a minimum of 5 players and a maximum of 12 players (including substitute goalkeepers).",
            },
            {
                competition_id: c.id,
                description: "3. Players may only be registered on one team during the competition.",
            },
            {
                competition_id: c.id,
                description: "4. All participants are required to show their student ID card (KTM) during registration and before matches.",
            },
            {
                competition_id: c.id,
                description: "5. Teams using ineligible players will be disqualified.",
            },
            {
                competition_id: c.id,
                description: "6. Participants are required to follow the Instagram account @rectorcup.uc, as scores, highlights, and other information will be posted there.",
            },
            {
                competition_id: c.id,
                description: "7. Participants are required to post a selfie using the twibbon provided by the Rector Cup Committee.",
            },
            {
                competition_id: c.id,
                description: "8. Participants are required to attend the opening and closing ceremonies.",
            }
        ],  
    })
}

async function BilliardRules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "billiard-putra" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("Billiard competition not found");
    }

    const c2 = await prisma.competition.findUnique({
        where: { slug: "billiard-putri" },
        select: { id: true },
    });

    if (!c2) {
        throw new Error("Billiard competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. Participants must be active students of Ciputra University, as evidenced by showing their Student ID Card (KTM) or a letter of active enrollment from their respective faculties.",
            },
            {
                competition_id: c.id,
                description: "2. All participants are required to show their Student ID Card (KTM) during registration.",
            },
            {
                competition_id: c.id,
                description: "3. Participants are representatives from each faculty or study program at Ciputra University.",
            },
            {
                competition_id: c.id,
                description: "3. Participants are representatives from each faculty or study program at Ciputra University.",
            },
            {
                competition_id: c.id,
                description: "5. Each faculty is required to send at least one representative in the Mixed Doubles category.",
            },
            {
                competition_id: c.id,
                description: "6. Minimum total representation per faculty: 2 players.",
            },
            {
                competition_id: c.id,
                description: "7. Participants are required to attend the opening and closing ceremonies of Rector Cup 2026.",
            }
        ],  
    })

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c2.id,
                description: "1. Participants must be active students of Ciputra University, as evidenced by showing their Student ID Card (KTM) or a letter of active enrollment from their respective faculties.",
            },
            {
                competition_id: c2.id,
                description: "2. All participants are required to show their Student ID Card (KTM) during registration.",
            },
            {
                competition_id: c2.id,
                description: "3. Participants are representatives from each faculty or study program at Ciputra University.",
            },
            {
                competition_id: c2.id,
                description: "3. Participants are representatives from each faculty or study program at Ciputra University.",
            },
            {
                competition_id: c2.id,
                description: "5. Each faculty is required to send at least one representative in the Mixed Doubles category.",
            },
            {
                competition_id: c2.id,
                description: "6. Minimum total representation per faculty: 2 players.",
            },
            {
                competition_id: c2.id,
                description: "7. Participants are required to attend the opening and closing ceremonies of Rector Cup 2026.",
            }
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
                description: "1. Participants must be active students of Ciputra University, as evidenced by showing their Student ID Card (KTM) or a letter of active enrollment from their respective faculties.",
            },
            {
                competition_id: c.id,
                description: "2. All participants are required to show their Student ID Card (KTM) during registration.",
            },
            {
                competition_id: c.id,
                description: "3. Participants are representatives from each faculty or study program at Ciputra University.",
            },
            {
                competition_id: c.id,
                description: "4. Participants are required to arrive 30 minutes before their scheduled match time for re-registration and warm-up.",
            },
            {
                competition_id: c.id,
                description: "5. Each faculty is required to send at least one representative in the Mixed Doubles category.",
            },
            {
                competition_id: c.id,
                description: "6. Minimum total representation per faculty: 2 players.",
            },
            {
                competition_id: c.id,
                description: "7. Participants are required to attend the opening and closing ceremonies of Rector Cup 2026.",
            }
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
                description: "1. Participants must be active students from each faculty/study program at Universitas Ciputra.",
            },
            {
                competition_id: c.id,
                description: "2. Each faculty is required to register a maximum of 2 teams consisting of 2 players (1 female & 1 male).",
            },
            {
                competition_id: c.id,
                description: "3. Players are only allowed to be registered on one team during the competition.",
            },
            {
                competition_id: c.id,
                description: "4. All participants are required to show their student ID card (KTM) during registration and before matches.",
            },
            {
                competition_id: c.id,
                description: "5. Teams using ineligible players will be subject to disqualification sanctions.",
            },
            {
                competition_id: c.id,
                description: "6. Participants and officials are expected to bring tumblers to reduce plastic waste during the competition.",
            },
            {
                competition_id: c.id,
                description: "7. Participants will not be provided with plastic water bottles during matches and are expected to fill their own tumblers with gallon water available in the lobby and/or on the field.",
            },
            {
                competition_id: c.id,
                description: "8. Participants are required to follow the Instagram account @rectorcup.uc, as scores, highlights, and other information will be posted there.",
            },
            {
                competition_id: c.id,
                description: "9. Participants are required to post a selfie using the twibbon provided by the Rector Cup committee.",
            },
            {
                competition_id: c.id,
                description: "10. Participants are required to attend the Opening and Closing ceremonies; failure to attend the entire event will result in the KP not being disbursed.",
            }
        ],  
    })
}

async function TaekwondoRules(){
    const c = await prisma.competition.findUnique({
        where: { slug: "taekwondo-putra" },
        select: { id: true },
    });

    if (!c) {
        throw new Error("Taekwondo competition not found");
    }

     const c2 = await prisma.competition.findUnique({
        where: { slug: "taekwondo-putri" },
        select: { id: true },
    });

    if (!c2) {
        throw new Error("Taekwondo competition not found");
    }

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c.id,
                description: "1. Participants must be active students from each faculty/study program at Universitas Ciputra Surabaya.",
            },
            {
                competition_id: c.id,
                description: "2. Participants are required to attend the Opening and Closing ceremonies; failure to do so will result in KP not being disbursed.",
            },
            {
                competition_id: c.id,
                description: "3. All participants are required to show their Student ID Card (KTM) during registration and before matches.",
            },
            {
                competition_id: c.id,
                description: "4. Each faculty/study program is allowed to send more than one participant as long as there are still available slots.",
            },
            {
                competition_id: c.id,
                description: "5. Registered participants must be members of the Taekwondo Student Activity Unit (UKM) or have basic Taekwondo skills.",
            },
            {
                competition_id: c.id,
                description: "6. Teams using ineligible players will be disqualified.",
            },
            {
                competition_id: c.id,
                description: "7. Participants are divided into 2 (two) categories: a. Men's Category (Male) b. Women's Category (Female) 8. Maximum 21 participants per category.",
            }
        ],  
    })

    await prisma.rules.createMany({
        data: [
            {
                competition_id: c2.id,
                description: "1. Participants must be active students from each faculty/study program at Universitas Ciputra Surabaya.",
            },
            {
                competition_id: c2.id,
                description: "2. Participants are required to attend the Opening and Closing ceremonies; failure to do so will result in KP not being disbursed.",
            },
            {
                competition_id: c2.id,
                description: "3. All participants are required to show their Student ID Card (KTM) during registration and before matches.",
            },
            {
                competition_id: c2.id,
                description: "4. Each faculty/study program is allowed to send more than one participant as long as there are still available slots.",
            },
            {
                competition_id: c2.id,
                description: "5. Registered participants must be members of the Taekwondo Student Activity Unit (UKM) or have basic Taekwondo skills.",
            },
            {
                competition_id: c2.id,
                description: "6. Teams using ineligible players will be disqualified.",
            },
            {
                competition_id: c2.id,
                description: "7. Participants are divided into 2 (two) categories: a. Men's Category (Male) b. Women's Category (Female) 8. Maximum 21 participants per category.",
            }
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
                description: "1. Participants who wish to enter the competition are only allowed from active Ciputra University students from the 2023-2025 intake.",
            },
            {
                competition_id: c.id,
                description: "2. Every student participating in the competition is required to attach their in-game name, face photo, and Student ID Card (KTM) during registration.",
            },
            {
                competition_id: c.id,
                description: "3. It is prohibited to use in-game names that contain elements of SARA, racism, provocation, or harsh words.",
            },
            {
                competition_id: c.id,
                description: "4. A team is only allowed to consist of: 5 starting players, 1 substitute (optional)",
            }
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
                description: "1. Participants in the 2026 Rector Cup Competition are teams that have registered previously.",
            },
            {
                competition_id: c.id,
                description: "2. Participants are active students from Universitas Ciputra, representing all faculties/study programs.",
            },
            {
                competition_id: c.id,
                description: "3. Participants are required to show their Student ID Card (KTM) during registration.",
            },
            {
                competition_id: c.id,
                description: "4. Participants are required to register as a team.",
            },
            {
                competition_id: c.id,
                description: "5. The team consists of 4 core players and 1 substitute (optional).",
            },
            {
                competition_id: c.id,
                description: "6. Participants are required to follow Instagram @rectorcup.uc for updates on the competition.",
            },
            {
                competition_id: c.id,
                description: "7. Participants are required to post a selfie using the Rector Cup 2026 twibbon and include the official hashtag determined by the committee.",
            }
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
                description: "1. Participants are active students from Universitas Ciputra from all faculties/study programs.",
            },
            {
                competition_id: c.id,
                description: "2. Participants can only register as a team.",
            },
            {
                competition_id: c.id,
                description: "3. One team consists of 2 people (gender mix is allowed).",
            },
            {
                competition_id: c.id,
                description: "4. Participants are required to follow Instagram @rectorcup.uc for updates on the competition.",
            },
            {
                competition_id: c.id,
                description: "5. Participants are required to post a selfie using the Rector Cup 2026 twibbon and include the official hashtag determined by the committee.",
            },
            {
                competition_id: c.id,
                description: "6. Consisting of 14 teams",
            }
        ],  
    })
}