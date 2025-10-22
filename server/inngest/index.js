import { Inngest } from "inngest";
import { serve } from "inngest/express";
// FIX: Changed 'user' to 'User' to match its usage below
import  User  from "../models/user.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "pingup-app" });

// Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
  { id: 'sync-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    let username = email_addresses[0].email_address.split('@')[0];

    // Check availability of username
    const existingUser = await User.findOne({ username }); // Use 'existingUser' to avoid shadowing
    if (existingUser) {
      username = username + Math.floor(Math.random() * 10000);
    }

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
      username
    };
    await User.create(userData);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const updatedUserData = {
      email: email_addresses[0].email_address,
      full_name: first_name + ' ' + last_name,
      profile_picture: image_url
    };
    // Use the { new: true } option if you want the operation to return the updated document
    await User.findByIdAndUpdate(id, updatedUserData);
  }
);

// Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
  { id: 'delete-user-with-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    const { id } = event.data;
    // Handle potential null 'id' just in case
    if (!id) {
        console.error("No ID provided for user deletion event");
        return;
    }
    await User.findByIdAndDelete(id);
  }
);


export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion
];