import { PrismaClient, ReviewSource, Sentiment, EscalationStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Cleanup existing data...");
    await prisma.competitorBenchmark.deleteMany();
    await prisma.escalation.deleteMany();
    await prisma.response.deleteMany();
    await prisma.review.deleteMany();
    await prisma.staff.deleteMany();
    await prisma.user.deleteMany();
    await prisma.branch.deleteMany();

    console.log("Creating 5 Branches...");
    const branchNames = [
        "Downtown Branch",
        "Harbor Grill",
        "Westside Hub",
        "Midtown Express",
        "Riverside Dine"
    ];

    const branches = await Promise.all(
        branchNames.map(name =>
            prisma.branch.create({
                data: {
                    name,
                    location: `${name} Street, City Center`,
                }
            })
        )
    );

    console.log("Creating Staff for each branch...");
    const designations = ["Waiter", "Manager", "Chef", "Floor Supervisor"];
    const staffByBranch: Record<string, any[]> = {};

    for (const branch of branches) {
        const staffList = [];
        const count = Math.floor(Math.random() * 4) + 5; // 5 to 8
        for (let i = 1; i <= count; i++) {
            const s = await prisma.staff.create({
                data: {
                    name: `Staff ${i} (${branch.name})`,
                    designation: designations[Math.floor(Math.random() * designations.length)],
                    branchId: branch.id
                }
            });
            staffList.push(s);
        }
        staffByBranch[branch.id] = staffList;
    }

    console.log("Seeding 150+ Realistic Reviews...");
    const sources = Object.values(ReviewSource);
    const categoriesList = ["food", "service", "staff", "ambience", "hygiene", "pricing", "management"];

    const positiveReviews = [
        "The food was absolutely amazing! The pasta was cooked perfectly.",
        "Great service by the staff. Very attentive and friendly.",
        "Lovely ambience, perfect for a date night. Highly recommended.",
        "Best burgers in town. Quick service and reasonable prices.",
        "Hygiene standards are top-notch. Felt very safe dining here.",
    ];

    const neutralReviews = [
        "Average experience. The food was okay but nothing special.",
        "The service was a bit slow today, but the staff was polite.",
        "Ambient noise was a bit too much for my liking. Food was fine.",
        "Fair pricing for the portion size. Standard bistro fare.",
        "The place was clean, but we had to wait 15 minutes for our table.",
    ];

    const negativeReviews = [
        "Awful service. Had to wait 45 minutes for a salad and it was cold.",
        "The waiter was extremely rude to us. Never coming back here.",
        "Found a fly in my soup. Absolutely disgusting hygiene.",
        "Way too expensive for such mediocre quality. Management needs to look into this.",
        "The place was filthy and the staff didn't seem to care at all.",
    ];

    for (let i = 0; i < 160; i++) {
        const rand = Math.random();
        let sentiment: Sentiment;
        let content: string;
        let rating: number;
        let urgencyScore: number;

        if (rand < 0.6) { // 60% Positive
            sentiment = "POSITIVE";
            content = positiveReviews[Math.floor(Math.random() * positiveReviews.length)];
            rating = Math.floor(Math.random() * 2) + 4; // 4 or 5
            urgencyScore = Math.floor(Math.random() * 3) + 1; // 1-3
        } else if (rand < 0.8) { // 20% Neutral
            sentiment = "NEUTRAL";
            content = neutralReviews[Math.floor(Math.random() * neutralReviews.length)];
            rating = 3;
            urgencyScore = Math.floor(Math.random() * 3) + 3; // 3-5
        } else { // 20% Negative
            sentiment = "NEGATIVE";
            content = negativeReviews[Math.floor(Math.random() * negativeReviews.length)];
            rating = Math.floor(Math.random() * 2) + 1; // 1 or 2
            urgencyScore = Math.floor(Math.random() * 5) + 6; // 6-10
        }

        const branch = branches[Math.floor(Math.random() * branches.length)];
        const source = sources[Math.floor(Math.random() * sources.length)];
        const staff = staffByBranch[branch.id][Math.floor(Math.random() * staffByBranch[branch.id].length)];

        const review = await prisma.review.create({
            data: {
                content,
                rating,
                sentiment,
                urgencyScore,
                source,
                categories: [categoriesList[Math.floor(Math.random() * categoriesList.length)], categoriesList[Math.floor(Math.random() * categoriesList.length)]],
                branchId: branch.id,
                staffId: staff.id,
                staffMentions: sentiment === "NEGATIVE" && content.includes("waiter") ? [staff.name] : [],
                customerName: `Customer ${i + 1}`,
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)), // Last 30 days
                aiReplySuggestion: sentiment === "NEGATIVE" ? "We are deeply sorry for your experience. We are looking into this." : "Thank you for your kind words! See you soon."
            }
        });

        // Create Escalations for high urgency
        if (urgencyScore >= 4) {
            await prisma.escalation.create({
                data: {
                    reviewId: review.id,
                    priority: urgencyScore > 7 ? "HIGH" : "MEDIUM",
                    status: Math.random() > 0.5 ? "PENDING" : "IN_PROGRESS",
                    notes: "Auto-escalated based on sentiment/urgency analysis.",
                    assignedTo: "Branch Manager"
                }
            });
        }
    }

    console.log("Seeding Competitor Benchmarks...");
    for (const branch of branches) {
        // Current Branch Stats
        await prisma.competitorBenchmark.create({
            data: {
                branchId: branch.id,
                food: 4.5,
                service: 4.2,
                ambience: 4.8,
                value: 4.0,
                cleanliness: 4.7,
                isCompetitor: false,
                period: "Last 30 days"
            }
        });
        // Competitor Stats
        await prisma.competitorBenchmark.create({
            data: {
                branchId: branch.id,
                food: 4.1,
                service: 4.5,
                ambience: 4.2,
                value: 4.6,
                cleanliness: 4.0,
                isCompetitor: true,
                period: "Last 30 days"
            }
        });
    }

    console.log("Seeding Data Done!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
