import { NextAuthOptions } from 'next-auth';
import { auth as nextAuth } from '@/lib/auth';

export const authOptions: NextAuthOptions = nextAuth as unknown as NextAuthOptions;
