import admin from 'firebase-admin';
import serviceAccount from '../firebase-adminsdk.json'with { type: 'json' };
import express from 'express';

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;