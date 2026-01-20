import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Admin emails to seed
const ADMIN_EMAILS = [
    'admin@fairpaysolution.com',
    'support@fairpaysolution.com',
    'hsinghjayesh@gmail.com', // Primary admin
];

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin users
    for (const email of ADMIN_EMAILS) {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            // Update to admin if exists but not admin
            if (existingUser.role !== 'ADMIN') {
                await prisma.user.update({
                    where: { email },
                    data: { role: 'ADMIN' },
                });
                console.log(`✅ Updated ${email} to ADMIN role`);
            } else {
                console.log(`ℹ️ ${email} is already ADMIN`);
            }
        } else {
            // Create new admin user
            await prisma.user.create({
                data: {
                    email,
                    name: email.split('@')[0],
                    role: 'ADMIN',
                },
            });
            console.log(`✅ Created admin user: ${email}`);
        }
    }

    // Seed some sample reviews for testing
    const existingReviews = await prisma.review.count();
    if (existingReviews === 0) {
        const sampleReviews = [
            {
                rating: 5,
                name: 'Rajesh Kumar',
                location: 'Agra',
                text: 'FairPay Solutions helped me settle my credit card debt of ₹3.5 lakhs for just ₹1.4 lakhs. The team was very professional and guided me throughout the process. Highly recommended!',
                approved: true,
            },
            {
                rating: 5,
                name: 'Priya Sharma',
                location: 'Delhi',
                text: 'I was being harassed by recovery agents for months. FairPay not only stopped the harassment but also negotiated my personal loan settlement at 45% of the outstanding amount. Thank you team!',
                approved: true,
            },
            {
                rating: 4,
                name: 'Amit Verma',
                location: 'Noida',
                text: 'Great service! They explained all my legal rights and helped me understand the settlement process. The documentation was handled professionally.',
                approved: true,
            },
            {
                rating: 5,
                name: 'Sunita Devi',
                location: 'Mathura',
                text: 'मैं बहुत परेशान थी recovery agents से। FairPay ने मेरी मदद की और मेरा loan settle करवाया। बहुत धन्यवाद!',
                approved: true,
            },
            {
                rating: 5,
                name: 'Vikram Singh',
                location: 'Gurgaon',
                text: 'Professional team who knows their work. They settled my ₹8 lakh personal loan for ₹3.2 lakhs. The entire process took about 4 months but was worth it!',
                approved: true,
            },
        ];

        for (const review of sampleReviews) {
            await prisma.review.create({
                data: {
                    ...review,
                    approvedAt: new Date(),
                },
            });
        }
        console.log(`✅ Seeded ${sampleReviews.length} sample reviews`);
    } else {
        console.log(`ℹ️ ${existingReviews} reviews already exist, skipping seed`);
    }

    console.log('✅ Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
