const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Tour = require('./../models/tourModel');


exports.getOverview = catchAsync(async (req, res, next) => {
    // 1. get tour data from collection
    const tours = await Tour.find();

    // 2. build template


    // 3. render template using tour data from 1
    res.status(200).render('overview', {
        title: 'All tours',
        tours
    })
});

exports.getTour = catchAsync(async (req, res, next) => {
    // 1. get the data, for the requested slug
    const tour = await Tour.findOne({ slug: req.params.slug })
        .populate({
            path: 'reviews',
            fields: 'review rating user'
        });

    // 2. build the template
    if (!tour) {
        return next(new AppError('There is no tour with that name.', 404));
    }

    // 3. render template using the data from step 1.
    res.status(200).set(
        'Content-Security-Policy',
        "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com https://*.stripe.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
        .render('tour', {
            title: tour.name,
            tour
        })
});

exports.getLoginForm = (req, res) => {
    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        ).render('login', {
            title: 'Log into your account'
        })
}

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Your account'
    })
}

exports.updateUserData = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        name: req.body.name,
        email: req.body.email
    }, {
        new: true,
        runValidators: true
    });
    res.status(200).render('account', {
        title: 'Your account',
        user: updatedUser
    })
}

exports.getMyTours = catchAsync(async (req, res) => {
    // 1.Find all bookings
    const bookings = await Booking.find({ user: req.user.id });

    // 2 Find tours with the returned IDs
    const tourIds = bookings.map(el => el.tour);
    const tours = await Tour.find({ _id: { $in: tourIds } });

    res.status(200).render('overview', {
        title: "My Bookings",
        tours
    })
})