/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const stripe = Stripe(
      'pk_test_51MQWPpB0A69qzmAie14iqkn9l5Ep49Kf2xGhEUG4OKbbnjKBJqFvBgvaBKgzeL9bgDYSTnwML6xDL3YAAAqO8lCl00PBHUzdah'
    );
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
