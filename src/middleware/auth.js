import { auth } from '@/plugins/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';

export const requireAuth = (to, from, next) => {
    const router = useRouter();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            next();
        } else {
            router.push({ name: 'auth-signin' }); // Redirect to login page if not authenticated
        }
    });
};