const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findUnique({
        where: { email: 'jayeshsinghwork@gmail.com' }
    });

    if (!user) {
        console.log('User not found');
        return;
    }

    const ticket = await prisma.ticket.findFirst({
        where: {
            userId: user.id,
            lenderName: { contains: 'mpoket', mode: 'insensitive' }
        },
        include: {
            user: true,
            documents: true,
            messages: true,
            events: true
        }
    });

    if (!ticket) {
        console.log('Ticket not found');
    } else {
        console.log(JSON.stringify(ticket, null, 2));
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
