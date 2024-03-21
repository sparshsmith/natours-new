import axios from 'axios';
import { showAlert } from './alert'
import { loadStripe } from '@stripe/stripe-js';

export const bookTour = async tourId => {
    const stripe = await loadStripe(
        'pk_test_51Ow1AYSIG4DzbBk8gxghD0GR2DOajeFQZHUx2f7YVh0zHYl7rPXktrw32lkz32GcbkssmToMUzgZUbwACdDrEoko00rpurYubL'
    );
    try {
        // 1. get checkour session from API
        const response = await axios(`/api/v1/booking/checkout-session/${tourId}`);
        console.log(response)

        const session = response.data.session;
        // 2. Create checkout form + charge credit card
        window.location.assign(session.url);
    } catch (err) {
        console.log(err);
        showAlert('error', err)
    }
} 