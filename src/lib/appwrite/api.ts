// import { ID } from "appwrite";

// import { account } from "./config";

// export async function createUserAccount(user: INewUser) {
//   try {
//     const newAccount = await account.create(
//       ID.unique(),
//       user.email,
//       user.password,
//       user.name
//     );

//     return newAccount;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }

// }

// import { account } from "./config";

// export async function createUserAccount(user: INewUser) {
//   try {
//     const newAccount = await account.create(
//       ID.unique(),
//       user.email,
//       user.password,
//       user.name
//     );

//     // Return a structure that clearly indicates success
//     return { success: true, data: newAccount };
//   } catch (error) {
//     console.error(error);

//     // Optionally, you can structure the error more specifically
//     // Depending on how you want to handle it in the caller
//     throw error; // or return { success: false, error: error.message };
//   }
// }

import AppwriteService, { appwriteConfig, databases } from "./configure";
import { Query } from "appwrite";


export async function createUserAccount(details: {
  email: string;
  password: string;
  name: string;
  username: string;
}) {
  try {
    const appwriteService = new AppwriteService();
    const newAccountUser = await appwriteService.createAccount(details);

    if (!newAccountUser) {
      throw new Error("User account creation failed");
    }

    return newAccountUser;
  } catch (error) {
    console.error("Error creating user account:", error);
    throw error;
  }
}



export async function login(details: { email: string; password: string }){
  try {
    const appwriteService = new AppwriteService
    const session = await appwriteService.login(details.email, details.password)
    return session;
  }
  catch (error) {
    console.error("Error logging in user:", error);
  }
}


export async function getCurrentUser(){
  try {
    const appwriteService = new AppwriteService
    const response = await appwriteService.getCurrentUser()
    if (!response) {
      throw new Error("No user found");
    }

    const currentUser = databases.listDocuments( 
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', response.$id)]
    )

    if(!currentUser){
      throw new Error("No user found in database")
    }


    return (await currentUser).documents[0];
  }
  catch (error) {
    console.error("Error getting current user:", error);
  }
}

export async function logout(){
  try {
    const appwriteService = new AppwriteService
    const response = await appwriteService.logout()
    return response
  }
  catch (error) {
    console.error("Error logging out user:", error);
  }
}
