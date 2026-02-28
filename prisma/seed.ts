import prisma from "@/lib/prisma";

async function main() {
    console.log("Seeding demo data...");

    // 1. Create Branches
    const b1 = await prisma.branch.upsert({
        where: { id: "branch-1" },
        update: {},
        create: {
            id: "branch-1",
            name: "Downtown Bistro",
            location: "San Francisco, CA",
        },
    });

    const b2 = await prisma.branch.upsert({
        where: { id: "branch-2" },
        update: {},
        create: {
            id: "branch-2",
            name: "Harbor Grill",
            location: "Boston, MA",
        },
    });

    // 2. Create Staff
    await prisma.staff.createMany({
        data: [
            { name: "Marco Rossi", designation: "Head Chef", branchId: b1.id },
            { name: "Sarah J.", designation: "Server", branchId: b1.id },
            { name: "David L.", designation: "Manager", branchId: b2.id },
        ],
    });

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
